//sky-fragment
varying vec2 vUV;
uniform sampler2D skyMap;

void main()
{
    vec3 skyColor = texture2D(skyMap, vec2(1.0 - vUV.x, vUV.y)).rgb;
    gl_FragColor = vec4(skyColor, 1.0);
}