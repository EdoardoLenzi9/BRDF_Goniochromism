/*
* Emissive shader material defition
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


function InitChair(){    
    //Material 0: blue emissive
    chairMaterial = new THREE.ShaderMaterial(
        {
            uniforms: {'emissiveColor': {type: 'v3', value: new THREE.Vector3(0.6, 0.8, 1.0)}},
            vertexShader:   'chair-vertex',
            fragmentShader: 'chair-fragment'
        }
    );
}