//=============================================================================
// SSG_MapReferenceEvent.js
// Version 1.2.1
//=============================================================================

/*:
 * @plugindesc Map Reference Events
 * @author Heartbreak61
 * 
 * @help
 * ============================================================================
 * [Simple Stupid Gaming] Map Reference Event
 * 
 * ~~CHANGELOG~~
 * 2015.10.25  ver 1.0.0
 *   - Initial release
 *
 * 2015.11.06  ver 1.1.0
 *   - Reference map is declared on event's note
 *   - Enables the user to set event on the same map as reference
 *
 * 2015.11.14  ver 1.2.0
 *   - Fixed event's page not loaded properly after battle scene. (Thanks to Roguedeus
 *     for pointing this out)
 *
 * 2015.11.15  ver 1.2.1
 *   - Fixed error when trying to load event on map with ID higher than 9
 *
 * ~~INTRODUCTION~~
 * I created this plugin based on Tsukihime's Reference Events for VX Ace.
 * This plugin allows you to create "reference events", then re-use it on
 * another events.
 * 
 * Lets say you have 10 similiar events that will trigger battle against
 * certain troop, then one day you decided to change their graphics or change
 * the troop. It will be time consuming to overwrite all of them, even with
 * copy-paste method. Using this plugin, you can create an event and have
 * other 10 events referenced on that event. 
 * This way, you only have to modify single event, rather than 10 events.
 * 
 * ~~HOW TO USE~~
 * Please write on the event's note
 *
 *  <ref_event:EVENT_ID, MAP_ID>
 *    where EVENT_ID  is your reference event's ID
 *          MAP_ID    is the ID of the map of the reference event
 * 
 * If you don't specify MAP_ID, this plugin will assume that the reference 
 * event is on the same map.
 *
 * example:
 * <ref_event:5>      will set event number 5 of the current map as reference.
 * <ref_event:3, 7>   will set event number 3 from map number 7 as reference.
 * 
 * At once your map is loaded, your "real" events will be replaced by the
 * reference event except for it's ID and location.
 *
 * PS: Sorry for my english.
 */

var Imported = Imported || {};
Imported['SSG Map Reference Events'] = '1.2.1';

var $mapCache = [];

(function() { // don't touch this!
'use strict';

var regexp = /(\d+)\s*[,;]?\s*(\d*)/;

// ==================================================================================
// DataManager
DataManager.loadMapCache = function(mapId) {
    var req = new XMLHttpRequest();
	var src = 'data/Map%1.json'.format(mapId.padZero(3))
    req.open('GET', src);
    req.overrideMimeType('application/json');
    req.onload = function() {
        if (req.readyState < 400) {
			if (!$mapCache[mapId]) {
				$mapCache[mapId] = JSON.parse(req.responseText);
			}
        }
    };
    req.send();
};

// ==================================================================================
// Scene_Map
var _Scene_Map_isReady = Scene_Map.prototype.isReady;
Scene_Map.prototype.isReady = function() {
	if (DataManager.isMapLoaded()){
		for (var i = 0; i < $dataMap.events.length; i++) {
			if (!$dataMap.events[i]) { continue; }
			if (Object.keys($dataMap.events[i].meta).length === 0) { continue; }
			var str = $dataMap.events[i].meta.ref_event;
			if (!str) { continue; }
			var t_eId = Number(str.match(regexp)[1]);
			var t_mId = Number(str.match(regexp)[2]);
			if (t_mId == 0 || !t_mId) {t_mId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();}
			if (t_mId == 0) {continue;}
			DataManager.loadMapCache(t_mId);
			if (!this.isCachedMap(t_mId)) {return false;}
		}
	}
	return _Scene_Map_isReady.call(this);
}

Scene_Map.prototype.isCachedMap = function(mapId) {
	return !!$mapCache[mapId];
}

var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_Scene_Map_onMapLoaded.call(this);
	$gameMap.setupRefEvents();
}

// ==================================================================================
// Game_Map
var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
	this.setupRefEvents();
	_Game_Map_setupEvents.call(this);
};

Game_Map.prototype.setupRefEvents = function() {
	var str, regex, ary, event_id, map_id, map;
	for (var i = 0; i < $dataMap.events.length; i++) {
		if (!$dataMap.events[i]) { continue; }
		if (Object.keys($dataMap.events[i].meta).length === 0) { continue; }
		str = $dataMap.events[i].meta.ref_event;
		if (!str) { continue; }
		event_id = Number(str.match(regexp)[1]);
		map_id = Number(str.match(regexp)[2]);
		if (map_id < 1 || !map_id) { map_id = this._mapId; }
		map = $mapCache[map_id];
		var ref_event = map.events[event_id];
		DataManager.extractMetadata(ref_event);
		ref_event.id = $dataMap.events[i].id;
		ref_event.x = $dataMap.events[i].x;
		ref_event.y = $dataMap.events[i].y;
		$dataMap.events[i] = JSON.parse(JSON.stringify(ref_event));
	}
};

Game_Map.prototype.replaceCachedEvent = function(original, cached) {
	var temp_id = original.id;
	var temp_x = original.x;
	var temp_y = original.y;
	original = JSON.parse(JSON.stringify(cached));
	original.id = temp_id;
	original.x = temp_x;
	original.y = temp_y;
};

})(); // Don't touch this!
