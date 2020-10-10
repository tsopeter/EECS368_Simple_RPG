/**
*	@file	This holds basic enemies
*/

/**
*	@This holds basic enemy attributes
*/

let enemyTypes = [[tile_slime, slime], [tile_slime, slime], [tile_brawler, brawler]];

function basic_enemy_attributes(){
	this.x;
	this.y;

	this.health;
	this.damage;
	
	this.state;
	
	this.dropExp;
	
	this.active = () => {
		if(this.state == 1){
			this.state = 0;
		}
		else{
			this.state = 1;
		}
	};
	
	this.map_obj;
	
	this.move = () => {
		if(this.state == 0){
			return;
		}
		let move_card = Math.floor(Math.random() * 4);
		let x = 0;
		let y = 0;
		let success = 0;
		//console.log(this);
		//console.log(this.map_obj);
		if(move_card == 0 && this.y - 1 >= 0){
			if(!(check_for_valid_step(this.map_obj.b_return_map()[this.y - 1][this.x])) && !(check_for_valid_step(this.map_obj.e_return_map()[this.y - 1][this.x]))){
				y = this.y - 1;
				x = this.x;
				success = 1;
			}
		}
		else if(move_card == 1 &&  this.x - 1 >= 0){
			if(!(check_for_valid_step(this.map_obj.b_return_map()[this.y][this.x - 1])) && !(check_for_valid_step(this.map_obj.e_return_map()[this.y][this.x - 1]))){
				x = this.x - 1;
				y = this.y;
				success = 1;
			}
		}
		else if(move_card == 2 && this.y + 1 < map_size){
			if(!(check_for_valid_step(this.map_obj.b_return_map()[this.y + 1][this.x])) && !(check_for_valid_step(this.map_obj.e_return_map()[this.y + 1][this.x]))){
				y = this.y + 1;
				x = this.x;
				success = 1;
			}
		}
		else if(move_card == 3 && this.x + 1 < map_size){
			if(!(check_for_valid_step(this.map_obj.b_return_map()[this.y][this.x + 1])) && !(check_for_valid_step(this.map_obj.e_return_map()[this.y][this.x + 1]))){
				x = this.x + 1;
				y = this.y;
				success = 1;
			}
		}
		else{
			return;
		}
		if(success == 0){
			return;
		}
		/*	update the map	*/
		enemyUpdate(this.map_obj, this.x, this.y, x, y);
		
		/*	update coordinate */
		this.x = x;
		this.y = y;
		
	};
	
	this.attack = () => {
		/* check to see if player is close */
		
		/* check up */
		if(this.y - 1 >= 0){
			if(typeof(this.map_obj.m_return_map()[this.y - 1][this.x]) != 'undefined'){
				player_rep.takeDamage(this.damage);
				return;
			}
		}
		if(this.x - 1 >= 0){
			if(typeof(this.map_obj.m_return_map()[this.y][this.x - 1]) != 'undefined'){
				player_rep.takeDamage(this.damage);
				return;
			}
		}
		if(this.y + 1 < map_size){
			if(typeof(this.map_obj.m_return_map()[this.y + 1][this.x]) != 'undefined'){
				player_rep.takeDamage(this.damage);
				return;
			}
		}
		if(this.x + 1 < map_size){
			if(typeof(this.map_obj.m_return_map()[this.y][this.x + 1]) != 'undefined'){
				player_rep.takeDamage(this.damage);
				return;
			}
		}
	};
	
	this.setup = (health, damage, x, y, map_obj, experience) => {
		this.health = health;
		this.damage = damage;
		this.x = x;
		this.y = y;
		this.map_obj = map_obj;
		this.dropExp = experience;
	};
	/*	unused	*/
	this.die = () => {
		/* get the enemy map */
		let t = this.map_obj
		t[this.y][this.x] = undefined;
		return;
	};
	
	this.takeDamage = (damage) => {
		this.health = this.health - damage;
	};
}

function slime(){
	this.attribute = new basic_enemy_attributes();
	
	this.setup = (x, y, map_obj) => {
		this.attribute.setup(5, 0.5, x, y, map_obj, 1);
		this.counter = 0;
		this.attackCounter = 0;
	};
	
	this.attack = () => {
		this.attribute.attack();
	};
	
	this.move = () => {
		this.counter++;
		if(this.counter % 4 == 0){
			this.attribute.move();
		}
		if(this.counter > 20){
			this.counter = 0;
		}
	};
	
	this.die = () => {
		this.attribute.die();
	};
	
	this.takeDamage = (damage) => {
		this.attackCounter++;
		if(this.attackCounter % 2 == 0){
			this.attribute.takeDamage(damage);
		}
		if(this.attackCounter > 20){
			this.attackCounter = 0;
		}
	};
	
	this.return_map = () => {
		return this.attribute.map_obj;
	};
	
	this.dropexp = () => {
		return this.attribute.dropExp;
	};
	
	this.counter;
	this.attackCounter;
}

function brawler(){
	this.attribute = new basic_enemy_attributes();
	
	this.setup = (x, y, map_obj) => {
		this.attribute.setup(5, 1, x, y, map_obj, 3);
		this.counter = 0;
		this.attackCounter = 0;
	};
	
	this.attack = () => {
		this.attribute.attack();
	};
	
	this.move = () => {
		this.counter++;
		if(this.counter % 3 == 0){
			this.attribute.move();
		}
		if(this.counter > 20){
			this.counter = 0;
		}
	};
	
	this.die = () => {
		this.attribute.die();
	};
	
	this.takeDamage = (damage) => {
		this.attackCounter++;
		if(this.attackCounter % 2 == 0){
			this.attribute.takeDamage(damage);
		}
		if(this.attackCounter > 20){
			this.attackCounter = 0;
		}
	};
	
	this.return_map = () => {
		return this.attribute.map_obj;
	};
	
	this.dropexp = () => {
		return this.attribute.dropExp;
	};
	
	this.counter;
	this.attackCounter;
}

function enemyUpdate(map_obj, cur_x, cur_y, next_x, next_y){
	let e_map = map_obj.e_return_map();
	
	let temp_tile = e_map[cur_y][cur_x];
	e_map[next_y][next_x] = temp_tile;
	e_map[cur_y][cur_x] = undefined;
	map_obj.e_load_map(e_map);
}

function checkForEnemyStatus(){
	let e_map = orig.e_return_map();
	console.log(e_map);
	for(var i = 0; i < map_size; i++){
		for(var k = 0; k < map_size; k++){
			if(typeof(e_map[i][k]) != 'undefined'){
				if(e_map[i][k].get_container().attribute.health <= 0){
					player_rep.experience += e_map[i][k].get_container().dropexp();
					e_map[i][k] = undefined;
				}
			}
		}
	}
	orig.e_load_map(e_map);
}
