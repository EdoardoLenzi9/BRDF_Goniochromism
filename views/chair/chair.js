/*
* Chair view script
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


// Global variables and constants
var camera, scene, renderer, controls, stats, settings;
var glsl = {}
var lockView = true;
var clock = new THREE.Clock();
var group = new THREE.Group();


// Lights
var hemiLight, dirLight;


// Materials and meshes

// Skybox
var skyMesh;
var skyMaterial;
var pbrMaterial;
var goniochromismMaterial;


/*
* Init function
*/ 
function Init() {
	InitMaterials();
	

		
	// general events
	BindEvent( window, 'resize', OnWindowResize );
	BindEvent( document, 'loading-complete', function(){
		// Init materials definitions
		initGUI();
		InitStat();
		InitScene();
		InitRenderer();
		InitCamera();
		InitPBR();
		InitSkyBox();
		InitMesh();
		// init scene and camera pose
		camera.position.set( 150, 0, 150 );
		group.scale.set( 0.3, 0.3, 0.3 );
		group.position.set( group.position.x, 
							group.position.y - 50, 
							group.position.z );
		scene.add( group );
		Animate();
	})
}


/*
* Given a component definition loads the component and add it to the scene
*/ 
function InitMesh( ) {
	skyMesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 500, 64, 64 ), skyMaterial );
	if(settings.envMap){
		scene.add( skyMesh );
	}
	var loader = new THREE.GLTFLoader();
	loader.load( "../../assets/models/chair.glb", function( gltf ) {
		var gltfMesh = gltf.scene.children[2];
		gltfMesh.material = pbrMaterial;
		group.add(gltfMesh);
	});
}


/*
* Loop function
*/
function Animate() {
	stats.update();
	controls.update();
	requestAnimationFrame( Animate );
	renderer.render( scene, camera );
}


/*
* Renderer init
*/
function InitRenderer(){
	renderer = new THREE.WebGLRenderer( { alpha: true, 
										  antialias: true,
										  preserveDrawingBuffer: true
										} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaOutput = true;
	renderer.gammaInput = true;
	renderer.shadowMap.enabled = true;
	document.body.appendChild( renderer.domElement );
}


/*
* Scene init
*/
function InitScene(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000022 );
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
	hemiLight = CreateHemiLight();
	dirLight = CreateDirLight();
	if(settings.hemiLight){
		scene.add( hemiLight );  
	}
	if(settings.dirLight){
		scene.add( dirLight );  
	}
}


/*
* Stat init
*/
function InitStat(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	// uncomment for debugging purpose only in order to see rendering stats
	document.body.appendChild( stats.domElement );
}


// entry-point call
Init();