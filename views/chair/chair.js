/*
* Arc-reactor view script
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


// Global variables and constants
var camera, scene, renderer, controls, stats;
var clock = new THREE.Clock();
var group = new THREE.Group();

// Lights
var hemiLight, dirLight;

// Materials
var materialVector = new Array();

// Skybox
var skyMesh;
var skyMaterial;


/*
* Init function
*/ 
function Init() {

	// loads arc-reactor-controls view
	InitStat();
	InitScene();
	InitMaterials();
	InitCamera();
	camera.position.set( 150, 0, 150 );

	InitRenderer();
	LoadMesh();

	sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 8), new THREE.MeshBasicMaterial({color: "red", wireframe: true}));
	group.add(sphere)

	// init scene and camera pose
	scene.add( group );
		
	// general events
	BindEvent( window, 'resize', OnWindowResize );

	// skyMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(500, 64, 64), skyMaterial);
	skyMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(500, 64, 64), new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.5}));
	scene.add(skyMesh);

	Animate();
}


/*
* Given a component definition loads the component and add it to the scene
*/ 
function LoadMesh( ) {
	var loader = new THREE.GLTFLoader();
	loader.load( "../../assets/models/chair.glb", function( gltf ) {
		var gltfMesh = gltf.scene;
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
	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
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
    scene.add( hemiLight );  
	scene.add( dirLight );  
}


/*
* Skybox init
*/
function InitSkyBox()
{
	skyMaterial = new THREE.ShaderMaterial(
		{
			vertexShader: 'sky-vertex',
			fragmentShader: 'sky-fragment',
			uniforms: {
				"skyMap": {type: "t", value: environmentMaps[0]},
				"diffOnly": {type: "f", value: 0.0}
			},
			side: THREE.BackSide
		}
	)
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