let shopFlag = false;

let prev_coins = 0;

function shopInterface(){
	if(!(shopFlag)){
		shopFlag = true;
		
		
		
		parseTask("Hello, Welcome to my shop!");
		parseTask("Plese look at my wares.");
		
		backgroundCombine();
		
		drawTasks();
		
		drawShopInfo();
		
		
		
		/* create buttons to use */
		let weapons_btn = document.createElement("BUTTON");
		let potions_btn = document.createElement("BUTTON");
		let exit_btn = document.createElement("BUTTON");
		
		/* assign buttons text */
		weapons_btn.innerHTML = "Purchase weapon";
		potions_btn.innerHTML = "Purchase potion";
		exit_btn.innerHTML = "Exit";
		
		/* add buttons to document */
		document.getElementById('viewport').appendChild(weapons_btn);
		document.getElementById('viewport').appendChild(potions_btn);
		document.getElementById('viewport').appendChild(exit_btn);
	
		
		weapons_btn.addEventListener('click', () => {
			if(player_rep.coins < 50){
				alert("Insufficent Funds");
			}
			else{
				parseTask("You purchased a 'BIG SWORD'");
				
				backgroundCombine();
				drawTasks();
				drawShopInfo();
				
				player_rep.damage += 3;
				player_rep.coins -= 50;
			}
		});
		
		potions_btn.addEventListener('click', () => {
			if(player_rep.coins < 10){
				alert("Insufficent Funds");
			}
			else{
				parseTask("You purchased a 'MED POTION'");
				
				backgroundCombine();
				drawTasks();
				drawShopInfo();
				
				addHealth(10);
				player_rep.coins -= 10;
			}
		
		});
		
		exit_btn.addEventListener('click', () => {
			weapons_btn.remove();
			potions_btn.remove();
			exit_btn.remove();
			
			
			/* set back to regular */
			overrideFlag = false;
			shopFlag = false;
			
			parseTask("Thank you!");
		});
	}
	drawCoins();
}

function drawCoins(){
	if(prev_coins != player_rep.coins){
		/* erase the previous */
		userInterfaceCtx.fillStyle = 'blue';
		userInterfaceCtx.fillRect(14, 180, 200, 30);
		
		/* draw number of coins */
		userInterfaceCtx.fillStyle = 'white';
		userInterfaceCtx.fillText("Coins: " + player_rep.coins, 15, 200);
		prev_coins = player_rep.coins;
	}
}

function miniClearRoutine(){
	userInterfaceCtx.clearRect(5, 125, userInterfaceCanvas.width - 10, userInterfaceCanvas.height - 10);
}

function drawShopInfo(){
	userInterfaceCtx.fillStyle = 'white';
	userInterfaceCtx.fillText("(50) Weapon: Big Sword ", 15, 150);
	userInterfaceCtx.fillText("(10) Potion: Full Health", 15, 175);
}
