//=============================================================================
// LTN_WindowPop.js
//=============================================================================
/*
 Version 1.0
 Version 1.01 - Fixed & improved descriptions, & improved code.
 Version 1.02 - Added the option to change the gain/lose String.
              - Added Notetag colors for items in the database.
              - Fixed gain gold bug when auto pop off.
              - More code improvments
 Version 1.03 - Added Map Display Name features
              - Fixed center alignment for text
 Version 1.04  - Minor bug fix for plugin command icon display, not showing
                 correctly.
                 Fixed a bug when a blank Window pop showing when Maps name
                 not available.
                 Fixed an alignment bug for the custom pop plugin command.

*/
/*:
* @plugindesc A window to show short custom messages during gameplay V.1.04
*
* @author LTN Games
* @param -- AutoPop Settings --
* @param Auto Item Pop
* @desc Turn this on to allow the window to popup for each gained/lost item/gold.
* @default On
*
* @param Map Display Name
* @desc Turn this on to allow the Window Pop to take control of the Map Display Name
* @default On
*
* @param Auto Pop Alignment
* @desc The alignment of the item name & icon. Left, or Center.
* @default Left
*
* @param Gain String
* @desc The string when gaining an item. Message Code(s) allowed
* @default \C[3]Found \C[0]x
*
* @param Lose String
* @desc The string when losing an item. Message Code(s) allowed
* @default \C[2]Lost \C[0]x
*
* @param Gold Icon
* @desc The icon to display everytime you gain gold.
* @default 208
*
* @param Window Pop SE
* @desc The sound efefct you would like to play on popup.
* @default Jump1
*
* @param SE Pitch
* @desc Pitch of the SE on popup.
* @default 100
*
* @param SE Volume
* @desc Volume of the SE on popup.
* @default 100
*
* @param -- Window Settings --
* @param Window X Position
* @desc X Position on screen for the window pop.
* @default 0
*
* @param Window Y Position
* @desc Y Position on screen for the window pop.
* @default 0
*
* @param Window Width
* @desc The width of the window pop.
* @default 360
*
* @param Background Type
* @desc Choose the type of BG you want.'Image' or 'Gradient' without quotes.
* @default Gradient
*
* @param WindowBG Gradient 1
* @desc Change the color of the 1st gradient. RGBA
* @default rgba(0, 0, 0, 0.6)
*
* @param WindowBG Gradient 2
* @desc Change the color of the 2nd gradient. RGBA
* @default rgba(0, 0, 0, 0)
*
* @param  BG Image Filename
* @desc The filename of the bg image you want.Place in the folder System/
* @default wpop_bg
*
* @param  BG X Offset
* @desc The filename of the bg image you want.Place in the folder System/
* @default 0
*
* @param  BG Y Offset
* @desc The filename of the bg image you want.Place in the folder System/
* @default 0
* @help
*
**==============================================================================
*                                TERMS OF USE
*==============================================================================
Credit goes to: LTN Games
*
* Exclusive to rpgmakermv.co, please don't share anywhere else unless given strict
* permission by the author of the plugin.
*
* The plugin and all graphics included may be used in commerical and
* non-commerical products. Credit must be given!
*
* Please report all bugs to http://www.rpgmakermv.co/threads/window-pop.1432/
*
*==============================================================================
*                               INSTRUCTIONS
*==============================================================================
* Change the setting in the plugin manager to adjust how the Window Pop appears
* on map.
*
* If Auto pop is enabled in the plugin manager, a window will pop up For* each
* item or gold gained or lost.
*==============================================================================
*               USING PLUGIN COMMANDS, SCRIPT CALLS, & Notetags
*==============================================================================
*----------===========----------------------
* MAP DISPLAY NAME CUSTOMIZATIONS
----------===========----------------------
* If enabled in the plugin manager, window pop will take control of the
* Map Display Name, so you can add message codes to make the name pop out!
*
* You can now use message codes for your maps display name!
* All you have to do is go into the maps setting from the editor
* and add your own message code to the Map Display Name text field.
* You can use the icon message code if you want to include icons.
*
*----------===========----------------------
* THE ITEM NOTETAG:
*----------===========----------------------
* You can now use a notetag in the items section of the database to chnage the
* colors of the items, when they auto pop up. This can be good for Item Rarity.
* Notetag to use: <WPOP_Color: x> (x = the # of the color code you want to use)
*
*-------------------------------------------
* EXAMPLE NOTETAGS
*---------------------------------------------
* <WPOP_Color: 1>  // Changes to white
* <WPOP_Color: 2>  // Changed to color 2 in the color pallete of window.png
*
*  To set a custom window pop, you can use either a plugin command or Script
*  call.
*----------===========----------------------
* THE PLUGIN COMMAND:
*----------===========----------------------
*  Plugin Command: WPOP Duration Align Icon String
*
* In the Icon slot put the icon index # - No icon = 0
*
* In the Duration slot put a number to set how long before window fades out.
*
* In the Align slot, put left, right or center, to align your string in the window.
*
* In the string slot put the string you want to pop up.
*
*-------------------------------------------
* EXAMPLE COMMANDS
*---------------------------------------------
* Message codes work with window pop, I would recommend only sticking with The
* codes that change color, show variables, actor name, etc. Some codes like text size,
* and draw icon, may break the alignment of the message.
*
* Example: WPOP 120 Left 5 Welome To Oakville
*          WPOP 120 Center 5 \C[3] Quest Log Updated
*          WPOP 120 Center 2 \C[2] \N[1] \C[3]Is Poisoned!
*
*----------===========----------------------
* THE SCRIPT CALL:
----------===========----------------------
*  this.setWindowPop(Icon, 'String', Duration, 'Align')
*
*  Icon = The icon index number of the icon you want to display.
*  String = The string you want displayed in the pop up window. Remember quotes''
*  Duration = How long should the window stay before dissappearing.Recommended 150
*  Align = A string 'left', 'right', or 'center' that aligns the string in the window.
*
* EG: this.setWindowPop(5, 'Quest Log Updated', 150, 'left')
*
* This will activate the window to show Icon 5, with the string Quest Log Updated!
* for 150 as the duration.
*
*----------===========----------------------
* NOTES TO REMEBER:
----------===========----------------------
* In all events be sure to add a wait command between each gain item, gold, etc
* to add space in between the pop ups when gaining items. This ensures there is
* enough space between each popup for it to have smooth transitions.
*/
// =============================================================================
// Parameters
// =============================================================================

