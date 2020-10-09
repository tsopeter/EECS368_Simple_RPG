function enable_attack_button_debug(){
	document.querySelector("#attack").addEventListener('click', () => {
		console.log('debug');
		let cur_map = orig.e_return_map();
		
		for(var i = 0; i < map_size; i++){
			for(var k = 0; k < map_size; k++){
				if(typeof(cur_map[i][k]) != 'undefined'){
					console.log(cur_map[i][k]);
					cur_map[i][k].get_container().attribute.health = 0;
					console.log("health: " + cur_map[i][k].get_container().attribute.health);
					checkForEnemyStatus();
					console.log(orig.e_return_map()[i][k]);
					map_to_screen(orig);
					return;
				}
			}
		}
	});
}

function enable_game_end_button_debug(){
	document.querySelector("#endGame").addEventListener('click', () => {
		console.log('debug');
		gameRunFlag = false;
	});
}
