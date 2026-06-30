/*:
 * @plugindesc Alternative Menu Screen: shows a list of Actor names, HP, and MP and gives more room for larger parties.
 * @author SumRndmDde
 *
 * @param List Columns
 * @desc The amount of columns in the list of Actors in the menu. 
 * @default 1
 *
 * @param Max Rows
 * @desc The maximum amount of rows allowed in the list of Actors in the menu. 
 * @default 10
 *
 * @param Item Height
 * @desc The height of the Actor selections in the list of Actors in the menu. 
 * @default 35
 *
 * @param Item Width
 * @desc The width of the Actor selections in the list of Actors in the menu. 
 * @default 500
 *
 * @param Command Columns
 * @desc The max amount of columns in the command selector within the menu. 
 * @default 4
 *
 * @param Command Rows
 * @desc The amount of visible rows in the command selector within the menu. 
 * @default 2
 *
 * @help
 *
 *
 * Alternative Menu Screen: Up
 * Version 1.00
 * SumRndmDde
 *
 *
 * Gives your game an alternative menu screen.
 * 
 * This one shows a list of Actor names, HP, and MP 
 * and gives more room for larger parties.
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 */

(function() {
	var sumListColumns = Number(PluginManager.parameters('SRD_AltMenuScreen_List')['List Columns']);
	var sumListRows = Number(PluginManager.parameters('SRD_AltMenuScreen_List')['Max Rows']);
	var sumItemHeight = Number(PluginManager.parameters('SRD_AltMenuScreen_List')['Item Height']);
	var sumItemWidth = Number(PluginManager.parameters('SRD_AltMenuScreen_List')['Item Width']);
	var sumColumns = Number(PluginManager.parameters('SRD_AltMenuScreen_List')['Command Columns']);
	var sumRows = Number(PluginManager.parameters('SRD_AltMenuScreen_List')['Command Rows']);

	var _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
	    _Scene_Menu_create.call(this);
		this._goldWindow.x = 0;
		this._goldWindow.y = 0;
		this._commandWindow.x = 0;
		this._commandWindow.y = Graphics.height - this._commandWindow.height;
		this._statusWindow.x = (Graphics.width / 2) - (this._statusWindow.width / 2);
		this._statusWindow.y = Graphics.height - this._commandWindow.height - this._statusWindow.height;
	};
	Window_Gold.prototype.windowWidth = function() {
	    return Graphics.width;
	};
	Window_MenuCommand.prototype.windowWidth = function() {
	    return Graphics.width;
	};
	Window_MenuCommand.prototype.maxCols = function() {
	    return sumColumns;
	};
	Window_MenuCommand.prototype.numVisibleRows = function() {
	    return sumRows;
	};
	Window_MenuStatus.prototype.windowWidth = function() {
	    return this.itemWidth() + (this.standardPadding() * 2);
	};
	Window_MenuStatus.prototype.windowHeight = function() {
	    return (this.itemHeight() * this.numVisibleRows()) + (this.standardPadding() * 2);
	};
	Window_MenuStatus.prototype.numVisibleRows = function() {
	    return Math.min(this.maxItems(), sumListRows);
	};
	Window_MenuStatus.prototype.maxCols = function() {
	    return sumListColumns;
	};
	Window_MenuStatus.prototype.itemHeight = function() {
	    return sumItemHeight;
	};
	Window_MenuStatus.prototype.itemWidth = function() {
	    return sumItemWidth;
	};
	Window_MenuStatus.prototype.drawItem = function(index) {
	    this.drawItemBackground(index);
	    this.drawItemStatus(index);
	};
	Window_MenuStatus.prototype.drawItemStatus = function(index) {
	    var actor = $gameParty.members()[index];
	    var rect = this.itemRect(index);
	    var width = (rect.width / 3) - 20;
	    this.drawActorName(actor, rect.x + 10, rect.y, width);
	    this.drawActorHp(actor, rect.x + width + 30, rect.y, width);
    	this.drawActorMp(actor, rect.x + width * 2 + 50, rect.y, width);
	};
})();