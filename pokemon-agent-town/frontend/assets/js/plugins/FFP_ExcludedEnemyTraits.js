//=============================================================================
 /*:
 * @plugindesc v1.00; This plugin provides the ability to pass traits from an excluded enemy to another battler hiding behind.
 * @author FlipelyFlip
 *
 *
 * @help
 * ATTENTION!!!
 * This plugin is an add-on to FFP_ExcludedEnemies.
 * It's unlikely that it will work without FFP_ExcludedEnemies.
 *
 * With this plugin you can add traits to enemies which are hiding behind
 * excluded enemies. Now you can give your enemies a better evasion while
 * behind trees. Just add the wished traits to pass to an enemy and let it
 * hide behind it.
 *
 * This also applies to actors too, but they won't be shown behind the enemies.
 * So you can add something like Grassland to them and give them a boost
 * this way.
 *
 * There is one notetag available for actors and enemies, which is essential
 * for this plugin. It's the <field size: width,height> notetag. With this
 * notetag you define a specific width and height to your enemies and actors
 * so that they can get the traits from the excluded enemies. Excluded enemies
 * also need this notetag, so the system knows who will gain the traits from
 * it.
 *
 *
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.ExcludedEnemyTraits = true;

var FFP = FFP || {};
FFP.ExcludedEnemyTraits = FFP.ExcludedEnemyTraits || {};

FFP.ExcludedEnemyTraits.traitsSetup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
	FFP.ExcludedEnemyTraits.traitsSetup.call(this, troopId);
	this.getTraitsForEnemies();
	if ($gameSystem.isSideView()) {
		this.getTraitsForActors();
	};
};

Game_Troop.prototype.getTraitsForEnemies = function() {
	console.log(this._noEnemies.length);
	console.log(this._enemies.length);
	for (var i = 0; i < this._noEnemies.length; i++) {
		var x1 = this._noEnemies[i].screenX();
		var w1 = this._noEnemies[i].fieldSize()[0];
		var y1 = this._noEnemies[i].screenY();
		var h1 = this._noEnemies[i].fieldSize()[1];
		var w = [[x1,y1],[x1+w1,y1],[x1,y1+h1],[x1+w1,y1+h1]];
		for (var j = 0; j < this._enemies.length; j++) {
			var x2 = this._enemies[j].screenX();
			var w2 = this._enemies[j].fieldSize()[0];
			var y2 = this._enemies[j].screenY();
			var h2 = this._enemies[j].fieldSize()[1];
			var v = [[x2,y2],[x2+w2,y2],[x2,y2+h2],[x2+w2,y2+h2]];
			
			if (
				// v0-----v1
				// |       |
				// |   w0--+--w1
				// |   |   |  |
				// v2--+--v3  |
					// |      |
					// w2-----w3
				((v[3][0] >= w[0][0] && v[3][1] >= w[0][1]) &&
				 (v[3][0] <= w[1][0] && v[3][1] >= w[1][1]) &&
				 (v[3][0] >= w[2][0] && v[3][1] <= w[2][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1])) ||

					// v0-----v1
					// |      |
				// w0--+--w1  |
				// |   |  |   |
				// |   v2-+---v3
				// |      |
				// w2-----w3
				((v[2][0] >= w[0][0] && v[2][1] >= w[0][1]) &&
				 (v[2][0] <= w[1][0] && v[2][1] >= w[1][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[2][0] <= w[3][0] && v[2][1] <= w[3][1])) ||
				
				// v0-----------v1
				// |            |
				// | w0-----w1  |
				// | |      |   |
				// v2+------+---v3
				  // |      |
				  // w2-----w3
				((v[2][0] <= w[0][0] && v[2][1] >= w[0][1]) &&
				 (v[2][0] <= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[3][0] >= w[1][0] && v[3][1] >= w[1][1]) &&
				 (v[3][0] >= w[3][0] && v[3][1] <= w[3][1])) ||
				
					// w0-----w1
				// v0--+--v1  |
				// |   |  |   |
				// v2--+--v3  |
					// w2-----w3
				((v[1][0] >= w[0][0] && v[1][1] >= w[0][1]) &&
				 (v[1][0] <= w[1][0] && v[1][1] >= w[1][1]) &&
				 (v[3][0] >= w[2][0] && v[3][1] <= w[2][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1])) ||
				
				// w0-----w1
				// |   v0--+--v1
				// |   |   |  |
				// |   v2--+--v3
				// w2-----w3
				((v[0][0] >= w[0][0] && v[0][1] >= w[0][1]) &&
				 (v[0][0] <= w[1][0] && v[0][1] >= w[1][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[2][0] <= w[3][0] && v[2][1] <= w[3][1])) ||
				
					// w0-----w1
				// v0--+------+--v1
				// |   |      |  |
				// v2--+------+--v3
					// w2-----w3
				((v[0][0] <= w[0][0] && v[0][1] >= w[0][1]) &&
				 (v[1][0] >= w[1][0] && v[1][1] >= w[1][1]) &&
				 (v[2][0] <= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[3][0] >= w[3][0] && v[3][1] <= w[3][1])) ||
				
				// w0-----w1
				// |v0---v1|
				// ||     ||
				// |v2---v3|
				// w2-----w3
				((v[0][0] >= w[0][0] && v[0][1] >= w[0][1]) &&
				 (v[1][0] <= w[1][0] && v[1][1] <= w[1][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] >= w[2][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1])) ||

				  // v0-v1
				// w0-+-+-w1
				// | v2-v3|
				// w2-----w3
				((v[2][0] >= w[0][0] && v[2][1] >= w[0][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[3][0] <= w[1][0] && v[3][1] >= w[1][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1]))
				) {
				this._enemies[j].addNewTraits(this._noEnemies[i]._enemyId);
			};
		};
	};
};

Game_Troop.prototype.getTraitsForActors = function() {
	console.log(this._noEnemies.length);
	for (var i = 0; i < this._noEnemies.length; i++) {
		var x1 = this._noEnemies[i].screenX();
		var w1 = this._noEnemies[i].fieldSize()[0];
		var y1 = this._noEnemies[i].screenY();
		var h1 = this._noEnemies[i].fieldSize()[1];
		var w = [[x1,y1],[x1+w1,y1],[x1,y1+h1],[x1+w1,y1+h1]];
		for (var j = 0; j < $gameParty.battleMembers().length; j++) {
			var x2 = 600 + j * 32;
			var w2 = $gameParty.battleMembers()[j].fieldSize()[0];
			var y2 = 280 + j * 48;
			var h2 = $gameParty.battleMembers()[j].fieldSize()[1];
			var v = [[x2,y2],[x2+w2,y2],[x2,y2+h2],[x2+w2,y2+h2]];
			
			if (
				// v0-----v1
				// |       |
				// |   w0--+--w1
				// |   |   |  |
				// v2--+--v3  |
					// |      |
					// w2-----w3
				((v[3][0] >= w[0][0] && v[3][1] >= w[0][1]) &&
				 (v[3][0] <= w[1][0] && v[3][1] >= w[1][1]) &&
				 (v[3][0] >= w[2][0] && v[3][1] <= w[2][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1])) ||

					// v0-----v1
					// |      |
				// w0--+--w1  |
				// |   |  |   |
				// |   v2-+---v3
				// |      |
				// w2-----w3
				((v[2][0] >= w[0][0] && v[2][1] >= w[0][1]) &&
				 (v[2][0] <= w[1][0] && v[2][1] >= w[1][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[2][0] <= w[3][0] && v[2][1] <= w[3][1])) ||
				
				// v0-----------v1
				// |            |
				// | w0-----w1  |
				// | |      |   |
				// v2+------+---v3
				  // |      |
				  // w2-----w3
				((v[2][0] <= w[0][0] && v[2][1] >= w[0][1]) &&
				 (v[2][0] <= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[3][0] >= w[1][0] && v[3][1] >= w[1][1]) &&
				 (v[3][0] >= w[3][0] && v[3][1] <= w[3][1])) ||
				
					// w0-----w1
				// v0--+--v1  |
				// |   |  |   |
				// v2--+--v3  |
					// w2-----w3
				((v[1][0] >= w[0][0] && v[1][1] >= w[0][1]) &&
				 (v[1][0] <= w[1][0] && v[1][1] >= w[1][1]) &&
				 (v[3][0] >= w[2][0] && v[3][1] <= w[2][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1])) ||
				
				// w0-----w1
				// |   v0--+--v1
				// |   |   |  |
				// |   v2--+--v3
				// w2-----w3
				((v[0][0] >= w[0][0] && v[0][1] >= w[0][1]) &&
				 (v[0][0] <= w[1][0] && v[0][1] >= w[1][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[2][0] <= w[3][0] && v[2][1] <= w[3][1])) ||
				
					// w0-----w1
				// v0--+------+--v1
				// |   |      |  |
				// v2--+------+--v3
					// w2-----w3
				((v[0][0] <= w[0][0] && v[0][1] >= w[0][1]) &&
				 (v[1][0] >= w[1][0] && v[1][1] >= w[1][1]) &&
				 (v[2][0] <= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[3][0] >= w[3][0] && v[3][1] <= w[3][1])) ||
				
				// w0-----w1
				// |v0---v1|
				// ||     ||
				// |v2---v3|
				// w2-----w3
				((v[0][0] >= w[0][0] && v[0][1] >= w[0][1]) &&
				 (v[1][0] <= w[1][0] && v[1][1] <= w[1][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] >= w[2][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1])) ||

				  // v0-v1
				// w0-+-+-w1
				// | v2-v3|
				// w2-----w3
				((v[2][0] >= w[0][0] && v[2][1] >= w[0][1]) &&
				 (v[2][0] >= w[2][0] && v[2][1] <= w[2][1]) &&
				 (v[3][0] <= w[1][0] && v[3][1] >= w[1][1]) &&
				 (v[3][0] <= w[3][0] && v[3][1] <= w[3][1]))
				) {
				$gameParty.battleMembers()[j].addNewTraits(this._noEnemies[i]._enemyId);
			};
		};
	};
};

FFP.ExcludedEnemyTraits.initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	FFP.ExcludedEnemyTraits.initMembers.call(this);
	this._addTraits = [];
	this._fieldSize = this.enemySize();
	this._fieldSizeSwitch = false;
};

Game_Enemy.prototype.enemySize = function() {
	if (this.enemy() === null) { return []; };
	this._fieldSizeSwitch = true;
	var note1 = /<(?:ENEMY SIZE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var size = [];
	var notedata = this.enemy().note.split(/[\r\n]+/);
	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			size = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
		};
	};
	if (size.length === 0) {
		size = [0,0];
	};
	return size;
};

Game_Enemy.prototype.fieldSize = function() {
	if (!this._fieldSizeSwitch) { this._fieldSize = this.enemySize();};
	return this._fieldSize;
};

FFP.ExcludedEnemyTraits.traitObjectFFP = Game_Enemy.prototype.traitObjects;
Game_Enemy.prototype.traitObjects = function() {
    var traits = FFP.ExcludedEnemyTraits.traitObjectFFP.call(this);
	if (this._addTraits.length > 0) {
		traits = traits.concat(this.addTraits());
	};
	return traits;
};

Game_Enemy.prototype.addTraits = function() {
	return this._addTraits;
};

Game_Enemy.prototype.addNewTraits = function(newEnemyId) {
	if (this._addTraits.length === 0) {
		this._addTraits = Game_Battler.prototype.traitObjects.call(this).concat($dataEnemies[newEnemyId]);
	} else {
		this._addTraits = this._addTraits.concat(Game_Battler.prototype.traitObjects.call(this).concat($dataEnemies[newEnemyId]));
	};
};

FFP.ExcludedEnemyTraits.initMembersExcluded = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	FFP.ExcludedEnemyTraits.initMembersExcluded.call(this);
	this._addTraits = [];
	this._fieldSizeSwitch = false;
	this._fieldSize = this.actorSize();
};

FFP.ExcludedEnemyTraits.heroTraitObjects = Game_Actor.prototype.traitObjects;
Game_Actor.prototype.traitObjects = function() {
	var objects = FFP.ExcludedEnemyTraits.heroTraitObjects.call(this);
	objects = objects.concat(this.addTraits());
	return objects;
};

Game_Actor.prototype.actorSize = function() {
	if (this.actor() === null) { return []; };
	this._fieldSizeSwitch = true;
	var note1 = /<(?:ACTOR SIZE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var size = [];
	var notedata = this.actor().note.split(/[\r\n]+/);
	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			size = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
		};
	};
	if (size.length === 0) {
		size = [0,0];
	};
	return size;
};

Game_Actor.prototype.fieldSize = function() {
	if (!this._fieldSizeSwitch) { this._fieldSize = this.actorSize();};
	return this._fieldSize;
};

Game_Actor.prototype.addTraits = function() {
	return this._addTraits;
};

Game_Actor.prototype.addNewTraits = function(enemyId) {
	if (this._addTraits.length === 0) {
		this._addTraits = Game_Battler.prototype.traitObjects.call(this).concat($dataEnemies[enemyId]);
	} else {
		this._addTraits = this._addTraits.concat(Game_Battler.prototype.traitObjects.call(this).concat($dataEnemies[enemyId]));
	};
};