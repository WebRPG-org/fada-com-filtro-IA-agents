//=============================================================================
 /*:
 * @plugindesc v1.01; This plugin provides the ability to give enemies a predefined level. See Help for more information.
 * @author FlipelyFlip
 * 
 * @help
 * This script is an add-On to my FFP_PokemonBaseStats.js and
 * FFP_EVExpAndMoneyHandler.js. It gives you the possibility to give
 * enemies a specific level or a range of levels. Also you can set enemies
 * to have no levels and use the set stats at the database instead of calculating
 * the actual stats out of it.
 *=============================================================================
 *   *  Possible Notetags (not case-sensitive)
 *=============================================================================
 * <enemy level: x>
 * This sets the enemies level to x.
 * If you want that your enemy is at level 5 then use:
 * <enemy level: 5>
 *
 * <enemy level: x to y>
 * This sets the enemies level randomly between x and y.
 * If you want that your enemy has a level between 2 and 10 then use:
 * <enemy level: 2 to 10>
 *
 * <no level>
 * If this is used, the enemy will be at Level 0 and all his set stats at
 * the database will be used as they are. (If you give it 50 HP, it will have
 * 50 HP.)
 *
 * <average level>
 * This uses the players party average level.
 *
 * <max level: x>
 * Defines the max-level for an enemy. If the set level would've pass the max
 * level, then it would be set to the max level. It can be used with average
 * level or randomised level together.
 *
 * <min level: x>
 * Works in the opposite way as max level. Here you can define a minimum level
 * for your enemies.
 *
 *=============================================================================
 *   * Changelog
 *=============================================================================
 * v1.01
 * - added a failsave when level would go under 0.
 * - added a failsave for average level if FFP_BaseStats is not used.
 * v1.00
 * - released
 *
 *
 */
//=============================================================================
 
var Imported = Imported || {};
Imported.FFP_EnemyLevels = true;

var FFP = FFP || {};
FFP.EnemyLevel = FFP.EnemyLevel || {};

FFP.EnemyLevel.initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	FFP.EnemyLevel.initMembers.call(this);
	this._calcLevel = false
	this._level = this.calcLevel();
};

Game_Enemy.prototype.calcLevel = function() {
	if (this.enemy() === null) { return 1; };
	this._calcLevel = true;
	var note1 = /<(?:ENEMY LEVEL):[ ](\d+)>/i;
	var note2 = /<(?:ENEMY LEVEL):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
	var note3 = /<(?:NO LEVEL)>/i;
	var note4 = /<(?:AVERAGE LEVEL)>/i;
	var note5 = /<(?:MAX LEVEL):[ ](\d+)>/i;
	var note6 = /<(?:MIN LEVEL):[ ](\d+)>/i;
	var notedata = this.enemy().note.split(/[\r\n]+/);
	var level1 = 1;
	var level2 = 1;
	var minLevel = 1;
	var maxLevel = 99;
	var level = 1;
	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			level = parseInt(RegExp.$1);
		} else if (line.match(note2)) {
			level1 = parseInt(RegExp.$1);
			level2 = parseInt(RegExp.$2);
			level = Math.floor(Math.random() * (level2 - level1) + level1);
		} else if (line.match(note3)) {
			level = 0;
		} else if (line.match(note4)) {
			if (Imported.FFP_BaseStats) {
				level = $gameParty.averageLevel();
			};
		} else if (line.match(note5)) {
			maxLevel = parseInt(RegExp.$1);
		} else if (line.match(note6)) {
			minLevel = parseInt(RegExp.$1);
		};
	};
	
	if (level < minLevel) {
		level = minLevel;
	};
	if (level > maxLevel) {
		level = maxLevel;
	};
	return level;
};

Game_Enemy.prototype.level = function() {
	if (!this._calcLevel) { this._level = this.calcLevel();};
	return this._level;
};