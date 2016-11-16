var array_colors = ['007AFF','FF7000','FF7000','15E25F','CFC700','CFC700','CF1100','CF00BE','F00'];
var random = Math.floor((Math.random() * 10) + 1);

$(document).ready(function(){
	var wsUri = "ws://192.168.2.99:9000/demo/server.php";
	websocket = new WebSocket(wsUri);

	$(window).on('focus',function(){
		document.title = "Online Chat";
	});
	
	websocket.onopen = function(ev) {
		$('#message_box').append("<div class=\"system_msg\">Conectado!</div>");
	}

	$('#send-btn').click(function(){
		var mymessage = $('#mensagem').val();
		var myname = $('#nome').val();
		
		if(myname == ""){
			alert("Digite o seu nome!");
			return;
		}
		if(mymessage == ""){
			alert("Digite uma mensagem!");
			return;
		}
		
		var msg = {
			message: mymessage,
			name: myname,
			color : '#'+array_colors[random]
		};

		$('#mensagem').val('');
		websocket.send(JSON.stringify(msg));
	});
	
	websocket.onmessage = function(ev) {
		var msg = JSON.parse(ev.data);
		var type = msg.type;
		var umsg = msg.message;
		var uname = msg.name;
		var ucolor = msg.color;

		if(type == 'usermsg') 
		{
			$('#message_box').append("<div><span class=\"user_name\" style=\"color:#"+ucolor+"\">"+uname+"</span> : <span class=\"user_message\">"+umsg+"</span></div>");
			if(uname !== $("#nome").val())
			{
				document.title = uname + " enviou uma mensagem";
			}
		}
		if(type == 'system')
		{
			$('#message_box').append("<div class=\"system_msg\">"+umsg+"</div>");
		}
	};
	
	websocket.onerror	= function(ev){$('#message_box').append("<div class=\"system_error\">Ocorreu um erro - "+ev.data+"</div>");}; 
	websocket.onclose 	= function(ev){$('#message_box').append("<div class=\"system_msg\">Conexão encerrada!</div>");}; 
});