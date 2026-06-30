/*
 * ==============================================================================
 * ** Victor Engine MV - Action Dodge
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.12.09 > First release.
 *  v 1.01 - 2015.12.18 > Compatibility with Hit Formula.
 *  v 1.02 - 2015.12.21 > Compatibility with Basic Module 1.04.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Action Dodge'] = '1.02';

var VictorEngine = VictorEngine || {};
VictorEngine.ActionDodge = VictorEngine.ActionDodge || {};

(function() {

	VictorEngine.ActionDodge.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.ActionDodge.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Action Dodge', 'VE - Basic Module', '1.04');
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Action Dodge', 'VE - Hit Formula');
	};

	VictorEngine.ActionDodge.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.ActionDodge.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 * ------------------------------------------------------------------------------
 * @plugindesc v1.02 - Increase evasion against specific actions.
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help
 * ------------------------------------------------------------------------------
 * This plugin have affects the Physical Evasion (eva), Magical Evasion (mev) and
 * Critical Evasion (cev).
 * ------------------------------------------------------------------------------
 * Actors, Classes, Enemies, Weapons, Armors and States Notetags:
 * ------------------------------------------------------------------------------
 *
 *  <skill dodge: x, type y>
 *  <skill dodge: x, type y%>
 *  <skill dodge: x, type 'code'>
 *   Change the evasion against the Skill ID x by y%.
 *     x    : ID of the skill
 *     type : evasion type (eva, mev or cev)
 *     y    : change rate
 *
 *  <item dodge: x, type y>
 *  <item dodge: x, type y%>
 *  <item dodge: x, type 'code'>
 *   Change the evasion against the Item ID x by y%.
 *     x    : ID of the item
 *     type : evasion type (eva, mev or cev)
 *     y    : change rate
 *
 *  <element dodge: x, type y>
 *  <element dodge: x, type y%>
 *  <element dodge: x, type 'code'>
 *   Change the evasion against actions with the element x by y% .
 *     x    : ID of the element
 *     type : evasion type (eva, mev or cev)
 *     y    : change rate
 *
 *  <state dodge: x, type y>
 *  <state dodge: x, type y%>
 *  <state dodge: x, type 'code'>
 *   Change the evasion against actions that changes state ID x by y%.
 *     x    : ID of the state
 *     type : evasion type (eva, mev or cev)
 *     y    : change rate
 *
 *  <stype dodge: x, type y>
 *  <stype dodge: x, type y%>
 *  <stype dodge: x, type 'code'>
 *   Change the evasion against the skills with Skill Type ID x by y%.
 *     x    : ID of the skill type
 *     type : evasion type (eva, mev or cev)
 *     y    : change rate
 *
 *  <itype dodge: x, type y>
 *  <itype dodge: x, type y%>
 *  <itype dodge: x, type 'code'>
 *   Change the evasion against the items with Item Type ID x by y%.
 *     x    : ID of the item type
 *     type : evasion type (eva, mev or cev)
 *     y    : change rate
 *
 * ------------------------------------------------------------------------------
 *
 *  When using the 'code' always insert the code inside quotations and don't use
 *  line breaks. The code uses the same values as the damage formula, so you can 
 *  use "a" for the user, "b" for the target, "v[x]" for variable.
 *
 *  The % value is multiplied by the base value, while the flat and code are
 *  added to the base. For exemple, if a battler have 10% evasion against element
 *  ID 2. If it have <element dodge: 2, +50%>, the chance will go to 15% 
 *  (10 + 50% = 15). Now if it have you have <element dodge: 2, +50> the chance
 *  will go to 60% (10 + 50 = 60).
 *
 * ------------------------------------------------------------------------------
 *
 * Example Notetags:
 *   <skill dodge: 4, mev +50%>
 *
 *   <item dodge: 5, eva +25>
 *
 *   <element dodge: 6, cva -25%>
 *
 *   <stype dodge: 1, eva '10 * a.agi / b.agi'>
 *
 * ------------------------------------------------------------------------------
 *
 * Compatibility:
 * - When used together with the plugin 'VE - Hif Formula', place this
 *   plugin above it.
 *
 * ------------------------------------------------------------------------------
 */
 
