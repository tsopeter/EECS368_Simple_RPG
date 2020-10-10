function enemyFunctionsAtCurrentMap(){
	let cur_map = orig.e_return_map();
	
	for(var i = 0; i < map_size; i++){
		for(var k = 0; k < map_size; k++){
			if(typeof(cur_map[i][k]) != 'undefined'){
				let elem = cur_map[i][k];
				
				//console.log(elem);
				elem.get_container().move();
				elem.get_container().attack();
				
			}
		}
	}
}
