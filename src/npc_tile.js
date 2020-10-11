const tile_shopkeeper = [[undefined, 'black', 'black', 'black', undefined],
			 [undefined, 'black', undefined, 'black', undefined],
			 [undefined, 'black', 'black', 'black', undefined],
			 [undefined, undefined, 'black', undefined, undefined],
			 [undefined, 'black', undefined, 'black', undefined]];

function npc_attributes(){
	this.x
	this.y
	
	this.prev_x;
	this.prev_y;
	
	this.fullHealth = 0;
	this.health = 100;
	
	this.map_obj
	
	this.func;
	this.function = (x) => {
		this.func(x);
	};
	
	this.move = () => {
		let move_card = Math.floor(Math.random() * 4);
		let x = 0;
		let y = 0;
		
		let success = 0;

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
		
		/* load previous coord */
		this.prev_x = this.x;
		this.prev_y = this.y;
		
		/*	update coordinate */
		this.x = x;
		this.y = y;
		enemyUpdate(this.map_obj, this.prev_x, this.prev_y, this.x, this.y);
		
		
	};
}

function shop(){
	/* output to screen */
	
	/* load into override function */
	overrideFlag = true;
	ov.loadFunction(() => {
		console.log("ov.loadFunction_Called");
		shopInterface();
	});
	
}

function npc_properties(){
	this.move_flag;
	this.attribute = new npc_attributes();
	
	this.move = () => {
		if(this.move_flag == 1){
			this.attribute.move();
		}
		else{
			return;
		}
	};
	
	this.attack = () => {
		return;
	};
	
	this.dropexp = () => {
		return 0;
	};
	
	this.setup = (x, y, map_obj, func, val) => {
		this.attribute.x = x;
		this.attribute.y = y;
		this.attribute.prev_x = x;
		this.attribute.prev_y = y;
		this.attribute.map_obj = map_obj;
		this.attribute.func = func;
		this.move_flag = val;
	};
	
	this.return_map = () => {
		return this.attribute.map_obj;
	};
	
	this.takeDamage = (x) => {
		this.attribute.function();
	};
}



