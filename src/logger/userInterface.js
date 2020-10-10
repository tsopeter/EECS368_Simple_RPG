function userInterfaceSetup(){
	userInterfaceCanvas = document.getElementById('userInterfaceCanvas');
	userInterfaceCtx = userInterfaceCanvas.getContext('2d');
	
	/* clear the map first */
	clearRoutine();
	
	/* fill in the inital background */
	drawBackground();
	
	/* set the style to draw text */
	userInterfaceCtx.font = "15px OCR A Std, monospace";
	userInterfaceCtx.fillStyle = 'white';
	userInterfaceCtx.textAlgin = 'left';
	
	/* userInfoStorage as a object to handle data */	
	userInfoStorage = new dataHandler();
}

function drawInfo(){
	/* change background */
	backgroundCombine();

	/* retreive information */
	retreiveData();
	
	/* draw to screen */
	drawUserInfo();
}

function backgroundCombine(){
	clearRoutine();
	drawBackground();
}

function clearRoutine(){
	/* clear the userInterface Canvas */
	userInterfaceCtx.clearRect(0, 0, userInterfaceCanvas.width, userInterfaceCanvas.height);
}

function drawBackground(){
	/* draw a white square background */
	userInterfaceCtx.fillStyle = 'white';
	userInterfaceCtx.fillRect(0, 0, userInterfaceCtx.width, userInterfaceCtx.height);
	
	/* draw a blue background */
	userInterfaceCtx.fillStyle = 'blue';
	userInterfaceCtx.fillRect(5, 5, userInterfaceCanvas.width - 10, userInterfaceCanvas.height - 10);
	
	/*draw a thin white line */
	userInterfaceCtx.fillStyle = 'white';
	userInterfaceCtx.fillRect(0, 125, userInterfaceCanvas.width, 5);
	
	/*draw blocks surrounding the white line */
	userInterfaceCtx.fillRect(5, 5, 5, 5);
	userInterfaceCtx.fillRect(userInterfaceCanvas.width - 10, 5, 5, 5);
	
	userInterfaceCtx.fillRect(5, 120, 5, 15);
	userInterfaceCtx.fillRect(userInterfaceCanvas.width - 10, 120, 5, 15);
	userInterfaceCtx.fillRect(5, userInterfaceCanvas.height - 10, 5, 5);
	userInterfaceCtx.fillRect(userInterfaceCanvas.width - 10, userInterfaceCanvas.height - 10, 5, 5);
}

function retreiveData(){
	userInfoStorage.update(player_rep.health, player_rep.damage, player_rep.armor, player_rep.experience, player_rep.level, player_rep.fullHealth, player_rep.levelExp);
}

function drawHealthBar(percent, color){
	/* draw white outline */	
	let x_healthbar = 90;
	let y_healthbar = 135;
	let length_healthbar = 190;
	let height_healthbar = 20;
	userInterfaceCtx.fillStyle = 'white';
	userInterfaceCtx.fillRect(x_healthbar, y_healthbar, length_healthbar, height_healthbar);
	
	/* draw blue insert */
	userInterfaceCtx.fillStyle = 'blue';
	userInterfaceCtx.fillRect(x_healthbar + 2, y_healthbar + 2, length_healthbar - 4, height_healthbar - 4);
	
	/*draw red insert */
	if(percent >= 0){
		userInterfaceCtx.fillStyle = 'red';
		userInterfaceCtx.fillRect(x_healthbar + 2, y_healthbar + 2, (length_healthbar - 4) * percent, height_healthbar - 4);
	}
	
	userInterfaceCtx.fillStyle = color;
}

function drawUserInfo(){
	/* set the style to draw text in */
	userInterfaceCtx.fillText("Health: ", 15, 150);
	
	/* draw Health bar */
	
	/* compute the percentage of health */
	let percent = userInfoStorage.playerHealth / userInfoStorage.playerFullHealth;
	
	/* draw the health bar */
	drawHealthBar(percent, userInterfaceCtx.fillStyle);
	
	/*draw the player damage */
	
	userInterfaceCtx.fillText("Damage: " + userInfoStorage.playerAttack, 15, 175);
	
	/* draw the exp needed to get next level */
	userInterfaceCtx.fillText("XP: " + userInfoStorage.playerExp + " / " + userInfoStorage.playerLevelXP, 15, 200);
	
	/* draw the current armor */
	userInterfaceCtx.fillText("Armor: " + userInfoStorage.playerArmor, 15, 225);
	
	/* draw the current level */
	userInterfaceCtx.fillText("Level: " + userInfoStorage.playerLevel, 15, 250);
	
	
}
