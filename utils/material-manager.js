/*
* Material management script
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


//Creates materials
var chair;

// Textures
var environmentMaps = new Array();

var todo = new Set([
    'chair', 
]);

var pointLightColor = new THREE.Vector3();
var envLightColor = new THREE.Vector3();

function InitMaterials()
{
    // Environment map loading
    LoadEnvMaps();

    // Light setup
    pointLightColor = new THREE.Vector3( dirLight.color.r * dirLight.intensity, 
                                         dirLight.color.g * dirLight.intensity, 
                                         dirLight.color.b * dirLight.intensity);
    envLightColor = new THREE.Vector3( hemiLight.color.r * hemiLight.intensity, 
                                       hemiLight.color.g * hemiLight.intensity, 
                                       hemiLight.color.b * hemiLight.intensity);
    
    // Init materials definitions


    // Add material definitions to the materialVector


    // Load glsl shaders from file
    LoadGlsl('../../shaders/chair/fragment.glsl');
    LoadGlsl('../../shaders/chair/vertex.glsl');
}


/*
* Load environment map
*/
var loadedMipmaps = 0;

function LoadEnvMaps()
{
    for( var i = 0; i <= 8; i++ )
    {
        var filename = '../../assets/textures/envmap_mip' + String(i) + '.png';
        var thisTex = LoadTexture( filename );
        environmentMaps.push( thisTex );
    }
}


/*
* Load texture
*/
function LoadTexture( filename )
{
    var result = new THREE.TextureLoader().load( filename, function( texture )
    {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;    
        loadedMipmaps++;
        if( loadedMipmaps == 15 ){
            envmapLoaded = true;
            CheckLoadingState();
        }
    });

    return result;
}