//-----------------------------------------------------------------------------
//  Galv's Vehicle On/Off Locations
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_VehicleOnOffLocations.js
//-----------------------------------------------------------------------------
//  Version 1.0
//  2015-10-26 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_VehicleOnOffLocations = true;

var Galv = Galv || {};          // Galv's main object
Galv.VOFL = Galv.VOFL || {};    // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Restrict the player from getting on or off boats, ships and
 * airships by using region ID's and/or terrain tag ID's 
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Boat Regions
 * @desc Region ID's separated by commas
 * Where player can get on/off the "Boat" vehicle
 * @default
 *
 * @param Boat Terrains
 * @desc Terrain ID's separated by commas
 * Where player can get on/off the "Boat" vehicle
 * @default
 *
 * @param Ship Regions
 * @desc Region ID's separated by commas
 * Where player can get on/off the "Ship" vehicle
 * @default
 *
 * @param Ship Terrains
 * @desc Terrain ID's separated by commas
 * Where player can get on/off the "Ship" vehicle
 * @default
 *
 * @param Airship Regions
 * @desc Region ID's separated by commas
 * Where player can get on/off the "Airship" vehicle
 * @default
 *
 * @param Airship Terrains
 * @desc Terrain ID's separated by commas
 * Where player can get on/off the "Airship" vehicle
 * @default
*
 * @help
 *   Galv's Vehicle On/Off Locations
 * ----------------------------------------------------------------------------
 * Use the settings to specify which regions/terrain tags you want to use for
 * each default vehicle (boat, ship, airship).
 * Regions are made by going to the "R" tab found on the left when selecting
 * tiles to place on the map.
 * Terrain tags are set in the database "Tilesets" tab by pressing the
 * "Terrain Tag" button on the right and clicking on tiles to change the id.
 *
 * A player can only get on each vehicle if they are standing ON a region or
 * terrain tag specified for them in the settings. They can only get off that
 * vehicle if they will disembark ONTO that region or terrain tag.
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

	var gpar = PluginManager.parameters('Galv_VehicleOnOffLocations');
 	for(var propertyName in gpar) {
	 
		Galv.VOFL[propertyName] = function() {
			array = gpar[propertyName].split(",");
			if (array[0] === "") return [];
			return array.map(Number);
		}();
	};

// GAME PLAYER GET OFF VEHICLE 
 var Galv_Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
 Game_Player.prototype.getOffVehicle = function() {
	allowed = this.checkOnOffLocation(false);
	if (!allowed) return;
    Galv_Game_Player_getOffVehicle.call(this);
};
 

// GAME PLAYER GET ON VEHICLE 
 var Galv_Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
 Game_Player.prototype.getOnVehicle = function() {
	allowed = this.checkOnOffLocation(true);
	if (!allowed) return;
    Galv_Game_Player_getOnVehicle.call(this);
};

// GAME PLAYER CHECK ON OFF LOCATION
 Game_Player.prototype.checkOnOffLocation = function(on) {
	 
	var direction = this.direction();
    var x1 = this.x;
    var y1 = this.y;
	var x2 = $gameMap.roundXWithDirection(x1, direction);
	var y2 = $gameMap.roundYWithDirection(y1, direction); 
	
	if (on) {
		// When getting on
		
		if ($gameMap.airship().pos(x1, y1)) {
			if (!this.onOffAllowed("Airship",x1,y1)) return false;
			
		} else if ($gameMap.ship().pos(x2, y2)) {
			if (!this.onOffAllowed("Ship",x1,y1)) return false;
			
		} else if ($gameMap.boat().pos(x2, y2)) {
			if (!this.onOffAllowed("Boat",x1,y1)) return false;
		};
		return true;
		
	} else {
		// When getting off
		
		if (this.isInAirship()) {
			if (!this.onOffAllowed("Airship",x1,y1)) return false;

		} else if (this.isInShip()) {
			if (!this.onOffAllowed("Ship",x2,y2)) return false;
			
		} else if (this.isInBoat()) {
			if (!this.onOffAllowed("Boat",x2,y2)) return false;
			
		};
	};

	return true;
 };
 
// GAME PLAYER ON OFF ALLOWED?
 Game_Player.prototype.onOffAllowed = function(vname,x,y) {
	 var success = false;
	 // Check Regions
	 for (i = 0; i < Galv.VOFL[vname + " Regions"].length; i++) {
		var rid = $gameMap.regionId(x,y);
		
		if (Galv.VOFL[vname + " Regions"].indexOf(rid) > -1) {
			 success = true;
		};
	 }
	 // Check Terrain Tags
	 for (i = 0; i < Galv.VOFL[vname + " Terrains"].length; i++) {
		var tid = $gameMap.terrainTag(x,y);
		
		if (Galv.VOFL[vname + " Terrains"].indexOf(tid) > -1) {
			 success = true;
		};
	 }
	 return success;
 };

})();