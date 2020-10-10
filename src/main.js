
main = function(){
	console.log("Program start");
	//map_setup();
	//player_rep.setup();
	//map_to_screen(orig);
	
	runGame();

	console.log("Program End");
}

function map_setup(){
	/*	set constant textures	*/
	stoneTile = new tiles();
	stoneTile.set_name('stone');
	stoneTile.set_tile(tile_stone);
	stoneTile.set_collision(1);
	
	playerTile = new tiles();
	playerTile.set_name('player');
	playerTile.set_tile(player_model);

	/*	generate textures 	*/
	let grassTile = randomTextureGenerator(grass, 'grass', 5);
	
	let desertTile = randomTextureGenerator(sand, 'sand', 5);
	
	let marsTile = randomTextureGenerator(mars, 'mars', 5);
	
	
	/*	generate Map	*/
	orig = randomMap(desertTile, 0, [0, 1, 1, 0]);
	
	let map2 = randomMap(grassTile, 1, [0, 1, 0, 1]);
	
	let map3 = randomMap(grassTile, 1, [1, 1, 0, 1]);
	
	let map4 = randomMap(marsTile, 1, [1, 0, 1, 1]);
	
	/* 	add enemy to map */
	/*
	let tileSlime = new tiles();
	tileSlime.set_container(new slime());
	tileSlime.get_container().setup(5, 5, orig);
	addEnemyTile(tileSlime);
	*/
	/* generate enemies */
	/*
	let tileSlime = new Array;
	for(var i = 0; i < 2; i++){
		tileSlime.push(new tiles());
		tileSlime[i].set_container(new slime());
		tileSlime[i].get_container().setup(i+1, i+1, orig);
		tileSlime[i].set_tile(tile_slime);
		tileSlime[i].set_collision(1);
		
		/*	add to tile	*/
		//addEnemyTile(tileSlime[i]);
	//}
	/*
	let tileBrawler = new tiles();
	tileBrawler.set_container(new brawler());
	tileBrawler.get_container().setup(5, 5, map3);
	tileBrawler.set_tile(tile_brawler);
	tileBrawler.set_collision(1);
	
	addEnemyTile(tileBrawler);
	*/
	
	/* auto generate enemies */
	/* if loaded enemies, then first initalize the enemies */
	orig.load_enemy(enemyTypes);
	orig.checkEnemyExist();
	
	map4.load_enemy(enemyTypes);
	map4.checkEnemyExist();

	
	/*	generate sprite tiles */
	let healthTile = new tiles();
	healthTile.set_name('health_potion');
	healthTile.set_tile(health_tile);
	healthTile.set_collision(1);
	healthTile.set_container(new properties());
	healthTile.get_container().setup(6, 6, orig, addHealth, 4);
	
	addEnemyTile(healthTile);
	
	let expTile = new tiles();
	expTile.set_name('exp_potion');
	expTile.set_tile(exp_tile);
	expTile.set_collision(1);
	expTile.set_container(new properties());
	expTile.get_container().setup(7, 7, orig, addExp, 4);
	
	addEnemyTile(expTile);
	
	/*	link map	*/
	link(orig, map2, 0);
	link(map2, map3, 0);
	link(orig, map4, 3);
	
	/* enable any debuggers */
	enable_attack_button_debug();
	enable_game_end_button_debug();
	
	player_rep.setup();
	map_to_screen(orig);
}

function addEnemyTile(tile_object){
	let cur_map = tile_object.get_container().return_map();
	let arr = cur_map.e_return_map();
	arr[tile_object.get_container().attribute.y][tile_object.get_container().attribute.x] = tile_object;
	cur_map.e_load_map(arr);
}

