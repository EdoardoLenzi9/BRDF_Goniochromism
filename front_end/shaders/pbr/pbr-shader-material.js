/*
* Emissive shader material defition
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitPBR(){   
    dinc = [0.0, 10.0, 0.5]
    eta2 = [1.0, 5.0, 2.0]
    eta3 = [1.0, 5.0, 3.0]
    kappa3 = [0.0, 5.0, 0.0]
    alpha = [0.01, 1.0, 0.01]

    hemiLightColor = new THREE.Color( settings.hemiLightColor ).multiplyScalar( settings.hemiLight )
    dirLightColor = new THREE.Color( settings.hemiLightColor ).multiplyScalar( settings.dirLight )
    pbrMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {
                'applyAiry': { type: 'b', value: settings.goniochromism },
                'hasEnvMap': { type: 'b', value: settings.envMap },
                'baseColor': { type: 'v3', value: new THREE.Color( settings.baseColor )},
                'roughness': { type: 'f',  value: settings.roughness },
                'metalness': { type: 'f',  value: settings.metalness },
                'pointLightWorldPosition': { type: 'v3', value: dirLight.position },
                'pointLightColor': { type: 'v3', value: dirLightColor },
                'envLightColor': { type: 'v3', value: hemiLightColor },
                'envMap': { type:'t', value: environmentMaps[ Math.floor(settings.roughness * 8) ] },
                'dinc': { type: 'f', value: dinc[Number(settings.config)]},
                'eta2': { type: 'f', value: eta2[Number(settings.config)]},
                'eta3': { type: 'f', value: eta3[Number(settings.config)]},
                'kappa3': { type: 'f', value: kappa3[Number(settings.config)]},
                'alpha': { type: 'f', value: alpha[Number(settings.config)]}
            },
            vertexShader:   glsl['pbr-vertex'],
            fragmentShader: glsl['pbr-fragment']
        }
    );
}