<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset='UTF-8' />
		<title>Online Chat</title>
		<link rel="stylesheet" href="css/main.css" type="text/css">
	</head>
	<body>	
	<?php 
		$colours = array('007AFF','FF7000','FF7000','15E25F','CFC700','CFC700','CF1100','CF00BE','F00');
		$user_colour = array_rand($colours);
	?>
	<div class="chat_wrapper">
		<div class="message_box" id="message_box"></div>
		<div class="panel">
			<input type="text" name="nome" id="nome" placeholder="Nome" maxlength="10" style="width:20%"  />
			<input type="text" name="mensagem" id="mensagem" placeholder="Mensagem" maxlength="80" style="width:60%" />
			<button id="send-btn">Send</button>
		</div>
	</div>
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<script src="js/chat.js" type="text/javascript"></script>
	</body>
</html>