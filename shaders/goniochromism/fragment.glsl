//goniochromism-fragment

float Dinc 0.0 10.0 0.5
float eta2 1.0 5.0 2.0
float eta3 1.0 5.0 3.0
float kappa3 0.0 5.0 0.0
float alpha 0.01 1 0.01
const float PI = 3.14159265358979323846;

// XYZ to CIE 1931 RGB color space (using neutral E illuminant)
const mat3 XYZ_TO_RGB = mat3(2.3706743, -0.5138850, 0.0052982, -0.9000405, 1.4253036, -0.0146949, -0.4706338, 0.0885814, 1.0093968);

// Square functions for cleaner code
float sqr(float x) {return x*x;}
vec2 sqr(vec2 x) {return x*x;}

// Depolarization functions for natural light
float depol (vec2 polV){ return 0.5 * (polV.x + polV.y); }
vec3 depolColor (vec3 colS, vec3 colP){ return 0.5 * (colS + colP); }

// GGX distribution function
float GGX(float NdotH, float a) {
    float a2 = sqr(a);
    return a2 / (PI * sqr( sqr(NdotH) * (a2 - 1) + 1 ) );
}

// Smith GGX geometric functions
float smithG1_GGX(float NdotV, float a) {
    float a2 = sqr(a);
    return 2/(1 + sqrt(1 + a2 * (1-sqr(NdotV)) / sqr(NdotV) ));
}

float smithG_GGX(float NdotL, float NdotV, float a) {
    return smithG1_GGX(NdotL, a) * smithG1_GGX(NdotV, a);
}


// Fresnel equations for dielectric/dielectric interfaces.
void fresnelDielectric(in float ct1, in float n1, in float n2,
                       out vec2 R, out vec2 phi) {

  float st1  = (1 - ct1*ct1); // Sinus theta1 'squared'
  float nr  = n1/n2;

  if(sqr(nr)*st1 > 1) { // Total reflection

    vec2 R = vec2(1, 1);
    phi = 2.0 * atan(vec2(- sqr(nr) *  sqrt(st1 - 1.0/sqr(nr)) / ct1,
                        - sqrt(st1 - 1.0/sqr(nr)) / ct1));
  } else {   // Transmission & Reflection

    float ct2 = sqrt(1 - sqr(nr) * st1);
    vec2 r = vec2((n2*ct1 - n1*ct2) / (n2*ct1 + n1*ct2),
        	     (n1*ct1 - n2*ct2) / (n1*ct1 + n2*ct2));
    phi.x = (r.x < 0.0) ? PI : 0.0;
    phi.y = (r.y < 0.0) ? PI : 0.0;
    R = sqr(r);
  }
}

// Fresnel equations for dielectric/conductor interfaces.
void fresnelConductor(in float ct1, in float n1, in float n2, in float k,
                       out vec2 R, out vec2 phi) {

	if (k==0) { // use dielectric formula to avoid numerical issues
		fresnelDielectric(ct1, n1, n2, R, phi);
		return;
	}

	float A = sqr(n2) * (1-sqr(k)) - sqr(n1) * (1-sqr(ct1));
	float B = sqrt( sqr(A) + sqr(2*sqr(n2)*k) );
	float U = sqrt((A+B)/2.0);
	float V = sqrt((B-A)/2.0);

	R.y = (sqr(n1*ct1 - U) + sqr(V)) / (sqr(n1*ct1 + U) + sqr(V));
	phi.y = atan( 2*n1 * V*ct1, sqr(U)+sqr(V)-sqr(n1*ct1) ) + PI;

	R.x = ( sqr(sqr(n2)*(1-sqr(k))*ct1 - n1*U) + sqr(2*sqr(n2)*k*ct1 - n1*V) ) 
			/ ( sqr(sqr(n2)*(1-sqr(k))*ct1 + n1*U) + sqr(2*sqr(n2)*k*ct1 + n1*V) );
	phi.x = atan( 2*n1*sqr(n2)*ct1 * (2*k*U - (1-sqr(k))*V), sqr(sqr(n2)*(1+sqr(k))*ct1) - sqr(n1)*(sqr(U)+sqr(V)) );
}



// Evaluation XYZ sensitivity curves in Fourier space
vec3 evalSensitivity(float opd, float shift) {

	// Use Gaussian fits, given by 3 parameters: val, pos and var
	float phase = 2*PI * opd * 1.0e-6;
	vec3 val = vec3(5.4856e-13, 4.4201e-13, 5.2481e-13);
	vec3 pos = vec3(1.6810e+06, 1.7953e+06, 2.2084e+06);
	vec3 var = vec3(4.3278e+09, 9.3046e+09, 6.6121e+09);
	vec3 xyz = val * sqrt(2*PI * var) * cos(pos * phase + shift) * exp(- var * phase*phase);
	xyz.x   += 9.7470e-14 * sqrt(2*PI * 4.5282e+09) * cos(2.2399e+06 * phase + shift) * exp(- 4.5282e+09 * phase*phase);
	return xyz / 1.0685e-7;
}



// Main function expected by BRDF Explorer
//vec3 BRDF( vec3 L, vec3 V, vec3 N, vec3 X, vec3 Y ) {
void main()
	// Force eta_2 -> 1.0 when Dinc -> 0.0
	float eta_2 = mix(1.0, eta2, smoothstep(0.0, 0.03, Dinc));

	// Compute dot products
	float NdotL = dot(N,L);
	float NdotV = dot(N,V);
	if (NdotL < 0 || NdotV < 0) return vec3(0);
	vec3 H = normalize(L+V);
	float NdotH = dot(N,H);
	float cosTheta1 = dot(H,L);
	float cosTheta2 = sqrt(1.0 - sqr(1.0/eta_2)*(1-sqr(cosTheta1)) );

	// First interface
	vec2 R12, phi12;
	fresnelDielectric(cosTheta1, 1.0, eta_2, R12, phi12);
	vec2 R21  = R12;
	vec2 T121 = vec2(1.0) - R12;
	vec2 phi21 = vec2(PI) - phi12;

	// Second interface
	vec2 R23, phi23;
	fresnelConductor(cosTheta2, eta_2, eta3, kappa3, R23, phi23);

	// Phase shift
	float OPD = Dinc*cosTheta2;
	vec2 phi2 = phi21 + phi23;

	// Compound terms
	vec3 I = vec3(0);
	vec2 R123 = R12*R23;
	vec2 r123 = sqrt(R123);
	vec2 Rs   = sqr(T121)*R23 / (1-R123);

	// Reflectance term for m=0 (DC term amplitude)
	vec2 C0 = R12 + Rs;
	vec3 S0 = evalSensitivity(0.0, 0.0);
	I += depol(C0) * S0;

	// Reflectance term for m>0 (pairs of diracs)
	vec2 Cm = Rs - T121;
	for (int m=1; m<=3; ++m){
		Cm *= r123;
		vec3 SmS = 2.0 * evalSensitivity(m*OPD, m*phi2.x);
		vec3 SmP = 2.0 * evalSensitivity(m*OPD, m*phi2.y);
		I += depolColor(Cm.x*SmS, Cm.y*SmP);
	}

	// Convert back to RGB reflectance
	I = clamp(XYZ_TO_RGB * I, vec3(0.0), vec3(1.0)); 

	// Microfacet BRDF formula
	float D = GGX(NdotH, alpha);
	float G = smithG_GGX(NdotL, NdotV, alpha);
	return D*G*I / (4*NdotL*NdotV);
}
