/*
* Simple script that init dat.gui interface
*/ 


var gui = new dat.GUI();


/*
* Load initial config from a .json file
*/ 
var LoadSettings = function(filename = 'default_settings.json'){
	Read( "../../settings/"+filename, function( content ){
        configs = JSON.parse(content);
        settings = { ...configs[0] }
        settings.config = 0
        numConfigs = [...Array(configs.length).keys()]
	});
}


var refreshSettings = function(index){
    settings.baseColor = configs[index].baseColor 
    settings.lockView = configs[index].lockView    
    settings.dirLightColor = configs[index].dirLightColor
    settings.dirLight = configs[index].dirLight 
    settings.hemiLightColor = configs[index].hemiLightColor 
    settings.hemiLight = configs[index].hemiLight
    settings.envMap = configs[index].envMap 
    settings.goniochromism = configs[index].goniochromism 
    settings.metalness = configs[index].metalness 
    settings.x = configs[index].x 
    settings.y = configs[index].y 
    settings.z = configs[index].z 
    settings.dinc = configs[index].dinc 
    settings.eta2 = configs[index].eta2
    settings.eta3 = configs[index].eta3
    settings.kappa3 = configs[index].kappa3
    settings.alpha = configs[index].alpha 
    settings.config = index
}


/*
* Updates PBRMaterial at runtime
*/ 
var updatePBR = function(_){
    InitPBR();
    group.children[0].material = pbrMaterial;
    group.children[1].material = pbrMaterial;
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


    gui.add(settings, 'config', numConfigs)
        .listen().onChange(function(index){
            index = Number(index)
            refreshSettings(index)

            for (var i in gui.__controllers) {
                gui.__controllers[i].updateDisplay();
            }
            updatePBR()
        });


    gui.add(settings, 'alpha')
        .min(0).max(1).step(0.01)
        .listen().onChange(updatePBR);


    gui.add(settings, 'metalness')
        .min(0).max(1).step(0.01)
        .listen().onChange(updatePBR);


    gui.add(settings, 'dinc')
        .min(0).max(20).step(0.01)
        .listen().onChange(updatePBR);


    gui.add(settings, 'eta2')
        .min(0).max(20).step(1)
        .listen().onChange(updatePBR);


    gui.add(settings, 'eta3')
        .min(0).max(20).step(1)
        .listen().onChange(updatePBR);


    
    gui.add(settings, 'kappa3')
        .min(0).max(5).step(1)
        .listen().onChange(updatePBR);
}