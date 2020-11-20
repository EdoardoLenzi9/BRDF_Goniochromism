/*
* Event listeners definitions
*
* author = 'Edoardo Lenzi'
* version = '1.0'
* license = 'WTFPL-2.0'
*/


/*
* Bind an event with an event handler
* Support for IE8
*/
function BindEvent(element, eventName, eventHandler) {
	if (element.addEventListener){
		element.addEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, eventHandler);
	}
}


/*
* Unbind an event and an event handler
* Support for IE8
*/
function UnbindEvent(element, eventName, eventHandler) {
	if (element.addEventListener){
		element.removeEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.detachEvent('on' + eventName, eventHandler);
	}
}


/*
* Define an event listener on the window resize event 
* (in order to adjust the aspect ratio)
*/
function OnWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}