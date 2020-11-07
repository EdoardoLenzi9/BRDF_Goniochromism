/*
* Emissive shader material defition
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitMetal(){    
    //Material 0: blue emissive
    allRough = 0.7;
    metalMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {
                'baseColor': {type: 'v3', value: new THREE.Vector3(0.913, 0.922, 0.924)},
                'roughness': {type: 'f',  value: allRough},
                'pointLightWorldPosition': {type: 'v3', value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                'pointLightColor': {type: 'v3', value: pointLightColor},
                'envLightColor': {type: 'v3', value: envLightColor},
                'envMap': {type:'t', value: environmentMaps[Math.floor(allRough * 8)]}
            },
            vertexShader:   'metal-vertex',
            fragmentShader: 'metal-fragment'
        }
    );
}