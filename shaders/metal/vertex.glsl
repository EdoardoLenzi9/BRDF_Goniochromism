//metal-vertex
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main()
{
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPos.xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * viewPos;
}