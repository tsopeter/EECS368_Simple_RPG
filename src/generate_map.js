/**
*	@file AutoGenerates a random map with parameters such as type of map
*	      and if there are any borders
*/

/**
*	@param {Object} tile_type : Takes in a tile_type to tile the map
*	@param {Integer} type : Takes in a integer to see randomized obstacles
*	@param {Object} include_border : marks where the borders are
*	@return {Object} output : Returns a ready to use map object
*/
function randomMap(tile_type, type, include_border){
	/* create a new map object */
	let output = new map(map_size, map_size);
	
	/* fill in the background of the map object */
	let primary_array = new Array;
	for(var i = 0; i < map_size; i++){
		let secondary_array = new Array;
		for(var k = 0; k < map_size; k++){
			secondary_array.push(tile_type);
		}
		primary_array.push(secondary_array);
	}
	
	/* add obstacles */
	
	/* add random stone obstacles */
	if(type == 1){
		for(var i = 0; i < 5; i++){
			let arg0 = Math.floor(Math.random() * 8) + 1;
			let arg1 = Math.floor(Math.random() * 8) + 1;
			primary_array[arg0][arg1] = stoneTile;
		}
	}
	
	/* add borders if there are borders */
	if(include_border[0] == 1){
		for(var i = 0; i < map_size; i++){
			primary_array[0][i] = stoneTile;
		}
	}
	if(include_border[1] == 1){
		for(var i = 0; i < map_size; i++){
			primary_array[i][0] = stoneTile;
		}
	}
	if(include_border[2] == 1){
		for(var i = 0; i < map_size; i++){
			primary_array[map_size - 1][i] = stoneTile;
		}
	}
	if(include_border[3] == 1){
		for(var i = 0; i < map_size; i++){
			primary_array[i][map_size - 1] = stoneTile;
		}
	}
	
	/* place the generated map into the background map */
	output.b_load_map(primary_array);
	
	/* generate undefined map for both movement and enemy */
	output.m_load_map(undefined_map());
	output.e_load_map(undefined_map());
	
	/* generate undefined for enemy_store array */
	output.load_enemy(undefined_array());
	
	/* tell map that there are no enemies */
	output.exist = 0;
	
	/* return the newly generated map */
	return output;
}
/**
*	@return {Object} output : returns a undefined map as place holder
*/
function undefined_map(){
	let output = new Array;
	for(var i = 0; i < map_size; i++){
		let temp_array = new Array;
		for(var k = 0; k < map_size; k++){
			temp_array.push(undefined);
		}
		output.push(temp_array);
	}
	return output;
}

/**
*	@return {Object} output : returns a undefined enemy array as a place holder 
*/
function undefined_array(){
	let output = new Array;
	for(var i = 0; i < 2; i++){
		let temp_array = new Array;
		for(var k = 0; k < 2; k++){
			temp_array.push(undefined);
		}
		output.push(temp_array);
	}
	return output;
}

