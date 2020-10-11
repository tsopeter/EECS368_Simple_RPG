let userInterfaceCanvas;
let userInterfaceCtx;

let overrideFlag = false;

let userInfoStorage;

let ov;

function dataHandler(){
	this.playerHealth;
	this.playerFullHealth;
	this.playerAttack;
	this.playerArmor;
	this.playerExp;
	this.playerLevel;
	this.playerLevelXP;
	this.playerCoins;
	
	this.update = (health, attack, armor, exp, level, fullHealth, xp, coins) => {
		this.playerHealth = health;
		this.playerAttack = attack;
		this.playerArmor = armor;
		this.playerExp = exp;
		this.playerLevelXP = xp;
		this.playerLevel = level;
		this.playerFullHealth = fullHealth;
		this.playerCoins = coins;
	};
}

let taskInfoStorage;

function taskInfo(){
	this.storageArray;
	
	this.limit;
	
	this.setup = (limit) => {
		this.limit = limit;
		this.storageArray = new Array;
		for(var i = 0; i < this.limit; i++){
			this.storageArray.push('...');
		}
	};
	
	this.update = (arg) => {
		this.storageArray.push(arg);
		if(this.storageArray.length > this.limit){
			this.storageArray.shift();
		}
	};
	
	this.return_array = () => {
		return (this.storageArray).map(x => x);
	};
}
