let userInterfaceCanvas;
let userInterfaceCtx;

let userInfoStorage;

function dataHandler(){
	this.playerHealth;
	this.playerFullHealth;
	this.playerAttack;
	this.playerArmor;
	this.playerExp;
	this.playerLevel;
	this.playerLevelXP;
	
	this.update = (health, attack, armor, exp, level, fullHealth, xp) => {
		this.playerHealth = health;
		this.playerAttack = attack;
		this.playerArmor = armor;
		this.playerExp = exp;
		this.playerLevelXP = xp;
		this.playerLevel = level;
		this.playerFullHealth = fullHealth;
	};
}
