//=============================================================================
 /*:
 * @plugindesc Adds the ability to automatically add the value of a variable or a switch via code. View helpfile for more info.
 * 
 * @author FlipelyFlip
 *
 * @help
 *
 * This plugin provides you the features of defining the value of a
 * switch or a variable via script codes directly with the switch name
 * and also to keep it up to date at any time.

 * ========================================================================
 *  * How to use it?
 * ========================================================================
 * Name your switch/variable like this:
 * name s: code
 *
 * name = The name used for the switch/variable (not needed).
 * s: = Needed to let the script know, here is the script code to use.
 * code = The actual javaScript Code used to set the switch as true/false
 * or give the variable a value.
 * 
 * Like when I want a switch to be set to true everytime the actor 1s
 * HP is >=  500 you can do it like that:
 *
 * HP >= 500 s: $gameActors._data[1].param(0) >= 500
 *
 * And that's it.
 */
//=============================================================================
var FFP = FFP || {};
FFP.VASSE = FFP.VASSE || {};

FFP.VASSE.game_map_update = Game_Map.prototype.update;

Game_Map.prototype.update = function(sceneActive) {
	FFP.VASSE.game_map_update.call(this, sceneActive);
	$gameVariables.valueUpdate();
	$gameSwitches.valueUpdate();
};

Game_Variables.prototype.valueUpdate = function() {
	var escapeCode = 's: ';
	var nameSplit = '';
	var nameEval = '';
	for (var i = 0; i < $dataSystem.variables.length; i++) {
		if ($dataSystem.variables[i].contains(escapeCode)) {
			nameSplit = $dataSystem.variables[i];
			nameEval = nameSplit.split(escapeCode);
			this.setValue(i, eval(nameEval[1]));
		};
	};
};

Game_Switches.prototype.valueUpdate = function() {
	var escapeCode = 's: ';
	var nameSplit = '';
	var nameEval = '';
	for (var i = 0; i < $dataSystem.switches.length; i++) {
		if ($dataSystem.switches[i].contains(escapeCode)) {
			nameSplit = $dataSystem.switches[i];
			nameEval = nameSplit.split(escapeCode);
			this.setValue(i, eval(nameEval[1]));
		};
	};
};