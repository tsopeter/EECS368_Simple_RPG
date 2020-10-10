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
			translate(enemy[i][k], shift * k, shift *i);
		}
	}
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
/*	unused	*/
function load_enemy(arr){
	for(var i = 0; i < map_size; i++){
		for(var k = 0; k < map_size; k++){
			if(orig.e_return_map()[i][k] != 'null'){
				arr[i][k] = getSprite(orig.e_return_map()[i][k]);
			}
		}
	}
	return arr;
}
