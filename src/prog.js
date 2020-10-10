/**
*	@file	Run the program
*/
function runGame(){
	/*	test the game using async */
	
	/* set up the map */
	/* map_setup in main -- transfer later */
	map_setup();
	
	/* run program here */
	waitLoop();
}

function playerside(){
	enemyFunctionsAtCurrentMap();
	checkForEnemyStatus();
	checkPlayerStatus();
	console.log('called_user_turn');
	drawInfo();
	map_to_screen(orig);
}

function enemyside(){
	console.log('called_enemy_turn');
	
	/* check before calling computational heavy function */
	let check_map = orig.e_return_map();
	for(var i = 0; i < map_size; i++){
		for(var k = 0; k < map_size; k++){
			if(typeof(check_map[i][k]) != 'undefined'){
				enemyFunctionsAtCurrentMap();
				checkForEnemyStatus();
				checkPlayerStatus();
				drawInfo();
				map_to_screen(orig);
				return;
			}
		}
	}
}

function runner(){
	let rp = new Promise((resolve, reject) => {
	
		setTimeout(() => {
			if(userTurn){
				resolve();
				userTurn = false;
			}
			else{
				reject();
			}
			
		}, 750);
	});
	
	rp.then(playerside).catch(enemyside);
}

function waitLoop(){
	/* game has ended */
	if(!(gameRunFlag)){
		return;
	}
	setTimeout(() => {
		runner();
		waitLoop();
	}, 200);
	
}
