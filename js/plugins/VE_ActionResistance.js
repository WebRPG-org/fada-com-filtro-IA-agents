/*
 * ==============================================================================
 * ** Victor Engine MV - Action Resistance
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.11.30 > First release.
 *  v 1.01 - 2015.12.07 > Fixed issues with weapon element resistance.
 *  v 1.02 - 2015.12.21 > Compatibility with Basic Module 1.04.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Action Resistance'] = '1.02';

var VictorEngine = VictorEngine || {};
VictorEngine.ActionResistance = VictorEngine.ActionResistance || {};

(function() {

	VictorEngine.ActionResistance.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.ActionResistance.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Action Resistance', 'VE - Basic Module', '1.04');
	};

	VictorEngine.ActionResistance.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.ActionResistance.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 *------------------------------------------------------------------------------ 
 * @plugindesc v1.02 - Reduce the damage taken by specific actions.
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 * This plugin have effect only the damage or healing caused by the action.
 * It have no effect on actions that doesn't heal or deal damage.
 * ------------------------------------------------------------------------------
 * Actors, Classes, Enemies, Weapons, Armors and States Notetags:
 * ------------------------------------------------------------------------------
 *
 *  <skill resistance: x, y>
 *  <skill resistance: x, y%>
 *  <skill resistance: x, 'code'>
 *   Reduce the power of the skill ID x by y or a code value.
 *     x : ID of the skill
 *     y : value changed (can be negative and/or a % value)
 *
 *  <item resistance: x, y>
 *  <item resistance: x, y%>
 *  <item resistance: x, 'code'>
 *   Reduce the power of the item ID x by y or a code value.
 *     x : ID of the item 
 *     y : value changed (can be negative and/or a % value)
 *
 *  <element resistance: x, y>
 *  <element resistance: x, y%>
 *  <element resistance: x, 'code'>
 *   Reduce the power of actions with the element ID x by y or a code value.
 *     x : ID of the element
 *     y : value changed (can be negative and/or a % value)
 *
 *  <state resistance: x, y>
 *  <state resistance: x, y%>
 *  <state resistance: x, 'code'>
 *   Reduce the power of actions that changes state ID x by y or a code value.
 *     x : ID of the state
 *     y : value changed (can be negative and/or a % value)
 *
 *  <stype resistance: x, y>
 *  <stype resistance: x, y%>
 *  <stype resistance: x, 'code'>
 *   Reduce the power of the skills with Skill Type ID x by y or a code value.
 *     x : ID of the skill type
 *     y : value changed (can be negative and/or a % value)
 *
 *  <itype resistance: x, y>
 *  <itype resistance: x, y%>
 *  <itype resistance: x, 'code'>
 *   Reduce the power of the items with Item Type ID x by y or a code value.
 *     x : ID of the item type
 *     y : value changed (can be negative and/or a % value)
 *
 *  <itype resistance: x, y>
 *  <itype resistance: x, y%>
 *  <itype resistance: x, 'code'>
 *   Reduce the power of the items with Item Type ID x by y or a code value.
 *     x : ID of the item type
 *     y : value changed (can be negative and/or a % value)
 *
 * ------------------------------------------------------------------------------
 *
 *  When using the 'code' always insert the code inside quotations and don't use
 *  line breaks. The code uses the same values as the damage formula, so you can 
 *  use "a" for the user, "b" for the target, "v[x]" for variable.
 *
 *  The main difference between this plugin and the 'Action Strengthen' is that
 *  this one looks at the target, while the Action Strengthen looks at the user.
 *
 *  Setting elemental resistance by a % value is different from setting them on
 *  on the database. This setting is applied before the resistance, so it will
 *  not be additive.
 *
 * ------------------------------------------------------------------------------
 *
 * Example Notetags:
 *   <skill resistance: 4, +200>
 *
 *   <item resistance: 5, -25%>
 *
 *   <element resistance: 6, 'b.def * 10'>
 *
 *   <stype resistance: 1, 'Math.max(b.def - a.atk, 0) * v[5]'>
 *
 * ------------------------------------------------------------------------------
 */

	
