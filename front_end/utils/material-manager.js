/*
* Material management script
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


// Creates materials
var chair;

// Textures
var environmentMaps = new Array();

// Shaders in loading queue
var todo = new Set([
    'pbr-vertex', 
    'pbr-fragment',
    'sky-vertex',
    'sky-fragment'
]);


function InitMaterials(envMapName = 'envmap_mip')
{
    // Load GUI settings
    LoadSettings()

    // Environment map loading
    LoadEnvMaps(envMapName);
 
    // Load glsl shaders from file
    LoadGlsl('../../shaders/pbr/fragment.glsl');
    LoadGlsl('../../shaders/pbr/vertex.glsl');
    LoadGlsl('../../shaders/skybox/vertex.glsl');
    LoadGlsl('../../shaders/skybox/fragment.glsl');
}


/*
* Load environment map
*/
var loadedMipmaps = 0;

function LoadEnvMaps(envMapName)
{
    for( var i = 0; i <= 8; i++ )
    {
        var filename = '../../textures/' + envMapName + String(i) + '.png';
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