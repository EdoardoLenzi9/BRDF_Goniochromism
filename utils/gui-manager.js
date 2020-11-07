/*
* Simple script that init dat.gui interface
*/ 

var gui = new dat.GUI();

var settings = {
    metal: true,
    goniochromism: false,
};


var shaders = gui.addFolder("Shaders");  


shaders.add(settings, 'metal').listen().onChange(function (value) {
    if(value){
        settings.goniochromism = false
        settings.metal = true
        group.children[0].material = metalMaterial
    } else{
        settings.goniochromism = true
        settings.metal = false
        group.children[0].material = goniochromismMaterial
    }
}); 
  
shaders.add(settings, 'goniochromism').listen().onChange(function (value) {
    if(value){
        settings.goniochromism = true
        settings.metal = false
        group.children[0].material = goniochromismMaterial
    } else{
        settings.goniochromism = false
        settings.metal = true
        group.children[0].material = metalMaterial
    }
}); 

/*  
// TODO Load the HeightMap from <input> picker

var input = document.createElement('input');
input.type = 'file';
input.onchange = e => { 
   var file = e.target.files[0]; 
   console.dir(file)
}

var obj = { add:function(){ 
    input.click();
    //document.getElementById('file-input').click(); console.log("clicked") }
}};

gui.add(obj,'add');
*/