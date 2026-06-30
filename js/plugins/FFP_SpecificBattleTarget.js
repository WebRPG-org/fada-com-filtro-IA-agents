//=============================================================================
 /*:
 * @plugindesc v1.00; This plugin provides the ability that enemies can have a rage against certain actors or enemies.
 * @author FlipelyFlip
 *
 * @help
 * With this plugin, you can make enemies to fix them only on one specific
 * actor and/or one specific enemy. They will always attack them until they're
 * dead or they die itself.
 *
 * If a skill hits everyone, the scope will be kept to everyone.
 * If a skill would hit any random target, it will definitly hit once the
 * specific target/s.
 *
 *=============================================================================
 *   *  Possible Notetags (not case-sensitive)
 *=============================================================================
 * <actor rage: x>
 * x = id of the actor
 *
 * <enemy rage: x>
 * x = id of the enemy
 *
 * They can only be used at the enemies notetag.
 *
 *
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.SpecificBattleTarget = true;

var FFP = FFP || {};
FFP.SpecificBattleTarget = FFP.SpecificBattleTarget || {};

Game_Action.prototype.targetsForOpponents = function() {
    var targets = [];
    var unit = this.opponentsUnit();
	var actorRage = 0;
	var enemyRage = 0;
	var all = false;
	var moreTargets = false;
	if (this._subjectEnemyIndex >= 0){
		actorRage = this.actorRage(this._subjectEnemyIndex);
		enemyRage = this.enemyRage(this._subjectEnemyIndex);
	};
    if (this.isForRandom()) {
        for (var i = 0; i < this.numTargets(); i++) {
            targets.push(unit.randomTarget());
        };
		moreTargets = true;
    } else if (this.isForOne()) {
        if (this._targetIndex < 0) {
            targets.push(unit.randomTarget());
        } else {
            targets.push(unit.smoothTarget(this._targetIndex));
        };
    } else {
        targets = unit.aliveMembers();
		all = true;
    };
	
	if ((enemyRage > 0 || actorRage > 0) && !all && !moreTargets) {
		targets = [];
		targets = this.checkTargets(targets, enemyRage, actorRage);
		targets = [this.randTar(targets)];
	} else if ((enemyRage > 0 || actorRage > 0) && moreTargets){
		var newTargets = this.checkTargets([], enemyRage, actorRage);
		if (targets.length > newTargets.length) {
			for (var i = 0; i < newTargets.length; i++) {
				targets[i] = this.randTar(newTargets);
			};
		} else {
			for (var i = 0; i < targets.length; i++) {
				targets[i] = this.randTar(newTargets);
			};
		};
	} else {
		targets = this.checkTargets(targets, enemyRage, actorRage);
	};
	console.log(targets);
    return targets;
};

Game_Action.prototype.randTar = function(targets) {
	var randId = Math.randomInt(targets.length);
	var target = targets[randId];
	return target;
};

Game_Action.prototype.actorRage = function(enemyId) {
	var rage = 0;
	var enemy = $gameTroop.members()[enemyId];
	var note1 = /<(?:ACTOR RAGE):[ ](\d+)>/i;
	var notedata = enemy.enemy().note.split(/[\r\n]+/);
	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			rage = parseInt(RegExp.$1);
		};
	};
	return rage;
};

Game_Action.prototype.enemyRage = function(enemyId) {
	var rage = 0;
	var enemy = $gameTroop.members()[enemyId];
	var note1 = /<(?:ENEMY RAGE):[ ](\d+)>/i;
	var notedata = enemy.enemy().note.split(/[\r\n]+/);
	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			rage = parseInt(RegExp.$1);
		};
	};
	return rage;
};

Game_Action.prototype.checkTargets = function(targets, enemyRage, actorRage) {
	for (var i = 0; i < $gameTroop.aliveMembers().length; i++) {
		if ($gameTroop.aliveMembers()[i]._enemyId === enemyRage) {
			targets.push($gameTroop.aliveMembers()[i]);
		};
	};
	for (var i = 0; i < $gameParty.battleMembers().length; i++) {
		if ($gameParty.battleMembers()[i]._actorId === actorRage) {
			if (!$gameParty.battleMembers()[i].isDead()){
				targets.push($gameParty.battleMembers()[i]);
			};
		};
	};
	return targets;
};