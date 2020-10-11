/**
*	@file 	This holds the sprite tiles
*/

function item_attributes(){
	this.fullHealth;
	this.health;
	this.x;
	this.y
	this.prev_x;
	this.prev_y;
	
	this.map_obj;
	
	this.func;
	this.function = (x) => {
		this.func(x);
	};
}

function addHealth(health){
	parseTask("You used a health poition.");
	if(player_rep.health + health >= player_rep.fullHealth){
		parseTask("You now have full health.");
		player_rep.health = player_rep.fullHealth
	}
	else{
		parseTask("You gained " + health + " health points.");
		player_rep.health += health;
	}
}

function giveArmor(armor){
	parseTask("You obtained a shield.");
	parseTask("You gained " + armor + " armor points.");
	player_rep.armor += armor;
}

function addExp(expr){
	parseTask("You used a xp potion.");
	parseTask("You gained " + expr + " xp points.");
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
		  
const armor_tile = [[undefined, 'darkslategray', 'gray', 'white', undefined],
		    ['darkslategray', 'darkslategray', 'darkslategray', 'gray', 'white' ],
		    ['darkslategray', 'darkslategray', 'darkgray', 'gray', 'white' ],
		    [undefined, 'darkslategray', 'darkslategray', 'darkslategray', undefined ],
		    [undefined, 'darkslategray', 'darkslategray', 'azure', undefined ]];
		       
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
	
	this.setup = (x, y, map_obj, func, cont, name) => {
		this.attribute.fullHealth = 0;
		this.attribute.health = 1;
		this.cont = cont;
		this.attribute.x = x;
		this.attribute.y = y;
		this.attribute.prev_x = x;
		this.attribute.prev_y = y;
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

		       