var LTN = LTN || {};
LTN.WindowPopper = LTN.WindowPopper || {};

(function(){
  LTN.Param = LTN.Param || {};
  LTN.Parameters = PluginManager.parameters('LTN_WindowPop');
  LTN.Param.autoPop       = String(LTN.Parameters['Auto Item Pop']).toLowerCase();
  LTN._mapDisplayName     = String(LTN.Parameters['Map Display Name']).toLowerCase();
  LTN.Param.gainString    = String(LTN.Parameters['Gain String']);
  LTN.Param.loseString    = String(LTN.Parameters['Lose String']);
  LTN.Param.popGoldIcon   = Number(LTN.Parameters['Gold Icon']);
  LTN.Param.autoPopAlign  = String(LTN.Parameters['Auto Pop Alignment']).toLowerCase();
  LTN.Param.popSe         = String(LTN.Parameters['Window Pop SE']);
  LTN.Param.popPitch      = Number(LTN.Parameters['SE Pitch']);
  LTN.Param.popVol        = Number(LTN.Parameters['SE Volume']);
  LTN.Param.windowX       = Number(LTN.Parameters['Window X Position']);
  LTN.Param.windowY       = Number(LTN.Parameters['Window Y Position']);
  LTN.Param.windowWidth   = Number(LTN.Parameters['Window Width']);
  LTN.Param.bgType        = String(LTN.Parameters['Background Type']).toLowerCase();
  LTN.Param.bgImage       = String(LTN.Parameters['BG Image Filename']);
  LTN.Param.bgOffsetX     = Number(LTN.Parameters['BG X Offset']);
  LTN.Param.bgOffsetY     = Number(LTN.Parameters['BG Y Offset']);
  LTN.Param.windowGradA   = String(LTN.Parameters['WindowBG Gradient 1']);
  LTN.Param.windowGradB   = String(LTN.Parameters['WindowBG Gradient 2']);
  // =============================================================================
  // Create Defualt Global Variables For Window Pop
  // =============================================================================
  var WPOP = WPOP || {};
  // Initialize Custom Pop Up Variables
  WPOP._popIcon      = 0;
  WPOP._popString    = '';
  WPOP._popTimer     = 0;
  WPOP._popAlign     ='Left';
  // Initialize Auto Pop Up Variables
  WPOP._itemId       = 0;
  WPOP._autoIconID   = 0;
  WPOP._autoItem     = '';
  WPOP._autoAmount   = 0;
  WPOP._autoSE       = '';
  // Initialize Auto Gold Pop Up Variables
  WPOP._autoGAmount  = 0;
  // A flag variable  to know which window is poppping up
  WPOP._currentType   = '';
  WPOP._itemType      = '';


  // =============================================================================
  // Game Party: Assign Auto Pop Variables
  // =============================================================================
  //--------------------------------------
  // Alias Nethod: Gain Gold
  //------------------------------------------------------------------------------
  LTN.WindowPop_gameParty_GainGold = Game_Party.prototype.gainGold;
  //------------------------------------------------------------------------------
  Game_Party.prototype.gainGold = function(amount) {
    if (LTN.Param.autoPop === 'on') {
      WPOP._currentType   = 'Gold';
      WPOP._autoGAmount = amount ? amount : '';
      WPOP._popTimer    = 85;
      WPOP._autoSE      = 'ON';
    }
    LTN.WindowPop_gameParty_GainGold.call(this, amount);
  };
  //--------------------------------------
  // Alias Nethod: gainItem
  //------------------------------------------------------------------------------
  LTN.WindowPop_oldGP_gainItem = Game_Party.prototype.gainItem;
  //------------------------------------------------------------------------------
  Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if (LTN.Param.autoPop === 'on') {
      var container =  this.itemContainer(item);
      if(container){
        WPOP._currentType  = 'Item';
        WPOP._popTimer   = 85;
        WPOP._autoIconID = item ? item.iconIndex : 0;
        WPOP._autoItem   = item ? item.name : '';
        WPOP._autoAmount = amount ? amount : '';
        WPOP._itemId     = item ? item.id : 0;
        WPOP._itemType   = item? item : '';
        WPOP._autoSE     = 'ON';
      }
    }
    $gameMap.requestRefresh();
    LTN.WindowPop_oldGP_gainItem.call(this, item, amount, includeEquip); //Call Original Method
  };

  //===========================================================================
  // Scene Map: Implement Window Pop Into Scene_Map
  //===========================================================================
  //----------------------------------------------
  // Aliased Nethod:  Create Window Pop in Scene_Map
  //------------------------------------------------------------------------------
  LTN.WindowPop_oldMapCreateDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  //------------------------------------------------------------------------------
  Scene_Map.prototype.createDisplayObjects = function() {
    LTN.WindowPop_oldMapCreateDisplayObjects.call(this);
    this.createWindowPop();
  };

  //----------------------------------------------
  // New Method: Create Window Pop & add as child.
  //----------------------------------------------
  Scene_Map.prototype.createWindowPop = function() {
    this._WindowPop = new Window_Pop();
    this.addChild(this._WindowPop);
  };
  //------------------------------------------------------------------------------
  // Alised Method:  If using the Map Display name feature, overwrite to use WindowPop
  //------------------------------------------------------------------------------
  LTN.WindowPop_oldSceneMap_Start   = Scene_Map.prototype.start;
  //------------------------------------------------------------------------------
  Scene_Map.prototype.start = function() {
    if(LTN._mapDisplayName === 'on'){
      var mapName = $gameMap.displayName();
      Scene_Base.prototype.start.call(this);
      SceneManager.clearStack();
      if (this._transfer) {
        this.fadeInForTransfer();
        if(mapName) {
        WPOP._popTimer = 120;
        WPOP._currentType  = 'Map';
      }
        $gameMap.autoplay();
      } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
      }
      this.menuCalling = false;
    } else {
      LTN.WindowPop_oldSceneMap_Start.call(this);
    }
  };
  //=============================================================================
  // New Window: Window Pop
  //=============================================================================
  function Window_Pop() {
    this.initialize.apply(this, arguments);
  }

  Window_Pop.prototype = Object.create(Window_Base.prototype);
  Window_Pop.prototype.constructor = Window_Pop;
  //-------=====---------
  //Initialize
  //-------=====---------
  Window_Pop.prototype.initialize = function(x, y) {
    var width          = LTN.Param.windowWidth;
    var height         = this.fittingHeight(5);
    var px             = LTN.Param.windowX;
    var py             = LTN.Param.windowY;
    Window_Base.prototype.initialize.call(this, px, py, width, height);
    this.opacity       = 0;
    this.clearWindowPop();
    this.refresh();
  };

  //-------=====---------
  //Update - Update Opacity + Contents If Timer is Active.
  //-------=====---------
  Window_Pop.prototype.update = function() {
    this.wpopUpdate();
    this.mapDisplayUpdate();

  };
  //-------=====---------
  //Update function for auto pop & custom pop
  //-------=====---------
  Window_Pop.prototype.wpopUpdate = function() {
    if (WPOP._popTimer > 0) {
      this.playSeOnPop();
      this.show();
      this.fadeInOpacity();
      this.refresh();
      WPOP._popTimer--;
    } else {
      this.fadeOutOpacity();
    }
  };
  //-------=====---------
  //Update function for map display name
  //-------=====---------
  Window_Pop.prototype.mapDisplayUpdate = function() {
    if (WPOP._popTimer > 0 && $gameMap.isNameDisplayEnabled()) {
      this.playSeOnPop();
      this.show();
      this.fadeInOpacity();
      this.refresh();
      WPOP._popTimer--;
    } else {
      this.fadeOutOpacity();
    }
  };
  //-------=====---------
  //Refresh
  //-------=====---------
  Window_Pop.prototype.refresh = function() {
    this.contents.clear();
    this.backgroundManager(LTN.Param.bgType);
    this.contentManager(WPOP._currentType);
  };
  Window_Pop.prototype.backgroundManager = function(type){
    var bgWidth = LTN.Param.windowWidth;
    //Check which BG to use.
    switch (type) {
      // Image choice
      case 'image':
      this.drawBackgroundImage();
      break;
      // Gradient Choice
      case 'gradient':
      this.drawBackgroundGradient(0, 0, bgWidth, this.lineHeight(2));
      break;
      // Defualt Choice
      default:
      this.drawBackgroundGradient(0, 0, bgWidth, this.lineHeight(2));
      break;
    }
  };

  //Draw Content according to type
  Window_Pop.prototype.contentManager = function(type) {
    var align    = LTN.Param.autoPopAlign;
    var goldIcon = LTN.Param.popGoldIcon;
    switch (type) {
      case 'Item':
      this.drawItemContents(WPOP._autoIconID, WPOP._autoItem, WPOP._autoAmount, align);
      break;
      case 'Gold':
      this.drawGoldContents(goldIcon, WPOP._autoGAmount, align);
      break;
      case 'Custom':
      this.drawCustomContents(WPOP._popIcon, WPOP._popString, WPOP._popAlign);
      break;
      case 'Map':
      this.drawMapDisplay(align);
      break;
    }
  };
  //-------=====---------
  // Draw contents for Auto Item Pop
  //-------=====---------
  Window_Pop.prototype.drawMapDisplay = function(align) {
    var mapName = $gameMap.displayName();
    var x = this.alignPopText(mapName, LTN.Param.windowWidth, align);
    if ($gameMap.displayName()) {
      this.drawTextEx(mapName, x, 0);
    }
  };
  //-------=====---------
  // Draw contents for Auto Item Pop
  //-------=====---------
  Window_Pop.prototype.drawItemContents = function(icon, item, amount, align) {
    var gainString = LTN.Param.gainString;
    var loseString = LTN.Param.loseString;
    var increment = this.checkIncrement(amount, gainString , loseString);
    var newAmount = this.cleanString(String(amount));
    var coloredItem = this.addColorCodeTo(item);
    var itemString  = increment + newAmount + ' ' + coloredItem;
    var tx = this.alignPopText(itemString, LTN.Param.windowWidth, align);
    var ix = tx - 32;

    this.drawIcon(icon, ix, 2);
    this.drawTextEx(itemString, tx, 0);
  };

  //-------=====---------
  // Draw contents for Auto Gold Pop
  //-------=====---------
  Window_Pop.prototype.drawGoldContents = function(icon, amount, align) {
    var gainString = LTN.Param.gainString;
    var loseString = LTN.Param.loseString;
    var increment  = this.checkIncrement(amount, gainString, loseString);
    var newAmount = this.cleanString(String(amount));
    var goldString = increment +  newAmount + ' ' + TextManager.currencyUnit;
    var tx = this.alignPopText(goldString, LTN.Param.windowWidth, align);
    var ix = tx - 32;

    this.drawIcon(icon, ix, 2);
    this.drawTextEx(goldString , tx, 0);
    // }
  };
  //-------=====---------
  // Draw contents For Custom Call
  //-------=====---------
  Window_Pop.prototype.drawCustomContents = function(icon, string, align) {
    var tx = this.alignPopText(string, LTN.Param.windowWidth, align);
    var ix = tx - 32;
    this.drawTextEx(string, tx, 0);
    this.drawIcon(icon, ix, 2);
  };
  //-------=====---------
  // Draw Background
  //-------=====---------
  Window_Pop.prototype.drawBackgroundGradient = function(x, y, width, height) {
    var color1 = LTN.Param.windowGradA;
    var color2 = LTN.Param.windowGradB;
    this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
  };
  //-------=====---------
  // Draw Background Image
  //-------=====---------
  Window_Pop.prototype.drawBackgroundImage = function() {
    this._backSprite = ImageManager.loadSystem(LTN.Param.bgImage);
    this._backSprite1 = new Sprite(this._backSprite);
    this._backSprite1.x       = LTN.Param.bgOffsetX;
    this._backSprite1.y       = LTN.Param.bgOffsetY;
    this.addChildToBack(this._backSprite1);
    //
  };
  //-------=====---------
  //New Method: Window Pop Transparent
  //-------=====---------
  Window_Pop.prototype.hide = function() {
    this.visible = false;
  };
  //-------=====---------
  //New Method: Window Pop Visible
  //-------=====---------
  Window_Pop.prototype.show = function() {
    this.visible = true;
  };
  //-------=====---------
  // New Method: Update WindowPop Opacity
  //-------=====---------
  Window_Pop.prototype.fadeInOpacity = function() {
    this.contentsOpacity += 16;
  };
  //-------=====---------
  // New Method: Update WindowPop Opacity
  //-------=====---------
  Window_Pop.prototype.fadeOutOpacity = function() {
    if (this.contentsOpacity > 0) {
      this.contentsOpacity -= 16;
    } else {
      this.clearWindowPop();
    }
  };
  //-------=====---------
  // New Method: Clear Window Pop
  //-------=====---------
  Window_Pop.prototype.clearWindowPop = function() {
    WPOP._popIcon        = 0;
    WPOP._popString      = '';
    WPOP._popTimer       = 0;
    WPOP._autoIconID     = 0;
    WPOP._autoItem       = '';
    WPOP._autoAmount     = 0;
    WPOP._autoGAmount    = 0;
    WPOP._currentType      = '';
    this.contentsOpacity = 0;
    this.hide();
  };
  //-------=====---------
  // New Method: Play Pop Up Sound Effect
  //-------=====---------
  Window_Pop.prototype.playSeOnPop = function() {
    if (WPOP._autoSE === 'ON') {
      this.popSe();
      WPOP._autoSE = 'OFF';
    }
  };
  //-------=====---------
  // New Method: To Align Auto Pop string for drawTextEx methods x value.
  //-------=====---------
  Window_Pop.prototype.alignPopText = function(string, maxWidth, align) {
    var stringWidth = this.textWidth(string) - this.adjustStringWidth(string);
    var finalX = 0;
    switch (align) {
      case 'center':
        finalX = (maxWidth - stringWidth) / 2 -10;
      break;
      case 'left':
      finalX = 32;
      break;
      case 'right':
      finalX =  maxWidth - stringWidth;
      break;
    }
    if(finalX < 32) finalX = 32;
    return finalX;
  };
  //-------=====---------
  // New Method: To adjust the alignment when message codes are present in string
  //-------=====---------
  Window_Pop.prototype.adjustStringWidth = function(string) {
    var widthToRemove = 0;
    var toDelete = string.match(/(\\\C|\N|\V|\G)\[\d\]/g);
    if(!toDelete) return 0;
    for (var i = 0 ; i < toDelete.length ; i++) {
      widthToRemove += toDelete[+i];
    }
    var removedWidth = this.textWidth(widthToRemove);
    return removedWidth;
  };
  //-------=====---------
  // New Method: Clean the string, to remove the minus (-) symbol from item.amount
  //-------=====---------
  Window_Pop.prototype.cleanString = function(string) {
    var oldString = string;
    if(!oldString) return;
    var cleanString = oldString.replace(/(^-)/g,'');
    return cleanString;
  };
  //-------=====---------
  // Check the amount of of item being gained or lost, & change string accordingly
  //-------=====---------
  Window_Pop.prototype.checkIncrement = function(amount, gainString, loseString) {
    var increment = '';
    if(amount > 0){
      increment  = gainString;
    } else if(amount < 0) {
      increment  = loseString;
    }
    return increment;
  };
  //-------=====---------
  // Sort items, and set the item type.
  //-------=====---------
  Window_Pop.prototype.sortItemType = function(item) {
    var itemType = '';
    if (DataManager.isItem(item)) {
      itemType = 'item';
    } else if (DataManager.isWeapon(item)) {
      itemType = 'weapon';
    } else if (DataManager.isArmor(item)) {
      itemType = 'armor';
    } else {
      itemType = '';
    }
    return itemType;
  };
  //-------=====---------
  // Set a notetag according to type of item
  //-------=====---------
  Window_Pop.prototype.getTagByItemType = function(itemType) {
    var notetag = '';
    itemType = this.sortItemType(WPOP._itemType);
    switch (itemType) {
      case 'armor':
      notetag = $dataArmors[WPOP._itemId].meta.WPOP_Color;
      break;
      case 'item':
      notetag = $dataItems[WPOP._itemId].meta.WPOP_Color;
      break;
      case 'weapon':
      notetag = $dataWeapons[WPOP._itemId].meta.WPOP_Color;
      break;
    }
    return notetag;
  };
  //-------=====---------
  // Add the color code from notetag to string
  //-------=====---------
  Window_Pop.prototype.addColorCodeTo = function(string) {
    var colorCode = this.getTagByItemType();
    var newString = '';
    if(colorCode){
      colorCodeString = '\\C[' + colorCode + ']';
      newString = colorCodeString.replace(/\s/g, '') + string;
      return newString;
    } else {
      return string;
    }
  };
  //-------=====---------
  // New Method: popSe, Setup sound effect object
  //-------=====---------
  Window_Pop.prototype.popSe = function() {
    var popSe    = {};
    popSe.name   = LTN.Param.popSe;
    popSe.pitch  = LTN.Param.popPitch;
    popSe.volume = LTN.Param.popVol;
    popSe.pan    = 0;
    AudioManager.playSe(popSe);
  };
  // =============================================================================
  // New Method: Game_Interpreter.. Create Window Pop Script Call
  // =============================================================================
  Game_Interpreter.prototype.setWindowPop = function(icon, string, timer, align) {
    WPOP._popIcon       = icon ? icon : 0;
    WPOP._popString     = string ? string : '';
    WPOP._popTimer      = timer ? timer : 120;
    WPOP._popAlign      = align ? align : 'left';
    WPOP._currentType     = 'Custom';
    WPOP._autoSE        = 'ON';
  };
  // =============================================================================
  // Old Method: Game_Interpreter.. Create Plugin Command
  // =============================================================================
  LTN.WPOP_oldGPpluginCommand = Game_Interpreter.prototype.pluginCommand;
  //-------=====---------
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    LTN.WPOP_oldGPpluginCommand.call(this, command, args);
    var pluginString = '';
    if (command === 'WPOP') {
      var j = args.length;
      for (var i = 3; i < j; i++) {
        if (i < j){
          pluginString  += args[i] ? args[i] : '';
          pluginString  += " ";
        }
      }
      WPOP._currentType  = 'Custom';
      WPOP._popTimer    = args[0] ? Number(args[0]) : 0;
      WPOP._popAlign    = args[1] ? String(args[1]).toLowerCase() : 'left';
      WPOP._popIcon     = args[2] ? Number(args[2]) : 0;
      WPOP._popString = pluginString;
      WPOP._autoSE     = 'ON';
    }
  };
})();
// =============================================================================
// THE END, Based On A True Story!
// =============================================================================
