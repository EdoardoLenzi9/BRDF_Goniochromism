/*
* Emissive shader material defition
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitChair(){    
    //Material 0: blue emissive
    blueEmissive = new THREE.ShaderMaterial(
        {
            uniforms: {'emissiveColor': {type: 'v3', value: new THREE.Vector3(0.6, 0.8, 1.0)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );
    
    //Material 1: red emissive
    redEmissive = new THREE.ShaderMaterial(
        {
            uniforms: {'emissiveColor': {type: 'v3', value: new THREE.Vector3(1.0, 0.8, 0.6)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );

    //Material 2: green emissive
    greenEmissive = new THREE.ShaderMaterial(
        {
            uniforms: {'emissiveColor': {type: 'v3', value: new THREE.Vector3(0.6, 1.0, 0.8)}},
            vertexShader:   'emissive-vertex',
            fragmentShader: 'emissive-fragment'
        }
    );
}