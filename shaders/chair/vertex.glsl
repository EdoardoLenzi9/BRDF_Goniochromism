//coil-vertex
attribute vec4 tangent;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vColor;
varying vec3 vTangent;
varying vec3 vBitangent;

void main()
{
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPos.xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalMatrix * normal;
    vUV = uv;
    vColor = color;
    vec3 transformedTangent = normalMatrix * tangent.xyz;
    vTangent = normalize( transformedTangent );
    vBitangent = normalize( cross(vNormal, vTangent) * tangent.w );
    gl_Position = projectionMatrix * viewPos;
}