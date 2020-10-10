
/**
*	This is the tile object, it contains alot of information
*/
function tiles(){
	this.n_name;

	this.tile;
	
	this.collision;
	
	this.set_tile = (xs) => {
		this.tile = xs.map(x => x.map( y => y));
	};
	
	this.get_tile = () => {
		return (this.tile).map( x => x.map( y => y));
	};
	
	this.container;
	
	this.set_container = (obj) => {
		this.container = obj;
	};
	
	this.get_container = () => {
		return this.container;
	};	
	
	this.set_name = (name) => {
		this.n_name = name;
	};
	
	this.get_name = () => {
		return this.n_name;
	};
	
	this.set_collision = (val) => {
		this.collision = val;
	};
	
	this.get_collision = () => {
		return this.collision;
	};
}
/*	CONSTANT TILES	*/
const tile_stone = [['grey', 'dimgray', 'silver', 'gainsboro', 'lightgray'],
			 ['dimgray', 'grey', 'silver', 'dimgray', 'grey'],
			 ['gray', 'dimgray', 'silver', 'silver', 'dimgray'],
			 ['gray', 'grey', 'dimgrey','gainsboro', 'grey'],
			 ['grey', 'dimgray', 'silver', 'gainsboro', 'lightgray']];
			 
			 
const tile_slime = [[undefined, 'aqua', 'aqua', 'aqua', undefined],
		  ['aqua', 'aqua', 'aqua', 'aqua', 'aqua'],
		  ['aqua', 'aliceblue', 'aqua', 'aliceblue', 'aqua'],
		  ['aqua', 'darkblue', 'blue', 'darkblue', 'darkcyan'],
		  ['blue', 'blue', 'blue', 'blue', 'blue']];
		  
const player_model = [['black', 'black', 'black', 'black', 'black'],
		    ['black', 'white', 'white', 'white', 'black'],
		    ['black', 'white', 'black', 'white', 'black'],
		    ['black', 'white', 'white', 'white', 'black'],
		    ['black', 'black', 'black', 'black', 'null']];
		    
const tile_brawler = [['red', 'red', 'red', 'red', 'red'],
		      ['red', 'red', 'red', 'red', 'red'],
		      ['red', 'red', 'red', 'red', 'red'],
		      ['red', 'red', 'red', 'red', 'red'],
		      ['red', 'red', 'red', 'red', 'red']];
			 
function randomTextureGenerator(color_array, name, n){
	let output = new tiles();
	output.set_name(name);
	/* generate array */
	let arr = new Array;
	for(var i = 0; i < n; i++){
		let temp_array = new Array;
		for(var k = 0; k < n; k++){
			temp_array.push(randomizer(color_array));
		}
		arr.push(temp_array);
	}
	output.set_tile(arr);
	output.set_collision(0);
	return output;	
}

function randomizer(str_array){
	let arg0 = Math.floor(Math.random() * str_array.length);
	return str_array[arg0];
}

