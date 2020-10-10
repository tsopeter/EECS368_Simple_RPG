function map_to_screen(map_object){
	/*	get the map object	*/
	let player_mapper = orig.m_return_map();
	let background = orig.b_return_map();
	let enemy = orig.e_return_map();
	//let enemy = orig.e_return_map();
	
	/*	convert the object to the screen */
	let shift = 10;
	for(var i = 0; i < background.length; i++){
		for(var k = 0; k < background[i].length; k++){;
			translate(background[i][k], shift * k, shift * i);
			translate(player_mapper[i][k], shift * k, shift * i);
			enemyTranslate(enemy[i][k], shift * k, shift *i);
		}
	}
}

function first_pass(map_object){
	let background = map_obj.b_return_map();
	
	let shift = 10;
		for(var i = 0; i < background.length; i++){
			for(var k = 0; k < background[i].length; k++){
				translate(background[i][k], shift * k, shift * i);
			}
		}
	}
}

function player_pass(map_object){

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
