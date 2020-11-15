/*
* Emissive shader material defition
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitSkyBox()
{
	skyMaterial = new THREE.ShaderMaterial(
		{
			vertexShader: glsl['sky-vertex'],
			fragmentShader: glsl['sky-fragment'],
			uniforms: {
				"skyMap": {type: "t", value: environmentMaps[0]},
				"diffOnly": {type: "f", value: 0.0}
			},
			side: THREE.BackSide,
		}
	)
}
