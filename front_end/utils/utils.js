/*
* General purpose funtions
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


/*
* read any file and launch the callback funcion on the content
*/
function Read( filePath, callback ){
    var client = new XMLHttpRequest();
    client.open( 'GET', filePath );
    client.onreadystatechange = function() {
        if( client.readyState === 4 )
        {
            if( client.status === 200 || client.status == 0 )
            {
                callback( client.responseText );
            }
        }
    }
    client.send();
}


/*
* Load shader definition from a glsl file
*/
function LoadGlsl( filePath ){
    Read( filePath, function( content ){
        var tag = content.split( '\n' )[ 0 ];
        tag = tag.replace( '\r', '' );
        tag = tag.substring( 2, tag.length );
        glsl[tag] = content 

        todo.delete( tag );
        if( todo.size == 0 ){
            document.dispatchEvent( new CustomEvent( 'loading-complete', { } ));
        }
    })
}


/*
* Start fullscreen mode
*/
function OpenFullscreen( id ) {
    var elem = window.parent.document.getElementById( id );
    if ( elem.requestFullscreen ) {
        elem.requestFullscreen();
    } else if ( elem.mozRequestFullScreen ) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if ( elem.webkitRequestFullscreen ) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if ( elem.msRequestFullscreen ) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
    $( '#compress' ).removeClass( 'invisible' );
    $( '#compress' ).addClass( 'visible' );
    $( '#expand' ).removeClass( 'visible' );
    $( '#expand' ).addClass( 'invisible' );
}


/*
* End fullscreen mode
*/
function CloseFullscreen() {
    if ( window.parent.document.exitFullscreen ) {
        window.parent.document.exitFullscreen();
    } else if ( window.parent.document.mozCancelFullScreen ) { /* Firefox */
        window.parent.document.mozCancelFullScreen();
    } else if ( window.parent.document.webkitExitFullscreen ) { /* Chrome, Safari and Opera */
        window.parent.document.webkitExitFullscreen();
    } else if ( window.parent.document.msExitFullscreen ) { /* IE/Edge */
        window.parent.document.msExitFullscreen();
    }
    $( '#expand' ).removeClass( 'invisible' );
    $( '#expand' ).addClass( 'visible' );
    $( '#compress' ).removeClass( 'visible' );
    $( '#compress' ).addClass( 'invisible' );
}


/*
* Take snapshot
* https://stackoverflow.com/questions/26193702/three-js-how-can-i-make-a-2d-snapshot-of-a-scene-as-a-jpg-image
*/
function downloadImage(frameId) {
    var imgData;
    var strDownloadMime = "image/octet-stream";
    try {
        var strMime = "image/jpeg";
        iframe = document.getElementById(frameId).contentWindow;
        imgData = iframe.renderer.domElement.toDataURL(strMime);
        saveFile(imgData.replace(strMime, strDownloadMime), "screenshot.jpg")
    } catch (e) {
        console.log(e);
        return;
    }

}


function saveAsImage(frameId) {
    var imgData;
    try {
        var strMime = "image/jpeg";
        iframe = document.getElementById(frameId).contentWindow;
        imgData = iframe.renderer.domElement.toDataURL(strMime);
        httpPostAsync('', [/*["Header", "header"]*/], ["screenshot.jpg", imgData], function(reply){console.log(reply)})
    } catch (e) {
        console.log(e);
        return;
    }

}


var saveFile = function (strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}


function loadRun(run_name, frame_id){
    Read( "../../runs/" + run_name, function( content ){
        runs = JSON.parse(content);
        document.getElementById(frame_id).contentWindow.runs = runs
        document.getElementById(frame_id).contentDocument
                .dispatchEvent( new CustomEvent( 'runs', {} ));    
	});
}