function link(master_map, slave_map, dir){
	let temp_holder_master = master_map.return_linked_map();
	let temp_holder_slave = slave_map.return_linked_map();
	temp_holder_master[dir] = slave_map;
	if(dir == 0){
		temp_holder_slave[2] = master_map;
	}
	else if(dir == 1){
		temp_holder_slave[3] = master_map;
	}
	else if(dir == 2){
		temp_holder_slave[0] = master_map;
	}
	else{
		temp_holder_slave[1] = master_map;
	}
	master_map.load_linked_map(temp_holder_master);
	slave_map.load_linked_map(temp_holder_slave);
}
	
function map_change(slave_map){
	orig = slave_map;
	orig.checkEnemyExist();
	first_pass_called = false;
}
	
