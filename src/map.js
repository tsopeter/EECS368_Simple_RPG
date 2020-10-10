/**
*	@file handles map objects
*/
/*	Map object	*/
function map(x, y){
		/*	set the size of the map */
		this.x = x;
		this.y = y;
		
		/* check to see if there are enemy tiles */
		this.exist;
		
		/*	holds linked maps */
		this.linked_map = new Array(4);
		
		/*	load a linked map to the map object */
		this.load_linked_map = (map_array) => {
			this.linked_map = map_array.map(x => x);
			};
		
		/*	this is the current map */
		this.m_map;
		
		/*	this is the background map */
		this.b_map;
		
		/*	this is the enemy map */
		this.e_map;
		
		/*	this stores the enemy objects */
		this.enemy_store;
		
		
		/*	give the map object a array */
		/*	it is a 2d array */
		this.m_load_map = (xs) => {
			this.m_map = xs.map(x => x.map(y => y));
			};
		
		this.b_load_map = (xs) => {
			this.b_map = xs.map(x => x.map(y => y));
			};
		
		this.e_load_map = (xs) => {
			this.e_map = xs.map(x => x.map(y => y));
			};
		
		
		/*	return this map object,
			mainly used for render.js */
		/*	used for player movement */
		this.m_return_map = () => {
			return (this.m_map).map(x => x.map(y => y));
			};
		
		/*	used for background */
		this.b_return_map = () => {
			return (this.b_map).map(x => x.map(y => y));
			};
		
		/*	used for enemies */
		this.e_return_map = () => {
			return (this.e_map).map(x => x.map(z => z));
			};
		
		
		/*	return the linked maps,
			maily used for traversal */
		this.return_linked_map = () => {
			return this.linked_map;
		};
		
		/*	load the enemy onto the enemy_store */
		// example storage format: [[tile_enemy, container_obj], [tile_enemy, container_obj]]
		this.load_enemy = (xs) => {
			this.enemy_store = xs.map(x => x.map(z => z));
		};
		
		this.generate_enemies = () => {
			/* do not generate when enemies are still present */
			if(this.exist != 0){
				return;
			}
			
			/* do not generate when missing array */
			if(typeof(this.enemy_store) == 'undefined'){
				return;
			}
			
			/* do not generate when undefined is in array */
			for(var i = 0; i < this.enemy_store.length; i++){
				if(typeof(this.enemy_store[i][0]) == 'undefined' || typeof(this.enemy_store[i][1]) == 'undefined'){
					return;
				}
			}
			
			/* randomly select a starting point of the enemy array */
			let arg0 = Math.floor(Math.random() * this.enemy_store.length);
			
			/* generate all possible free spaces */
			let free_space = new Array;
			for(var i = 0; i < map_size; i++){
				for(var k = 0; k < map_size; k++){
					if(!(check_for_valid_step(this.e_map[i][k])) && !(check_for_valid_step(this.b_map[i][k]))){
						let tuple = new Array;
						tuple.push(i);
						tuple.push(k);
						free_space.push(tuple);
					}
				}
			}
			//console.log(free_space[0]);
			
			/* generate the enemies */
			while(arg0 >= 0){
				/* set up the enemy */
				let place_random = Math.floor(Math.random() * free_space.length);
				console.log(place_random);

				/* create a new enemy tile */
				let temp_enemy = new tiles();
					
				/* set behavior object to tile container */
				//console.log(this.enemy_store[arg0][0]);
				temp_enemy.set_container(new (this.enemy_store[arg0][1])());
				
				let i = free_space[place_random][0];
				let k = free_space[place_random][1];
				
				/* set up the enemy */
				temp_enemy.get_container().setup(k, i, this);
				
				/* splice out the space as no longer free */
				free_space.splice(place_random, 1);
				
				/* set the tile */
				temp_enemy.set_tile(this.enemy_store[arg0][0]);
				
				/* set collision */
				temp_enemy.set_collision(1);
				
				/* add Enemy to map */
				addEnemyTile(temp_enemy);
				
				/* decrement to next enemy */
				arg0--;
			};
			
			/* set the flag to 1 if there are enemeies */
			if(arg0 != 0){
				this.exist = 1;
			}
		};
		/* call this function on every map change */
		this.checkEnemyExist =	() => {
			for(var i = 0; i < map_size; i++){
				for(var k = 0; k < map_size; k++){
					if(typeof(this.e_map[i][k]) != 'undefined'){
						this.exist = 1;
						return;
					}
				}
			}
			/* set to no enemy */
			this.exist = 0;
			
			/* generate the enemy */
			this.generate_enemies();			
		};		
}

