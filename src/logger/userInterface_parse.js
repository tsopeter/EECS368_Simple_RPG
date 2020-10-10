function parseTask(sentence){
	if(typeof(taskInfoStorage) != 'undefined'){
		taskInfoStorage.update(sentence);
	}
}