(function() {

	//=============================================================================
	// VictorEngine
	//=============================================================================
			
	VictorEngine.ActionResistance.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.ActionResistance.loadNotetagsValues.call(this, data, index);
		var list = ['actor', 'class', 'enemy', 'weapon', 'armor', 'state'];
		if (this.objectSelection(index, list)) VictorEngine.ActionResistance.loadNotes(data);
	};
	
	VictorEngine.ActionResistance.loadNotes = function(data) {
		data.itemResistance  = data.itemResistance  || {};
		data.skillResistance = data.skillResistance || {};
		data.itypeResistance = data.itypeResistance || {};
		data.stypeResistance = data.stypeResistance || {};
		data.stateResistance = data.stateResistance || {};
		data.elmntResistance = data.elmntResistance || {};
		this.processNotes(data, "item");
		this.processNotes(data, "skill");
		this.processNotes(data, "itype");
		this.processNotes(data, "stype");
		this.processNotes(data, "state");
		this.processNotes(data, "element");
	};
	
	VictorEngine.ActionResistance.processNotes = function(data, type) {
		var part1 = type + ' resistance:[ ]*(\\d+),[ ]*';
		var part2 = "([+-]?\\d+\\%?|'[^\']+'|\"[^\"]+\")";
		var regex = new RegExp('<' + part1 + part2 + '>', 'gi');
		var match;
		while ((match = regex.exec(data.note)) !== null) {
			switch (type) {
			case 'item':
				this.processValues(match, data.itemResistance);
				break;
			case 'skill':
				this.processValues(match, data.skillResistance);
				break;
			case 'itype':
				this.processValues(match, data.itypeResistance);
				break;
			case 'stype':
				this.processValues(match, data.stypeResistance);
				break;
			case 'state':
				this.processValues(match, data.stateResistance);
				break;
			case 'element':
				this.processValues(match, data.elmntResistance);
				break;
			};
		};
	};
		
	VictorEngine.ActionResistance.processValues = function(match, data) {
		result = {};
		var value;
		var regex1 = new RegExp('^([+-]?\\d+)(\\%)?', 'gi');
		var regex2 = new RegExp("^('[^\']+'|\"[^\"]+\")", 'gi');
		while ((value = regex1.exec(match[2])) !== null) {
			if (value[2]) { result.rate = Number(value[1]) } else { result.flat = Number(value[1]) };
		};
		while ((value = regex2.exec(match[2])) !== null) { result.code = value[1].slice(1, -1) };
		data[match[1]] = result;
	};
	
	//=============================================================================
	// Game_Action
	//=============================================================================

	VictorEngine.ActionResistance.evalDamageFormula = Game_Action.prototype.evalDamageFormula;
	Game_Action.prototype.evalDamageFormula = function(target) {
		var result = VictorEngine.ActionResistance.evalDamageFormula.call(this, target);
		return this.actionResistanceValue(result, this.isSkill(), this.item(), target);
	};
	
	VictorEngine.ActionResistance.itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
	Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
		var newEffect = this.itemEffectResistance(target, effect);
		VictorEngine.ActionResistance.itemEffectRecoverHp.call(this, target, newEffect);
	};
	
	VictorEngine.ActionResistance.itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
	Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
		var newEffect = this.itemEffectResistance(target, effect);
		VictorEngine.ActionResistance.itemEffectRecoverMp.call(this, target, newEffect);
	};
	
	VictorEngine.ActionResistance.itemEffectGainTp = Game_Action.prototype.itemEffectGainTp;
	Game_Action.prototype.itemEffectGainTp = function(target, effect) {
		var newEffect = this.itemEffectResistance(target, effect);
		VictorEngine.ActionResistance.itemEffectGainTp.call(this, target, newEffect);
	};
	
	Game_Action.prototype.actionResistanceValue = function(result, isSkill, item, target) {
		var sign = result > 0;
		var value = this.getActionResistanceValues(isSkill, item, target);
		result -= this.getActionResistanceCode(value, target);
		result -= this.getActionResistanceFlat(value);
		result *= this.getActionResistanceRate(value);
		if (sign) { return Math.max(result, 0) }  else { return Math.min(result, 0)};
	};
	
	Game_Action.prototype.actionResistanceValueRate = function(result, isSkill, item, target) {
		var value = this.getActionResistanceValues(isSkill, item, target);
		return result * this.getActionResistanceRate(value);
	};

	Game_Action.prototype.getActionResistanceRate = function(value) {
		var result = value.reduce(function(r, data) { return r + (data.rate || 0) }, 0);
		return Math.max(1.0 - result / 100, 0);
	};   
	
	Game_Action.prototype.getActionResistanceFlat = function(value) {
		return value.reduce(function(r, data) { return r + (data.flat || 0) }, 0);
	};
	
	Game_Action.prototype.getActionResistanceCode = function(value, target) {
		var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
		return value.reduce(function(r, data) { 
			var result = 0;
			var code   = eval(data.code)
			if (code) result = (Number(code) || 0);
			return r + result;
		}, 0);
	};
	
	Game_Action.prototype.getActionResistanceValues = function(isSkill, item, target) {
		var subject = this.subject();
		return VictorEngine.getAllObjects(target).reduce(function(r, data) {
			var value = Game_Action.prototype.getActionResistanceData.call(this, subject, data, isSkill, item);
			return r.concat(value);
		}, []);
	};
	
	Game_Action.prototype.getActionResistanceData = function(subject, data, isSkill, item) {
		var value;
		var result = [];
		if (isSkill) {
			var itemValue = data.skillResistance[item.id] || {};
			var typeValue = data.stypeResistance[item.stypeId] || {};
		} else {
			var itemValue = data.itemResistance[item.id]  || {};
			var typeValue = data.itypeResistance[item.itypeId] || {};
		};
		var stateValue = VictorEngine.getAllStates(subject, item).reduce(function(r, stateId) {
			value = data.stateResistance[stateId] || {};
			return r.concat(value);
		}, []);
		var elmtnValue = VictorEngine.getAllElements(subject, item).reduce(function(r, elementId) {
			value = data.elmntResistance[elementId] || {};
			return r.concat(value);
		}, []);
		return result.concat(itemValue, typeValue, stateValue, elmtnValue);
	};

	Game_Action.prototype.itemEffectResistance = function(target, effect) {
		var newEffect = {};
		newEffect.code   = effect.code;
		newEffect.dataId = effect.dataId;
		newEffect.value1 = this.actionResistanceValueRate(effect.value1, this.isSkill(), this.item(), target);
		newEffect.value2 = this.actionResistanceValue(effect.value2, this.isSkill(), this.item(), target);
		return newEffect
	};
	
})(); 
