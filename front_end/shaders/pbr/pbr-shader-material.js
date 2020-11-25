/*
* Emissive shader material defition
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitPBR(){ 
    hemiLightColor = new THREE.Color( settings.hemiLightColor ).multiplyScalar( settings.hemiLight )
    dirLightColor = new THREE.Color( settings.dirLightColor ).multiplyScalar( settings.dirLight )
    
    pbrMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {
                'applyAiry': { type: 'b', value: settings.goniochromism },
                'hasEnvMap': { type: 'b', value: settings.envMap },
                'baseColor': { type: 'v3', value: new THREE.Color( settings.baseColor )},
                'metalness': { type: 'f',  value: settings.metalness },
                'pointLightWorldPosition': { type: 'v3', value: new THREE.Vector3(  0, 
                                                                                    1000000, 
                                                                                    0 ) },
                'pointLightWorldPosition2': { type: 'v3', value: new THREE.Vector3( 0, 
                                                                                    -1000000, 
                                                                                    0) },
                'pointLightWorldPosition3': { type: 'v3', value: new THREE.Vector3( 0, 
                                                                                    0, 
                                                                                    +1000000) },
                'pointLightWorldPosition4': { type: 'v3', value: new THREE.Vector3( 0, 
                                                                                    0, 
                                                                                    -1000000) },
                'pointLightColor': { type: 'v3', value: dirLightColor },
                'envLightColor': { type: 'v3', value: hemiLightColor },
                'envMap': { type:'t', value: environmentMaps[ Math.floor(settings.alpha * 8) ] },
                'Dinc': { type: 'f', value: settings.dinc},
                'eta2': { type: 'f', value: settings.eta2},
                'eta3': { type: 'f', value: settings.eta3},
                'kappa3': { type: 'f', value: settings.kappa3},
                'alpha': { type: 'f', value: settings.alpha },
                'enableLight': { type: 'v4', value: new THREE.Vector4(
                    Number(settings.light1),
                    Number(settings.light2),
                    Number(settings.light3),
                    Number(settings.light4)
                ) }
            },
            vertexShader:   glsl['pbr-vertex'],
            fragmentShader: glsl['pbr-fragment']
        }
    );
    debugger
}