(function() {
  	
	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.ActionDodge.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.ActionDodge.loadNotetagsValues.call(this, data, index);
		var list = ['actor', 'class', 'enemy', 'weapon', 'armor', 'state'];
		if (this.objectSelection(index, list)) VictorEngine.ActionDodge.loadNotes(data);
	};
	
	VictorEngine.ActionDodge.loadNotes = function(data) {
		data.itemDodge  = data.itemDodge  || [];
		data.skillDodge = data.skillDodge || [];
		data.itypeDodge = data.itypeDodge || [];
		data.stypeDodge = data.stypeDodge || [];
		data.stateDodge = data.stateDodge || [];
		data.elmntDodge = data.elmntDodge || [];
		this.processNotes(data, "item");
		this.processNotes(data, "skill");
		this.processNotes(data, "itype");
		this.processNotes(data, "stype");
		this.processNotes(data, "state");
		this.processNotes(data, "element");
	};
	
	VictorEngine.ActionDodge.processNotes = function(data, type) {
		var part1 = type + ' dodge:[ ]*(\\d+),[ ]*(\\w+)[ ]*';
		var part2 = "([+-]?\\d+\\%?|'[^\']+'|\"[^\"]+\")";
		var regex = new RegExp('<' + part1 + part2 + '>', 'gi');
		var match;
		while ((match = regex.exec(data.note)) !== null) {
			switch (type) {
			case 'item':
				this.processValues(match, data.itemDodge);
				break;
			case 'skill':
				this.processValues(match, data.skillDodge);
				break;
			case 'itype':
				this.processValues(match, data.itypeDodge);
				break;
			case 'stype':
				this.processValues(match, data.stypeDodge);
				break;
			case 'state':
				this.processValues(match, data.stateDodge);
				break;
			case 'element':
				this.processValues(match, data.elmntDodge);
				break;
			};
		};
	};
		
	VictorEngine.ActionDodge.processValues = function(match, data) {
		result = {};
		result.eva = {};
		result.mev = {};
		result.cev = {};
		if (match[2].toLowerCase() === 'eva') { result.eva = this.processDodge(match[3]) };
		if (match[2].toLowerCase() === 'mev') { result.mev = this.processDodge(match[3]) };
		if (match[2].toLowerCase() === 'cev') { result.cev = this.processDodge(match[3]) };
		data[match[1]] = result;
	};
	
	VictorEngine.ActionDodge.processDodge = function(match) {
     	var data = {};
		var value;
		var regex1 = new RegExp('^([+-]?\\d+)(\\%)?', 'gi');
		var regex2 = new RegExp("^('[^\']+'|\"[^\"]+\")", 'gi');
		while ((value = regex1.exec(match)) !== null) {
			if (value[2]) { data.rate = Number(value[1]) } else { data.flat = Number(value[1]) };
		};
		while ((value = regex2.exec(match)) !== null) { data.code = value[1].slice(1, -1) };
		return data
	};
	
	//=============================================================================
	// Game_Action
	//=============================================================================
	
	VictorEngine.ActionDodge.itemEva = Game_Action.prototype.itemEva;
	Game_Action.prototype.itemEva = function(target) {
		var result = VictorEngine.ActionDodge.itemEva.call(this, target);
		return this.getDodgeValue(result, this.isSkill(), this.item(), target);
	};
	
	VictorEngine.ActionDodge.itemCri = Game_Action.prototype.itemCri;
	Game_Action.prototype.itemCri = function(target) {
		var result = VictorEngine.ActionDodge.itemCri.call(this, target);
		return this.getActionDodgeCev(result, this.isSkill(), this.item(), target);
	};
	
	Game_Action.prototype.getDodgeValue = function(result, isSkill, item, target) {
		if (this.isPhysical()) return this.getActionDodgeEva(result, isSkill, item, target);
		if (this.isMagical())  return this.getActionDodgeMev(result, isSkill, item, target);
		return result;
	};	

	Game_Action.prototype.getActionDodgeEva = function(result, isSkill, item, target) {
		var value = this.getActionDodgeValues(isSkill, item, target);
		result += this.getActionDodgeCodeEva(value, target);
		result += this.getActionDodgeFlatEva(value);
		result *= this.getActionDodgeRateEva(value);
		return Math.max(result, 0);
	};	
		
	Game_Action.prototype.getActionDodgeMev = function(result, isSkill, item, target) {
		var value = this.getActionDodgeValues(isSkill, item, target);
		result += this.getActionDodgeCodeMev(value, target);
		result += this.getActionDodgeFlatMev(value);
		result *= this.getActionDodgeRateMev(value);
		return Math.max(result, 0);
	};   
	
	Game_Action.prototype.getActionDodgeCev = function(result, isSkill, item, target) {
		var value = this.getActionDodgeValues(isSkill, item, target);
		result += this.getActionDodgeCodeCev(value, target);
		result += this.getActionDodgeFlatCev(value);
		result *= this.getActionDodgeRateCev(value);
		return Math.max(result, 0);
	};
	
	Game_Action.prototype.getActionDodgeFlatEva = function(value) {
		return value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeFlat.call(this, data.eva) || 0);
		}, 0);
	};
	
	Game_Action.prototype.getActionDodgeRateEva = function(value) {
		var result = value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeRate.call(this, data.eva) || 0) 
		}, 0);
		return Math.max(1.0 + result / 100, 0);
	};   
	
	Game_Action.prototype.getActionDodgeCodeEva = function(value, target) {
		return value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeCode.call(this, data.eva, target) || 0);
		}, 0);
	};
			
	Game_Action.prototype.getActionDodgeFlatMev = function(value) {
		return value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeFlat.call(this, data.mev) || 0);
		}, 0);
	};
	
	Game_Action.prototype.getActionDodgeRateMev = function(value) {
		var result = value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeRate.call(this, data.mev) || 0) 
		}, 0);
		return Math.max(1.0 + result / 100, 0);
	};   
	
	Game_Action.prototype.getActionDodgeCodeMev = function(value, target) {
		return value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeCode.call(this, data.mev, target) || 0);
		}, 0);
	};
	
	Game_Action.prototype.getActionDodgeFlatCev = function(value) {
		return value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeFlat.call(this, data.cev) || 0);
		}, 0);
	};
	
	Game_Action.prototype.getActionDodgeRateCev = function(value) {
		var result = value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeRate.call(this, data.cev) || 0) 
		}, 0);
		return Math.max(1.0 + result / 100, 0);
	};   
	
	Game_Action.prototype.getActionDodgeCodeCev = function(value, target) {
		return value.reduce(function(r, data) { 
			return r + (Game_Action.prototype.getActionDodgeCode.call(this, data.cev, target) || 0);
		}, 0);
	};
	
	Game_Action.prototype.getActionDodgeFlat = function(data) {
		if (data !== undefined && data.flat !== undefined) { return data.flat } else { return 0 };
	};
		
	Game_Action.prototype.getActionDodgeRate = function(data) {
		if (data !== undefined && data.rate !== undefined) { return data.rate } else { return 0 };
	};

	Game_Action.prototype.getActionDodgeCode = function(data, target) {
		if (data !== undefined && data.code !== undefined) {
			var item = this.item();
			var a = this.subject();
			var b = target;
			var v = $gameVariables._data;
			var code  = eval(data.code);
			if (code) return (Number(code) || 0);
		} else {
			return 0;
		};
	};

	Game_Action.prototype.getActionDodgeValues = function(isSkill, item, target) {
		var subject = this.subject();
		return VictorEngine.getAllObjects(target).reduce(function(r, data) {
			var value = Game_Action.prototype.getActionDodgeData.call(this, subject, data, isSkill, item);
			return r.concat(value);
		}, []);
	};
	
	Game_Action.prototype.getActionDodgeData = function(subject, data, isSkill, item) {
		var value;
		var result = [];
		if (isSkill) {
			var itemValue = data.skillDodge[item.id] || {};
			var typeValue = data.stypeDodge[item.id] || {};
		} else {
			var itemValue = data.itemDodge[item.id]  || {};
			var typeValue = data.itypeDodge[item.id] || {};
		};
		var stateValue = VictorEngine.getAllStates(subject, item).reduce(function(r, stateId) {
			value = data.stateDodge[stateId] || {};
			return r.concat(result);
		}, []);
		var elmtnValue = VictorEngine.getAllElements(subject, item).reduce(function(r, elementId) {
			value = data.elmntDodge[elementId] || {};
			return r.concat(value);
		}, []);
		return result.concat(itemValue, typeValue, stateValue, elmtnValue);
	};
	
})(); 