/**
*	@file 	This holds the sprite tiles
*/

function item_attributes(){
	this.health;
	this.x;
	this.y
	
	this.map_obj;
	
	this.func;
	this.function = (x) => {
		this.func(x);
	}
}

function addHealth(health){
	player_rep.health += health;
}

let healthTile;

const health_tile = [[undefined, 'darksalmon', 'darksalmon', 'darksalmon', undefined],
		       [undefined, 'azure', 'azure', 'azure', undefined],
		       ['azure', 'red', 'red', 'red', 'azure'],
		       ['azure', 'red', 'red', 'red', 'azure'],
		       [undefined, 'azure', 'azure', 'azure', undefined]];
		       
function health(){
	this.health;
	this.attribute = new item_attributes();
	
	this.move = () => {
		return;
	};
	
	this.attack = () => {
		return;
	};
	
	this.dropexp = () => {
		return player_rep.experience;
	};
	
	this.setup = (x, y, map_obj, func, health) => {
		this.attribute.health = 1;
		this.health = health;
		this.attribute.x = x;
		this.attribute.y = y;
		this.attribute.map_obj = map_obj;
		this.attribute.func = func;
	};
	
	this.return_map = () => {
		return this.attribute.map_obj;
	};
	
	this.takeDamage = (x) => {
		this.attribute.function(this.health);
		this.attribute.health = 0;
	};
}

		       
