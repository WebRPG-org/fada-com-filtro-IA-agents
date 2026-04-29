/*
 * ==============================================================================
 * ** Victor Engine MV - Element Set
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2016.01.04 > First release
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Element Set'] = '1.00';

var VictorEngine = VictorEngine || {};
VictorEngine.ElementSet = VictorEngine.ElementSet || {};

(function() {

	VictorEngine.ElementSet.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.ElementSet.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Element Set', 'VE - Basic Module', '1.06');
	};

	VictorEngine.ElementSet.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.ElementSet.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 *------------------------------------------------------------------------------ 
 * @plugindesc v1.00 - Set more than one element to Skills and Items.
 * @author Victor Sant
 *
 * @param Element Multiplier
 * @desc Setup how multiple elements are handled.
 * Default: highest. (More information at the Help)
 * @default highest
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 * Skills and Items Notetags:
 * ------------------------------------------------------------------------------
 *
 *  <element set: x, x,...>
 *  Setup the ID of the extra elements of the action.
 *    x : ID of the element.
 *
 * ------------------------------------------------------------------------------
 *
 *  The element set on the action damage section are still valid, the element
 *  is added to the list. If Normal Attack element is set, the attack elements
 *  are added to the extra elements.
 *
 *  The plugin parameter 'Element Multiplier' allows to change how multiple
 *  element resistance are calculated. The following values can be set for it:
 *   highest  : use the highest multiplier. (default behavior)
 *   lowest   : use the lowest multiplier.
 *   addition : sum of all multiplier.
 *   average  : avarage of all multiplier.
 *   multiply : multiply all values.
 *
 *  - highest 
 *  If the battler have a 50% multiplier and a 125% multipler the result will
 *  be 125%. So it uses the weakest resistance.
 *
 *  - lowest 
 *  If the battler have a 50% multiplier and a 125% multipler the result will
 *  be 50%. So it uses the strongest resistance.
 *
 *  - addition
 *  Adds all multipliers. This option consider the base resistance being 100%
 *  and subtract 100 of the multiplier to that value before the addition.
 *  If the battler have a 50% multiplier and a 125% multipler the result will
 *  be 75%. 100 + (50 - 100) + (125 - 100) = 75.
 *
 *  - average
 *  Calculate the average all multipliers. If the battler have a 50% multiplier
 *  and a 125% multipler the result will be 87,5%. (50 + 125) / 2.
 *
 *  - multiply
 *  Multiply all multipliers value. It uses a base of 100% then multiple each
 *  value. If the battler have a 50% multiplier and a 125% multipler the result 
 *  will be 62,5%. 100% * 50% * 125% = 62,5%
 *
 * ------------------------------------------------------------------------------
 *
 * Example Notetags:
 *
 *   <element set: 1>
 *
 *   <element set: 1, 2, 3>
 *
 * ------------------------------------------------------------------------------
 */
	
(function() {

	//=============================================================================
	// Parameters
	//=============================================================================
	
	if (Imported['VE - Basic Module']) {
		var parameters = VictorEngine.getPluginParameters();
		VictorEngine.Parameters = VictorEngine.Parameters || {};
		VictorEngine.Parameters.ElementMultiplier = String(parameters["Element Multiplier"]);
	};
	
	//=============================================================================
	// VictorEngine
	//=============================================================================

	VictorEngine.ElementSet.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.ElementSet.loadNotetagsValues.call(this, data, index);
		var list = ['skill', 'item'];
		if (this.objectSelection(index, list)) VictorEngine.ElementSet.loadNotes(data);
	};
	
	VictorEngine.ElementSet.getAllElements = VictorEngine.getAllElements;
	VictorEngine.getAllElements = function(subject, item) {
		var result = VictorEngine.ElementSet.getAllElements.call(this, subject, item);
		return result.concat(item.elementSet);
	};
	
	VictorEngine.ElementSet.loadNotes = function(data) {
		data.elementSet = data.elementSet || [];
		this.processNotes(data);
	};
	
	VictorEngine.ElementSet.processNotes = function(data) {
		var regex = new RegExp('<element set:[ ]*((?:\\d+[ ]*,?[ ]*)+)>', 'gi');
		var match;
		while ((match = regex.exec(data.note)) !== null) {
			this.processValues(match, data.elementSet);
		};
	};
		
	VictorEngine.ElementSet.processValues = function(match, data) {
		var value;
		var result = {};
		var regex1 = new RegExp('(\\d+)', 'gi');
		while ((value = regex1.exec(match[1])) !== null) { data.push(Number(value[1])) };
	};
	
	//=============================================================================
	// Game_Action
	//=============================================================================

	VictorEngine.ElementSet.calcElementRate	= Game_Action.prototype.calcElementRate;
	Game_Action.prototype.calcElementRate = function(target) {
		elements = VictorEngine.getAllElements(this.subject(), this.item())
		if (elements.length > 1) {
			return this.elementsMaxRate(target, elements)
		} else {
			return VictorEngine.ElementSet.calcElementRate.call(this, target);
		}
	};

	VictorEngine.ElementSet.elementsMaxRate	= Game_Action.prototype.elementsMaxRate;
	Game_Action.prototype.elementsMaxRate = function(target, elements) {
		switch (VictorEngine.Parameters.ElementMultiplier.toLowerCase()) {
		case 'lowest':
			return this.elementMinRate(target, elements);
		case 'addition':
			return this.elementAddRate(target, this.uniqElements(elements));
		case 'average':
			return this.elementAvgRate(target, this.uniqElements(elements));
		case 'multiply':
			return this.elementMltRate(target, this.uniqElements(elements));
		default:
			return VictorEngine.ElementSet.elementsMaxRate.call(this, target, elements);
		}
	};
	
	Game_Action.prototype.uniqElements = function(elements) {
		return elements.filter(function(element, index) {
			return elements.indexOf(element) === index;
		})
	};
	
	Game_Action.prototype.elementMinRate = function(target, elements) {
		return Math.min.apply(null, elements.map(function(elementId) {
			return target.elementRate(elementId);
		}, this));
	};
	
	Game_Action.prototype.elementAddRate = function(target, elements) {
		return elements.reduce(function(r, elementId) {
			return r + (target.elementRate(elementId) - 1);
		}, 1);
	};
	
	Game_Action.prototype.elementAvgRate = function(target, elements) {
		return elements.reduce(function(r, elementId) {
			return r + (target.elementRate(elementId) / elements.length);
		}, 0);
	};
	
	Game_Action.prototype.elementMltRate = function(target, elements) {
		return elements.reduce(function(r, elementId) {
			return r * target.elementRate(elementId);
		}, 1);
	};

})(); 
