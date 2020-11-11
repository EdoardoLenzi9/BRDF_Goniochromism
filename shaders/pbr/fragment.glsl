//pbr-fragment
#define EPS 0.000001
#define RECIPROCAL_PI 0.318309886

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
uniform vec3 baseColor;
uniform float roughness;
uniform float metalness;
uniform vec3 pointLightWorldPosition;
uniform vec3 pointLightColor;
uniform vec3 envLightColor;
uniform sampler2D envMap;
uniform bool hasEnvMap;

const vec3 Dinc = vec3(0.0, 10.0, 0.5);
const vec3 eta2 = vec3(1.0, 5.0, 2.0);
const vec3 eta3 = vec3(1.0, 5.0, 3.0);
const vec3 kappa3 = vec3(0.0, 5.0, 0.0);
const vec3 alpha = vec3(0.01, 1.0, 0.01);
const float PI = 3.14159265358979323846;


vec3 FSchlick(float lDoth) {
    return (baseColor + (vec3(1.0)-baseColor)*pow(1.0 - lDoth,5.0));
}


float DGGX(float nDoth, float alpha) {
    float alpha2 = alpha*alpha;
    float d = nDoth*nDoth*(alpha2-1.0)+1.0;
    return (  alpha2 / (d*d));
}


float G1(float dotProduct, float k) {
    return (1.0 / (dotProduct*(1.0-k) + k) );
}


float GSmith(float nDotv, float nDotl, float k) {
        return G1(nDotl,k)*G1(nDotv,k);
}


vec3 InverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}


void main()
{
    vec4 pointLightViewPosition = viewMatrix * vec4(pointLightWorldPosition, 1.0);

    //Direct light calculation
    vec3 l = normalize(pointLightViewPosition.xyz - vViewPosition.xyz);
    vec3 v = normalize(-vViewPosition);
    vec3 h = normalize(l + v);
    vec3 n = normalize(vNormal);
    float sqRoughness = roughness*roughness;
    vec3 directLightRadiance = pointLightColor * max(dot(n, l), EPS) / 4.0 * 
                               ( FSchlick( max(dot(l, h), EPS)) * 
                                 GSmith(max(dot(n, v), EPS), max(dot(n, l), EPS), sqRoughness) * 
                                 DGGX(max(dot(n, h), EPS), sqRoughness)
                                );

    //Indirect light calculation
    vec3 indirLightRadiance = envLightColor * baseColor;

    if(hasEnvMap){
        vec2 envUV;
        vec3 worldV = vWorldPosition - cameraPosition;
        vec3 worldN = InverseTransformDirection( n, viewMatrix );
        vec3 r = normalize(reflect(worldV, worldN));
        envUV.y = asin( clamp( r.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
        envUV.x = atan( r.z, r.x ) * RECIPROCAL_PI*0.5 + 0.5;
        vec3 F = FSchlick(max(dot(n, v), EPS));
        vec3 refEnvColor = pow(texture2D(envMap, envUV).rgb, vec3(2.2)) * F;
        indirLightRadiance += refEnvColor;
    }

    vec3 radiance = directLightRadiance + indirLightRadiance;
    gl_FragColor = vec4(pow(radiance, vec3(1.0/2.2)), 1.0);
}