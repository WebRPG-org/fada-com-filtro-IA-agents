//=============================================================================
 /*:
 * @plugindesc v1.00; This is an add-on for FFP_MultipleTroops. It provides the needed features for event commands.
 * @author FlipelyFlip
 *
 *
 * @help
 * This plugin provides the feature to give you full power of your multiple
 * troops. With this plugin commands you can controll your enemies at a troop
 * and use event commands to target at all enemies past index 7.
 *
 * ===============================================================
 * * Plugin Commands
 * ===============================================================
 * changeHPEnemyId w x y z
 *
 * w = is the enemy index you are changing
 * x = 0 = add, 1 = remove
 * y = value*
 * z = allow knockout (true = allow, false = no knockout)
 *
 * *if you wish to use a variable then use instead of a value this:
 *  $gameVariables.value(id)
 *  replace id with the variableId you wish to use.
 *
 * ----------------------------------------------------------------
 * changeMPEnemyId x y z
 *
 * x = is the enemy index you are changing
 * y = 0 = add, 1 = remove
 * z = value*
 *
 * *if you wish to use a variable then use instead of a value this:
 *  $gameVariables.value(id)
 *  replace id with the variableId you wish to use.
 *
 * ----------------------------------------------------------------
 * changeTPEnemyId x y z
 *
 * x = is the enemy index you are changing
 * y = 0 = add, 1 = remove
 * z = value*
 *
 * *if you wish to use a variable then use instead of a value this:
 *  $gameVariables.value(id)
 *  replace id with the variableId you wish to use.
 *
 * ----------------------------------------------------------------
 * changeEnemyState x y z
 *
 * x = is the enemy index you are changing
 * y = 0 = add, 1 = remove
 * z = is the id of the state you want to apply or remove
 *
 * ----------------------------------------------------------------
 * healEnemyId x
 *
 * x = the enemy index you want to change.
 *
 * ----------------------------------------------------------------
 * showAnimationEnemyId x y
 *
 * x = is the enemy index you are changing
 * y = the animation id you want to play
 *
 * ----------------------------------------------------------------
 * forceActionEnemyId w x y z
 *
 * w = party or troop ( 0 = party, 1 = troop)
 * x = user index
 * y = skill id
 * z = target index
 *
 * ----------------------------------------------------------------
 * transformEnemyIdTo x y
 * 
 * x = the enemy index you want to change
 * y = the enemy id to what you want it to change
 *
 * ----------------------------------------------------------------
 * appearEnemyId x
 *
 * x = the enemy index you want to appear
 *
 * ----------------------------------------------------------------
 *
 *
 *
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.MultipleTroopCommands = true;

var FFP = FFP || {};
FFP.MultipleTroopCommands = FFP.MultipleTroopCommands || {};

FFP.MultipleTroopCommands.pluginCommandItemSelection = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    FFP.MultipleTroopCommands.pluginCommandItemSelection.call(this, command, args);
    // args = [enemyId, (enemyId, enemyId, ...)]
	if (command === 'appearEnemyId' && $gameParty.inBattle()) {
		for (var i = 0; i < args.length; i++) {
			this.iterateEnemyIndex(args[i], function(enemy) {
				enemy.appear();
				$gameTroop.makeUniqueNames();
			}.bind(this));
		};
		// args = [enemyIndex, newEnemyId]
    } else if (command === 'transformEnemyIdTo' && $gameParty.inBattle()) {
		this.iterateEnemyIndex(args[0], function(enemy) {
			enemy.transform(args[1]);
			$gameTroop.makeUniqueNames();
		}.bind(this));
		// args = [party or not, User, Skill, Target]
    } else if (command === 'forceActionEnemyId' && $gameParty.inBattle()) {
		this.iterateBattler(args[0], args[1], function(battler) {
			if (!battler.isDeathStateAffected()) {
				battler.forceAction(args[2], args[3]);
				BattleManager.forceAction(battler);
				this.setWaitMode('action');
			}
		}.bind(this));
		// args = [enemyIndex, animationId]
	} else if (command === 'showAnimationEnemyId' && $gameParty.inBattle()) {
		this.iterateEnemyIndex(args[0], function(enemy) {
			if (enemy.isAlive()) {
				enemy.startAnimation(args[1], false, 0);
			}
		}.bind(this));
		// args = [enemyIndex]
	} else if (command === 'healEnemyId' && $gameParty.inBattle()) {
		this.iterateEnemyIndex(args[0], function(enemy) {
			enemy.recoverAll();
		}.bind(this));
		// args = [enemyIndex, add/remove, stateId]
	} else if (command === 'changeEnemyState' && $gameParty.inBattle()) {
		this.iterateEnemyIndex(args[0], function(enemy) {
			var alreadyDead = enemy.isDead();
			if (args[1] === 0) {
				enemy.addState(args[2]);
			} else {
				enemy.removeState(args[2]);
			}
			if (enemy.isDead() && !alreadyDead) {
				enemy.performCollapse();
			}
			enemy.clearResult();
		}.bind(this));
		// args = [enemyIndex, add/remove, value]
	} else if (command === 'changeTPEnemyId' && $gameParty.inBattle()) {
		var value = this.operateValue(args[1], args[2], args[3]);
		this.iterateEnemyIndex(args[0], function(enemy) {
			enemy.gainTp(value);
		}.bind(this));
		// args = [enemyIndex, add/remove, value]
	} else if (command === 'changeMPEnemyId' && $gameParty.inBattle()) {
		var value = this.operateValue(args[1], args[2], args[3]);
		this.iterateEnemyIndex(args[0], function(enemy) {
			enemy.gainMp(value);
		}.bind(this));		
		// args = [enemyIndex, add/remove, value, allow Knockout]
	} else if (command === 'changeHPEnemyId' && $gameParty.inBattle()) {
		var value = this.operateValue(args[1], args[2], args[3]);
		this.iterateEnemyIndex(args[0], function(enemy) {
			this.changeHp(enemy, value, args[4]);
		}.bind(this));
	};
};