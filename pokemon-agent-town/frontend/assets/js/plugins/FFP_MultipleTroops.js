//=============================================================================
 /*:
 * @plugindesc v1.00; This plugin allows you to pass the troop maximum of 8 enemies.
 * @author FlipelyFlip
 *
 *
 * @help
 * This plugin provides the feature to create large enemy parties for battles by
 * a simple comment at the troops event page.
 * It gives you the possibility to create realistic battles against more than
 * 8 enemies. You can add as much enemies as you want to your battles.
 * 
 * To add another troop to your existing troop, just use this tag in a comment
 * at your troops event page. The page used for the comment doesn't matter.
 * The comment is:
 *
 * <add troop: x>
 * <add troop: x x x>
 *
 * x is the troop id. You can add multiple troops to a troop. 
 * This is not case sensitive.
 *
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.MultipleTroops = true;

var FFP = FFP || {};
FFP.MultipleTroops = FFP.MultipleTroops || {};

FFP.MultipleTroops.clearTroops = Game_Troop.prototype.clear;
Game_Troop.prototype.clear = function() {
    FFP.MultipleTroops.clearTroops.call(this);
    this._multipleTroops = [];
};

Game_Troop.prototype.multipleTroop = function(troopId) {
	return $dataTroops[this._multipleTroops[troopId]];
};

FFP.MultipleTroops.setupMultipleTroops = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
	FFP.MultipleTroops.setupMultipleTroops.call(this, troopId);
	this.getMultipleTroops();
	for (var i = 0; i < this._multipleTroops.length; i++) {
		this.multipleTroop(i).members.forEach(function(member){
			if ($dataEnemies[member.enemyId]){
				var enemyId = member.enemyId;
				var x = member.x;
				var y = member.y;
				var enemy = new Game_Enemy(enemyId, x, y);
				if (member.hidden) {
					enemy.hide();
				};
				if (enemy.noEnemy()){
					this._noEnemies.push(enemy);
				} else {
					this._enemies.push(enemy);
				};
			};
		}, this);
	};
	this.makeUniqueNames();
	console.log(this.members());
};

Game_Troop.prototype.getMultipleTroops = function() {
	var note = /<([^<>:]+)(:?)([^>]*)>/g;
    var pages = this.troop().pages;
	for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        for (var j = 0; j < page.list.length; j++) {
			var command = page.list[j]
			if (command.code === 108 || command.code === 408) {
				var match = note.exec(command.parameters[0]);
				if (match[1].toUpperCase() === 'ADD TROOP' && match[2] === ':') {
					this._multipleTroops = JSON.parse("[" + match[3] + "]");
				};
			};
        };
    };
};