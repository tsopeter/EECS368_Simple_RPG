/**
*	@file 	This holds the sprite tiles
*/

function item_attributes(){
	this.fullHealth;
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
	if(player_rep.health + health >= player_rep.fullHealth){
		player_rep.health = player_rep.fullHealth
	}
	else{
		player_rep.health += health;
	}
}

function giveSword(){

}

function addExp(expr){
	player_rep.experience += expr;
}

const health_tile = [[undefined, 'darksalmon', 'darksalmon', 'darksalmon', undefined],
		       [undefined, 'azure', 'azure', 'azure', undefined],
		       ['azure', 'red', 'red', 'red', 'azure'],
		       ['azure', 'red', 'red', 'red', 'azure'],
		       [undefined, 'azure', 'azure', 'azure', undefined]];
		       
const exp_tile = [[undefined, 'darksalmon', 'darksalmon', 'darksalmon', undefined],
		  [undefined, 'azure', 'azure', 'azure', undefined],
		  ['azure', 'aqua', 'aqua', 'aqua', 'azure'],
		  ['azure', 'aqua', 'aqua', 'aqua', 'azure'],
		  [undefined, 'azure', 'azure', 'azure', undefined]];
		       
function properties(){
	this.cont;
	this.attribute = new item_attributes();
	
	this.move = () => {
		return;
	};
	
	this.attack = () => {
		return;
	};
	
	this.dropexp = () => {
		return 0;
	};
	
	this.setup = (x, y, map_obj, func, cont) => {
		this.attribute.fullHealth = 0;
		this.attribute.health = 1;
		this.cont = cont;
		this.attribute.x = x;
		this.attribute.y = y;
		this.attribute.map_obj = map_obj;
		this.attribute.func = func;
	};
	
	this.return_map = () => {
		return this.attribute.map_obj;
	};
	
	this.takeDamage = (x) => {
		this.attribute.function(this.cont);
		this.attribute.health = 0;
	};
}

		       
