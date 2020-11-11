/*
* Simple script that init dat.gui interface
*/ 


var gui = new dat.GUI();


/*
* Load initial config from a .json file
*/ 
var LoadSettings = function( ){
	Read( "../../assets/settings.json", function( content ){
        settings = JSON.parse(content);
	});
}


/*
* Updates PBRMaterial at runtime
*/ 
var updatePBR = function(_){
    InitPBR();
    group.children[0].material = pbrMaterial;
}


/*
* Bind widgets to UI
*/ 
var initGUI = function(){
    gui.addColor(settings, 'baseColor')
    .listen().onChange( updatePBR );


    gui.add(settings, 'lockView')
    .listen().onChange(function (value) {
        controls.enabled = ! value;
    })


    gui.addColor(settings, 'hemiLightColor')
    .listen().onChange(updatePBR );


    gui.add(settings, 'hemiLight')
    .min(0).max(1).step(0.01)
    .listen().onChange(updatePBR);
    

    gui.addColor(settings, 'dirLightColor')
        .listen().onChange(updatePBR );


    gui.add(settings, 'dirLight')
    .min(0).max(1).step(0.01)
    .listen().onChange(updatePBR);


    gui.add(settings, 'envMap')
    .listen().onChange(function (value) {
        if(value){
            scene.add(skyMesh);
        } else{
            scene.remove(skyMesh);
        }
        updatePBR();
    }); 


    gui.add(settings, 'goniochromism')
    .listen().onChange(updatePBR); 


    gui.add(settings, 'config', [0, 1, 2])
        .listen().onChange(updatePBR);


    gui.add(settings, 'roughness')
        .min(0).max(1).step(0.01)
        .listen().onChange(updatePBR);


    gui.add(settings, 'metalness')
        .min(0).max(1).step(0.01)
        .listen().onChange(updatePBR);
}