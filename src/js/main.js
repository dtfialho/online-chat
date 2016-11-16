'use strict';

import jquery from 'jquery';

window.$ = jquery;

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

	socket.on('new message', data => {
		$chat.append(`${data} <br>`);
	});
});