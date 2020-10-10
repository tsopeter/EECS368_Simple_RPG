

//function map_to_screen(map_object){
//	/*	get the map object	*/
//	let player_mapper = orig.m_return_map();
//	let background = orig.b_return_map();
//	let enemy = orig.e_return_map();
//	//let enemy = orig.e_return_map();
//	
//	/*	convert the object to the screen */
//	let shift = 10;
//	for(var i = 0; i < background.length; i++){
//		for(var k = 0; k < background[i].length; k++){;
//			translate(background[i][k], shift * k, shift * i);
//			//translate(player_mapper[i][k], shift * k, shift * i);
//			enemyTranslate(enemy[i][k], shift * k, shift *i);
//		}
//	}
//	player_pass();
//}


function map_to_screen(map_obj){
	rendering = true;
	//console.log('first_pass_called: ' + first_pass_called);
	if(first_pass_called == false){
		first_pass(orig);
	}
	/* mask the previous parts */
	player_pass_1();
	let enemy_cache = orig.return_true_enemy_store();
	
	//if there are enemies, render the enemy
	if(typeof(enemy_cache) != 'undefined'){	
		for(var i = 0; i < enemy_cache.length; i++){
			if(typeof(enemy_cache[i]) != 'undefined'){
				enemy_pass_1(enemy_cache[i]); 
			}
		}
		for(var i = 0; i < enemy_cache.length; i++){
			if(typeof(enemy_cache[i]) != 'undefined'){
				enemy_pass_2(enemy_cache[i]);
			}
		}
	}
	
	/* mask the current part */
	player_pass_2();
	rendering = false;
	
}

function first_pass(map_object){
	let background = orig.b_return_map();
	
	let shift = 10;
		for(var i = 0; i < background.length; i++){
			for(var k = 0; k < background[i].length; k++){
				translate(background[i][k], shift * k, shift * i);
			}
		}
	first_pass_called = true;
}

function player_pass_1(){
	let shift = 10;
	
	//render pass on current background tile
	translate(orig.return_background_tile(), shift * (cur_player_pos_x), shift * (cur_player_pos_y));
		
	//render pass on previous background tile
	translate(orig.return_background_tile(), shift * (prev_player_pos_x), shift * (prev_player_pos_y));
}

function player_pass_2(){
	let shift = 10;
	//render pass on current player tile
	translate(playerTile, shift * (cur_player_pos_x), shift * (cur_player_pos_y));
}

function enemy_pass_1(tile_obj){
	let shift = 10;
	
	let cur_x = tile_obj.get_container().attribute.x;
	let cur_y = tile_obj.get_container().attribute.y;
	let prev_x = tile_obj.get_container().attribute.prev_x;
	let prev_y = tile_obj.get_container().attribute.prev_y;
	
	//render pass on current background tile
	translate(orig.return_background_tile(), shift * cur_x, shift * cur_y);
		
	//render pass on previous background tile
	translate(orig.return_background_tile(), shift * prev_x, shift * prev_y);
}

function enemy_pass_2(tile_obj){
	let shift = 10;

	let cur_x = tile_obj.get_container().attribute.x;
	let cur_y = tile_obj.get_container().attribute.y;
	
	//render pass on enemy tile
	enemyTranslate(tile_obj, shift * cur_x, shift * cur_y);
}


/*	takes a tile object
/*	translates the following number to a assigned pre-rendered object */
function translate(tile_obj, x, y){
	if(typeof(tile_obj) == 'undefined'){
		return;
	}
	let elem = tile_obj.get_tile();
	/* each element sprite array is 5x5 */
	let x_d = x * 5;
	let y_d = y * 5;
	let scale = 10;
	let ctx = document.getElementById('myCanvas').getContext('2d');
	for(var i = 0; i < elem.length; i++){
		for(var k = 0; k < elem[i].length; k++){
			if(typeof(elem[i][k]) != 'undefined'){
				ctx.fillStyle = elem[i][k];
				ctx.fillRect(x_d + (scale * k), y_d + (scale * i), scale, scale);
			}
		}
	}
}

function enemyTranslate(tile_obj, x, y){
	if(typeof(tile_obj) == 'undefined'){
		return;
	}
	let elem = tile_obj.get_tile();
	let fullHealth = tile_obj.get_container().attribute.fullHealth;
	let currentHealth = tile_obj.get_container().attribute.health;
	
	let percent = 0;
	if(fullHealth != 0){
		percent = currentHealth / fullHealth;
	}
	let color = undefined;
	if(percent != 0){
		if(percent > 0.9){
			color = 'green';
		}
		else if(percent > 0.5){
			color = 'yellowgreen';
		}
		else if(percent > 0.2){
			color = 'yellow';
		}
		else{
			color = 'red';
		}
	}
	let x_d = x * 5;
	let y_d = y * 5;
	let scale = 10;
	let ctx = document.getElementById('myCanvas').getContext('2d');
	for(var i = 0; i < elem.length; i++){
		for(var k = 0; k < elem[i].length; k++){
			if(i == 0 && k == elem[i].length - 1 && typeof(color) != 'undefined'){
				ctx.fillStyle = color;
				ctx.fillRect(x_d + (scale * k), y_d + (scale * i), scale, scale);
			}
			else if(typeof(elem[i][k]) != 'undefined'){
				ctx.fillStyle = elem[i][k];
				ctx.fillRect(x_d + (scale * k), y_d + (scale * i), scale, scale);
			}
		}
	}
}
