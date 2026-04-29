/*
 * ==============================================================================
 * ** Victor Engine MV - Basic Module
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.11.26 > First release.
 *  v 1.01 - 2015.11.29 > Added function to get database objects.
 *  v 1.02 - 2015.12.07 > Added function to get multiples elements.
 *                      > Added check for plugin correct order.
 *  v 1.03 - 2015.12.13 > Added function to get page comments.
 *  v 1.04 - 2015.12.21 > Added function to check only relevant objects.
 *  v 1.05 - 2015.12.25 > Added check to wait bitmap loading.
 *  v 1.06 - 2015.12.31 > Added rgb to hex and hex to rgb functions.
 *                      > Added function to get plugins parameters.     
 *  v 1.07 - 2016.01.07 > Fixed issue with plugin order checks.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Basic Module'] = '1.07';

var VictorEngine = VictorEngine || {};
VictorEngine.BasicModule = VictorEngine.BasicModule || {};

(function() {
	
	VictorEngine.BasicModule.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.BasicModule.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Basic Module');
	};
	
	PluginManager.requiredPlugin = function(name, required, version) {
		VictorEngine.BasicModule.checkPlugins(name, required, version);
	};

})();

/*:
 * ------------------------------------------------------------------------------
 * @plugindesc v1.07 - Plugin with base code required for all Victor Engine plugins.
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 * Install this plugin above any other Victor Engine plugin.
 * ------------------------------------------------------------------------------
 */
 
(function() {
	
	//=============================================================================
	// DataManager
	//=============================================================================

	VictorEngine.BasicModule.isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if (!VictorEngine.BasicModule.isDatabaseLoaded.call(this)) return false;
		VictorEngine.loadParameters();
		VictorEngine.loadNotetags();
		return ImageManager.isReady();
	};

	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.BasicModule.checkPlugins = function(name, req, ver) {
		var msg = '';
		this.loadedPlugins = this.loadedPlugins || {};
		if (ver && req && (!Imported[req] || Number(Imported[req]) < Number(ver))) {
			msg += 'The plugin ' + name + ' requires the plugin ' + req;
			msg += ' v' + ver + ' or higher installed to work properly'
			if (Number(Imported[req]) < Number(ver)) {
				msg += '. Your current version is v' + Imported[req];
			}
			msg += '. Go to http://victorenginescripts.wordpress.com/'
			msg += 'to download the updated plugin.';
			throw msg;
		} else if (!ver && req && this.loadedPlugins[req] === true) {
			msg += 'The plugin ' + name + ' requires the plugin ' + req;
			msg += ' to be placed bellow it. Open the Plugin Manager and place';
			msg += ' the plugins in the correct order.';
			throw msg;
		} else if (req && Imported['VE - Basic Module'] && !this.loadedPlugins['VE - Basic Module']) {
			msg += 'The plugin ' + name + ' must be placed bellow the plugin ' + req;
			msg += '. Open the Plugin Manager and place';
			msg += ' the plugins in the correct order.';
			throw msg;
		} else {
			this.loadedPlugins[name] = true
		}
	};

	VictorEngine.loadNotetags = function() {
		if (VictorEngine.BasicModule.loaded) return;
		VictorEngine.BasicModule.loaded = true;
		var list = [$dataActors, $dataClasses, $dataSkills, $dataItems, $dataWeapons, 
					$dataArmors, $dataEnemies, $dataStates];
		list.forEach(function(objects, index) { this.processNotetags(objects, index) }, this);
	};
	
	VictorEngine.processNotetags = function(objects, index) {
		objects.forEach(function(data) {
			if (data) this.loadNotetagsValues(data, index);
		}, this);
	};
	
	VictorEngine.objectSelection = function(index, list) {
		var objects = ['actor', 'class', 'skill', 'item', 'weapon', 'armor', 'enemy', 'state'];
		return list.contains(objects[index]);
	};
	
	VictorEngine.loadNotetagsValues = function(data) {
	};
	
	VictorEngine.loadParameters = function(data) {
	};
	
	VictorEngine.getNotesValues = function(value1, value2) {
		if (!value2) value2 = value1;
		return new RegExp('<' + value1 + '>((?:[^<]|<[^\\/])*)<\\/' + value2 + '>', 'gi');
	};
	
	VictorEngine.regexTest = function() {
		return "(?:'[^\']+'|\"[^\"]+\")";
	};
	
	VictorEngine.regexGet = function() {
		return "(?:'([^\']+)'|\"([^\"]+)\")";
	};

	VictorEngine.getPageNotes = function(event) {
		if (!event.list()) return "";
		return event.list().reduce(function(r, cmd) {
			var valid   = (cmd.code === 108 || cmd.code === 408);
			var comment = valid ? cmd.parameters[0] + "\r\n" : "";
			return r + comment;
		}, "");
	};
	
	VictorEngine.getAllObjects = function(object) {
		return object.traitObjects().reduce(function(r, obj) {
			return r.concat(obj);
		}, []);
	};
	
	VictorEngine.getAllElements = function(subject, item) {
		if (item.damage.elementId < 0) {
			return subject.attackElements();
		} else {
			return [item.damage.elementId];
		}
	};
	
	VictorEngine.getAllStates = function(subject, item) {
		var result;
		return item.effects.reduce(function(r, effect) {
			if (effect.code === 21) {
				if (effect.dataId === 0) {
					result = subject.attackStates();
				} else {
					result = [effect.dataId];
				};
			} else {
				result = [];
			};
            return r.concat(result);
        }, []);
	};
		
	VictorEngine.arrayUniq = function(array) {
		return array.filter(function(item, index) {
			return array.indexOf(item) === index;
		})
	};
	
	VictorEngine.rgbToHex = function(r, g, b) {
		r = r.toString(16).padZero(2);
		g = g.toString(16).padZero(2);
		b = b.toString(16).padZero(2);
		return '#' + r + g + b;
	}
	
	VictorEngine.hexToRgb = function(hex) {
		var r = parseInt(hex[1] + hex[2], 16)
		var g = parseInt(hex[3] + hex[4], 16)
		var b = parseInt(hex[5] + hex[6], 16)
		return [r, g, b];
	}
	
	VictorEngine.getPluginParameters = function() {
		var script = document.currentScript || (function() {
			var scripts = document.getElementsByTagName('script');
			return scripts[scripts.length - 1];
		})();
		var start = script.src.lastIndexOf('/') + 1;
		var end   = script.src.indexOf('.js');
		return PluginManager.parameters(script.src.substring(start, end));
	}
	
	
})();