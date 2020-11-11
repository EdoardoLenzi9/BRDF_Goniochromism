/*
* Simple script that init dat.gui interface
*/ 

var gui = new dat.GUI();

var settings = {
    lockView: false,
    goniochromism: false,
    roughness: 0,
    metalness: 0,
};

var lockView = gui.add(settings, 'lockView')
                  .listen().onChange(function (value) {
    controls.enabled = ! value;
})
  

var roughness = gui.add(settings, 'roughness')
                   .min(0).max(1).step(0.01)
                   .listen().onChange(function (value) {
    InitMetal(value)
    group.children[0].material = metalMaterial
})


var metalness = gui.add(settings, 'metalness')
                   .min(0).max(1).step(0.01)
                   .listen().onChange(function (value) {
})

 
gui.add(settings, 'goniochromism')
       .listen().onChange(function (value) {
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