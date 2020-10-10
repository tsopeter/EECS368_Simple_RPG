function player(){
	/*	playerMovement */
	this.setup = () => {
		cur_player_pos_x = 4;
		cur_player_pos_y = 4;
		this.x = cur_player_pos_x;
		this.y = cur_player_pos_y;
		
		this.level = 1;
		this.levelExp = 10;
		this.experience = 0;
		
		/*	set all tiles to null tiles except cur */
		let primary_array = new Array;
		for(var i = 0; i < map_size; i++){
			let secondary_array = new Array;
			for(var k = 0; k < map_size; k++){
				if(i == cur_player_pos_y && k == cur_player_pos_x){
					secondary_array.push(playerTile);
				}
				else{
					secondary_array.push(undefined);
				}
			}
			primary_array.push(secondary_array);
		}
		
		this.itemStorage = new playerStorage();
		this.toolStorage = new playerStorage();
		
		this.itemStorage.setup();
		this.toolStorage.setup();
		
		this.fullHealth = 20;
		this.health = 20;
		this.damage = 2;
		this.armor = 0;
		this.damageBonus = 0;
		
		document.getElementById('health').innerText = 'Health: ' + this.health;
		document.getElementById('exp').innerText = 'XP: ' + this.experience;
		orig.m_load_map(primary_array);
	};
	
	this.move = (x, y) => {
		if(!(gameFlag)){
			return;
		}
		/*	no movement */
		if(cur_player_pos_x == x && cur_player_pos_y == y){
			console.log("same area");
			return;
		}
		/*check to see out of bounds and change map accordingly */
		let switched_flag = false
		if(x < 0 && typeof(orig.return_linked_map()[1]) != 'undefined'){
			if(check_for_valid_step(orig.return_linked_map()[1].b_return_map()[y][map_size - 1])){
				return;
			}
			if(check_for_valid_step(orig.return_linked_map()[1].e_return_map()[y][map_size - 1])){
				return;
			}
			let refresh_map = orig.m_return_map();
			refresh_map[y][0] = undefined;
			orig.m_load_map(refresh_map);
			
			map_change(orig.return_linked_map()[1]);
			
			/*update player move to righthand side */
			cur_player_pos_x = map_size - 1;
			x = cur_player_pos_x;
			switched_flag = true;
		}
		else if( x >= map_size && typeof(orig.return_linked_map()[3]) != 'undefined'){
			if(check_for_valid_step(orig.return_linked_map()[3].b_return_map()[y][0])){
				return;
			}
			if(check_for_valid_step(orig.return_linked_map()[3].e_return_map()[y][0])){
				return;
			}
			let refresh_map = orig.m_return_map();
			refresh_map[y][9] = undefined;
			orig.m_load_map(refresh_map);
			
			map_change(orig.return_linked_map()[3]);
			
			cur_player_pos_x = 0;
			x = cur_player_pos_x;
			switched_flag = true;
		}
		else if( y < 0 && typeof(orig.return_linked_map()[0] != 'undefined')){
			if(check_for_valid_step(orig.return_linked_map()[0].b_return_map()[map_size - 1][x])){
				return;
			}
			if(check_for_valid_step(orig.return_linked_map()[0].e_return_map()[map_size - 1][x])){
				return;
			}
			let refresh_map = orig.m_return_map();
			refresh_map[0][x] = undefined;
			orig.m_load_map(refresh_map);
			
			map_change(orig.return_linked_map()[0]);
			
			cur_player_pos_y = map_size - 1;
			y = cur_player_pos_y;
			switched_flag = true;
		}
		else if( y >= map_size && typeof(orig.return_linked_map()[2]) != 'undefined'){
			if(check_for_valid_step(orig.return_linked_map()[2].b_return_map()[0][x])){
				return;
			}
			if(check_for_valid_step(orig.return_linked_map()[2].e_return_map()[0][x])){
				return;
			}
			let refresh_map = orig.m_return_map();
			refresh_map[9][x] = undefined;
			orig.m_load_map(refresh_map);
			
			map_change(orig.return_linked_map()[2]);
			
			cur_player_pos_y = 0;
			y = cur_player_pos_y;
			switched_flag = true;
		}
		
		/*	update the map with new player coord */
		let refresh_map = orig.m_return_map();
		//console.log(refresh_map);
		//console.log("X: " + x + " Y: " + y);
		
		/* load the ememies onto map */
		//load_enemy(refresh_map);
		
		/*check for immovable/unwalkable objects */
		if(x >= 0 && y >= 0 && x < map_size && y < map_size){
			if(check_for_valid_step(orig.b_return_map()[y][x])){
				return;
			}
			if(check_for_valid_step(orig.e_return_map()[y][x])){
				return;
			}
			
		}
		/*	map the player model to new location */
		refresh_map[y][x] = playerTile;
		/*	load into movement map */
		
		/*	set current location to undefined */
		if(switched_flag == false){
			refresh_map[cur_player_pos_y][cur_player_pos_x] = undefined;
		}
		
		/* load map back into the movement map */
		orig.m_load_map(refresh_map);
		
		/* update current position */
		cur_player_pos_x = x;
		cur_player_pos_y = y;
		this.x = x;
		this.y = y;
		map_to_screen(orig);
	};
		
	document.addEventListener('keydown', function keypress_handler(event){
			userTurn = true;
			//console.log('keypress_handler_called');
			if(event.key == 'w'){
				player_rep.move(cur_player_pos_x, cur_player_pos_y - 1);
			}
			else if(event.key == 'a'){
				player_rep.move(cur_player_pos_x - 1, cur_player_pos_y);
			}	
			else if(event.key == 's'){
				player_rep.move(cur_player_pos_x, cur_player_pos_y + 1);
			}
			else if(event.key == 'd'){
				player_rep.move(cur_player_pos_x + 1, cur_player_pos_y);
			}
			else if(event.key == 'Enter'){
				console.log('attack called');
				player_rep.attack();
			}
			else{
				console.log("invalid key press");
			}
	});
	this.fullHealth;
	this.health;
	this.damage;
	this.attack = () => {
		let attack_map = orig.e_return_map();
		console.log(attack_map);
		/*up poisition */
		if(this.y - 1 >= 0){
			console.log(attack_map[this.y - 1][this.x]);
			if(typeof(attack_map[this.y - 1][this.x]) != 'undefined'){
				console.log('attacked');
				attack_map[this.y - 1][this.x].get_container().takeDamage(this.damage + this.damageBonus);
			}
		}
		if(this.y + 1 < map_size){
			if(typeof(attack_map[this.y + 1][this.x]) != 'undefined'){
				console.log('attacked');
				attack_map[this.y + 1][this.x].get_container().takeDamage(this.damage + this.damageBonus);
			}
		
		}
		if(this.x - 1 >= 0){
			if(typeof(attack_map[this.y][this.x - 1]) != 'undefined'){
				console.log('attacked');
				attack_map[this.y][this.x - 1].get_container().takeDamage(this.damage + this.damageBonus);
			}
		
		}
		if(this.x + 1 < map_size){
			if(typeof(attack_map[this.y][this.x + 1]) != 'undefined'){
				console.log('attacked');
				attack_map[this.y][this.x + 1].get_container().takeDamage(this.damage + this.damageBonus);
			}		
		}
		
		orig.e_return_map(attack_map);
	};
	
	this.takeDamage = (damage) => {
		this.health = Math.round((this.health - Math.abs(Math.sqrt(this.armor) - damage)) * 10) / 10;
	};
	
	this.x = cur_player_pos_x;
	this.y = cur_player_pos_y;
	
	this.level;
	this.levelExp;
	this.experience;
	
	this.armor;
	
	this.itemStorage;
	this.toolStorage;
	
	this.damageBonus;
	
	this.levelup = () => {
		if(this.experience >= this.levelExp){
			this.level++;
			alert('You leveled up. You are now level' + this.level);
			this.levelExp = Math.floor(this.levelExp * 1.6);
			this.fullHealth = Math.floor(this.fullHealth * 1.7);
			this.health = this.fullHealth;
			this.experience = 0;
			this.damage = Math.ceil(this.damage * 1.3);
		}
	}
}

function playerStorage(){
	this.storage_array;
	
	this.setup = () => {
		this.storage_array = new Array;
	};
	
	this.addItem = (item) => {
		this.storage_array.push(item);
	};
	
	this.useItem = (idx) => {
		return this.storage_array[idx];
	};
	
	this.dropItem = (idx) => {
		this.storage_array.splice(idx, 1);
	};
	
}

function check_for_valid_step(textureElement){
	if(typeof(textureElement) == 'undefined'){
		return false;
	}
	//console.log(textureElement);
	//console.log(textureElement.get_collision());
	if(textureElement.get_collision() == 1){
		return true;
	}
	return false;
}

function checkPlayerStatus(){
	/* update viewport */
	player_rep.levelup();
	document.querySelector("#level").innerText = "LEVEL: " + player_rep.level;
	document.querySelector('#health').innerText = 'Health: ' + player_rep.health;
	document.querySelector('#exp').innerText = 'XP: ' + player_rep.experience;
	if(player_rep.health <= 0 && player_death_alert){
		alert('You died');
		gameFlag = false;
		gameRunFlag = false;
		player_death_alert = false;
	}
}
