/*
* Coil shader material defition
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/

function InitCoil(){
    //Material 14: coil alluminum 1
    var coilRough = 0.1;
    var coilRMap = LoadTexture('../../assets/models/acc_coil/acc_coil_copper_RM.png');
    var coilDMap = LoadTexture('../../assets/models/acc_coil/acc_coil_copper_D.png');
    var coilNMap = LoadTexture('../../assets/models/acc_coil/acc_coil_copper_NM.png');
    var aoMap = LoadTexture('../../assets/models/acc_coil/acc_coil_copper_AO.png');
    coilAll1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "frameRoughness": {type: "f",  value: coilRough},
                "coilBaseColor": {type: "t", value: coilDMap},
                "coilRoughness": {type: "t", value: coilRMap},
                "coilNormalMap": {type: "t", value: coilNMap},
                "aoMap": {type: "t", value: aoMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coilRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 15: coil alluminum 2
    coilRough = 0.5;
    coilAll2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(0.913, 0.922, 0.924)},
                "frameRoughness": {type: "f",  value: coilRough},
                "coilBaseColor": {type: "t", value: coilDMap},
                "coilRoughness": {type: "t", value: coilRMap},
                "coilNormalMap": {type: "t", value: coilNMap},
                "aoMap": {type: "t", value: aoMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coilRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 16: coil gold 1
    coilRough = 0.1;
    coilGold1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "frameRoughness": {type: "f",  value: coilRough},
                "coilBaseColor": {type: "t", value: coilDMap},
                "coilRoughness": {type: "t", value: coilRMap},
                "coilNormalMap": {type: "t", value: coilNMap},
                "aoMap": {type: "t", value: aoMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coilRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 17: coil gold 2
    coilRough = 0.5;
    coilGold2 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(1.0, 0.782, 0.344)},
                "frameRoughness": {type: "f",  value: coilRough},
                "coilBaseColor": {type: "t", value: coilDMap},
                "coilRoughness": {type: "t", value: coilRMap},
                "coilNormalMap": {type: "t", value: coilNMap},
                "aoMap": {type: "t", value: aoMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coilRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )

    //Material 18: coil dark iron 1
    coilRough = 0.4;
    coilIron1 = new THREE.ShaderMaterial(
        {
            uniforms: {
                "frameBaseColor": {type: "v3", value: new THREE.Vector3(0.112, 0.113, 0.116)},
                "frameRoughness": {type: "f",  value: coilRough},
                "coilBaseColor": {type: "t", value: coilDMap},
                "coilRoughness": {type: "t", value: coilRMap},
                "coilNormalMap": {type: "t", value: coilNMap},
                "aoMap": {type: "t", value: aoMap},
                "pointLightWorldPosition": {type: "v3", value: new THREE.Vector3(dirLight.position.x, dirLight.position.y, dirLight.position.z)},
                "pointLightColor": {type: "v3", value: pointLightColor},
                "envLightColor": {type: "v3", value: envLightColor},
                "envMap": {type:"t", value: environmentMaps[Math.floor(coilRough * 8)]},
                "diffOnly": {type: "f", value: 0.0}
            },
            vertexShader: 'coil-vertex',
            fragmentShader: 'coil-fragment',
            vertexColors: THREE.VertexColors
        }
    )
}