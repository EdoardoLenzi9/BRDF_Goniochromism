/*
* Emissive shader material defition
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitMetal(roughness = 0.7){    
    //Material 0: blue emissive
    metalMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {
                'baseColor': {type: 'v3', value: new THREE.Vector3(0.913, 0.922, 0.924)},
                'roughness': {type: 'f',  value: roughness},
                'pointLightWorldPosition': {type: 'v3', value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                'pointLightColor': {type: 'v3', value: pointLightColor},
                'envLightColor': {type: 'v3', value: envLightColor},
                'envMap': {type:'t', value: environmentMaps[Math.floor(roughness * 8)]}
            },
            vertexShader:   glsl['metal-vertex'],
            fragmentShader: glsl['metal-fragment']
        }
    );
}