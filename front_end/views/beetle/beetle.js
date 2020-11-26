/*
* Chair view script
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


// Global variables and constants
var camera, scene, renderer, controls, checkerboard;
var stats, settings, configs, numConfigs;
var glsl = {}
var clock = new THREE.Clock();
var group = new THREE.Group();
var takeScreenShot = false;


// Lights
var hemiLight, dirLight;


// Skybox
var skyMesh;


// Materials
var skyMaterial;
var pbrMaterial;


/*
* Init function
*/ 
function Init() {
	InitMaterials();
	
	// general events
	BindEvent( window, 'resize', OnWindowResize );
	BindEvent( document, 'runs', function(){
		if(runs.length > 0){
			if(! takeScreenShot){
				settings = runs.pop();
				group.rotation.set( settings.x, 
									settings.y, 
									settings.z);
				updatePBR()
				takeScreenShot = true
			} 
		}
	});
	BindEvent( document, 'loading-complete', function(){
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
		group.rotation.set( settings.x, 
							settings.y, 
							settings.z);
		group.scale.set( 70, 70, 70 );
		group.position.set( group.position.x, 
							group.position.y - 10, 
							group.position.z );
		scene.add( group );
		Animate();
	})
}


/*
* Init EnvMap and Chair Mesh
*/ 
function InitMesh( ) {
	var loader = new THREE.GLTFLoader();
	loader.load( "../../models/vw-beetle/beetle2.glb", function( gltf ) {
		var gltfMesh = gltf.scene.children[0];
		gltfMesh.material = pbrMaterial;
		group.add(gltfMesh);
		InitCheckerBoard()
	});
}


function InitCheckerBoard( ) {
	const planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
	planeGeometry.rotateX( - Math.PI / 2 );
	const planeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } );

	const plane = new THREE.Mesh( planeGeometry, planeMaterial );
	plane.position.set( plane.position.x, 
						plane.position.y,
						plane.position.z )
	plane.receiveShadow = true;
	group.add( plane );
}

/*
* Loop function
*/
function Animate() {
	if(takeScreenShot){
		var strMime = "image/jpeg";
        imgData = renderer.domElement.toDataURL(strMime);
		httpPostAsync('', [], [settings.name, imgData], function(reply){console.log(reply)});
		takeScreenShot = false;
		document.dispatchEvent(new CustomEvent( 'runs', {} ))
	}
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
	scene.background = new THREE.Color( 0xffffff );
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