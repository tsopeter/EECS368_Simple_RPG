function randomMap(tile_type, type, include_border){
	let output = new map(map_size, map_size);
	
	let primary_array = new Array;
	for(var i = 0; i < map_size; i++){
		let secondary_array = new Array;
		for(var k = 0; k < map_size; k++){
			secondary_array.push(tile_type);
		}
		primary_array.push(secondary_array);
	}
	
	/*	add stones */
	if(type == 1){
		for(var i = 0; i < 5; i++){
			let arg0 = Math.floor(Math.random() * 8) + 1;
			let arg1 = Math.floor(Math.random() * 8) + 1;
			primary_array[arg0][arg1] = stoneTile;
		}
	}
	
	/*borders*/
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
	
	output.b_load_map(primary_array);
	
	/*	generate undefined map for both movement and enemy */
	output.m_load_map(undefined_map());
	output.e_load_map(undefined_map());
	output.s_load_map(undefined_map());
	
	return output;
}

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

