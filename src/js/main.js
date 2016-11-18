'use strict';

window.$ = require('jquery');

$(document).ready(() => {
	let socket       = io.connect();
	let $messageForm = $("#send-message");
	let $messageBox  = $("#message");
	let $chat        = $("#chat");

	$messageForm.on('submit', e => {
		e.preventDefault();
		socket.emit('send message', $messageBox.val());
		$messageBox.val('');
	});

	$messageBox.on('keyup', e => {
		if(e.type == 13 && !e.shiftKey) {
			$messageForm.triggerEvent('submit');
		}
	});

	socket.on('new message', data => {
		$chat.append(`${data} <br>`);
	});
});