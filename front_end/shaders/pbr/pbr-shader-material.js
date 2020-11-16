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
                'applyAiry': { type: 'b', value: settings.goniochromism },
                'hasEnvMap': { type: 'b', value: settings.envMap },
                'baseColor': { type: 'v3', value: new THREE.Color( settings.baseColor )},
                'metalness': { type: 'f',  value: settings.metalness },
                'pointLightWorldPosition': { type: 'v3', value: dirLight.position },
                'pointLightColor': { type: 'v3', value: dirLightColor },
                'envLightColor': { type: 'v3', value: hemiLightColor },
                'envMap': { type:'t', value: environmentMaps[ Math.floor(settings.alpha * 8) ] },
                'dinc': { type: 'f', value: settings.dinc},
                'eta2': { type: 'f', value: settings.eta2},
                'eta3': { type: 'f', value: settings.eta3},
                'kappa3': { type: 'f', value: settings.kappa3},
                'alpha': { type: 'f', value: settings.alpha }
            },
            vertexShader:   glsl['pbr-vertex'],
            fragmentShader: glsl['pbr-fragment']
        }
    );
}