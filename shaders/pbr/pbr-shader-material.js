/*
* Emissive shader material defition
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitPBR(){   

    hemiLightColor = new THREE.Color( settings.hemiLightColor ).multiplyScalar( settings.hemiLight )
    dirLightColor = new THREE.Color( settings.hemiLightColor ).multiplyScalar( settings.dirLight )
    pbrMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {
                'hasEnvMap': { type: 'b', value: settings.envMap },
                'baseColor': { type: 'v3', value: new THREE.Color( settings.baseColor )},
                'roughness': { type: 'f',  value: settings.roughness },
                'metalness': { type: 'f',  value: settings.metalness },
                'pointLightWorldPosition': { type: 'v3', value: dirLight.position },
                'pointLightColor': { type: 'v3', value: dirLightColor },
                'envLightColor': { type: 'v3', value: hemiLightColor },
                'envMap': { type:'t', value: environmentMaps[ Math.floor(settings.roughness * 8) ] }
            },
            vertexShader:   glsl['pbr-vertex'],
            fragmentShader: glsl['pbr-fragment']
        }
    );
}