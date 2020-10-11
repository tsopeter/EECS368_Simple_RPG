function parseTask(sentence){
	if(typeof(taskInfoStorage) != 'undefined'){
		taskInfoStorage.update(sentence);
	}
}

function separateTask(sentence){
	if(typeof(taskInfoStorage) != 'undefined'){
		taskInfoStorage.update(sentence);
	}
}

function override(){
	this.func;
	

	this.loadFunction = (func) => {
		this.func = func;
	};
	
	this.useFunction = () => {
		this.func();
	}
}
