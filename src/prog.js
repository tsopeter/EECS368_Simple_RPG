/**
*	@file	Run the program
*/
function runGame(){
	/*	test the game using async */
	
	/* set up the map */
	/* map_setup in main -- transfer later */
	map_setup();
	
	/* run async program here */
	while(gameRunFlag){
		let runner = new Promise(playerside, enemyside);
		runner.then(playerside).catch(enemyside);
	};
}

function playerside(result){
	
}

function enemyside(error){

}
