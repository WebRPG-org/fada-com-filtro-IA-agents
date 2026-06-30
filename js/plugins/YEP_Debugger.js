//=============================================================================
// Yanfly Engine Plugins - Debugger
// YEP_Debugger.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Debugger = true;

var Yanfly = Yanfly || {};
Yanfly.Debug = Yanfly.Debug || {};

//=============================================================================
 /*:
 * @plugindesc v1.12 This is Yanfly's debugger plugin tool given to
 * faithful supporters to help you testplay your game better!
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Auto New Game
 * @desc Automatically start a new game upon test play.
 * ON - true     OFF - false
 * @default false
 *
 * @param ---Field Debug---
 * @default
 *
 * @param Field Debug
 * @desc Enable field debug menu when clicking on events?
 * NO - false     YES - true
 * @default true
 *
 * @param Debug Menu Icon
 * @desc The icon used for the debug menu that will appear in the
 * upper right corner for the map. Use 0 to disable this.
 * @default 225
 *
 * @param ---Battle Debug---
 * @default
 *
 * @param Battle Debug
 * @desc Do you want to see debug options in battle?
 * NO - false     YES - true
 * @default true
 *
 * @param Full TP
 * @desc Do you want to start with full TP with battle tests?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Chances are, if you have this plugin, you are most likely contributing to
 * Yanfly's Patreon and supporting Yanfly! Much thanks and appreciations for
 * supporting!
 *
 * This plugin is made to help you test your game more efficiently by providing
 * extra debugging tools that don't normally come with RPG Maker MV. Note that
 * all of these features added by this plugin are disabled when the game is not
 * being played in Play Test or Battle Test mode.
 *
 * Features will be added regularly to this plugin so you can continue to test
 * and debug your game with the most updated tools available!
 *
 * ============================================================================
 * Starting Debug Locations
 * ============================================================================
 *
 * A large portion of games have their own debug rooms. However, it's a bit of
 * a tedious work each time to set the starting location of the player to the
 * debug room each time and return it back. This plugin adds a new solution to
 * reduce that tedious work.
 *
 * What this plugin does is add to your title screen's command window extra
 * options that appear only in debug menu. These options are linked to where
 * you have placed your vehicles in the editor and will allow you to start a
 * new game in that vehicle's default location. If a vehicle does not have a
 * starting location, the option will not appear in the window to select.
 *
 * The purpose of this feature is to allow you to teleport to your debug room
 * quickly without the need to constantly switch the player's start location.
 * As vehicles see very little use (and when they do, their start location in
 * the game is usually changed by an event), having a vehicle as a secondary
 * anchor point makes for a nice shortcut to your debug room.
 *
 * ============================================================================
 * Battle Commands
 * ============================================================================
 *
 * The Party command window (that window with 'Fight' and 'Escape') now has
 * three new commands added to it: Debug Win, Debug Lose, Debug Menu.
 *
 * Debug Win allows you to instantly win the battle. Quickly being able to
 * bypass battles while testing is important to testing as you do not have to
 * spend as much time with battles.
 *
 * Debug Lose allows you to instantly lose the battle by having the player's
 * party reach 0 HP for everyone. Sometimes you want to test a battle where the
 * player is destined to lose. Make use of this command to save you time.
 *
 * Debug Menu allows you to access the debug menu in the middle of battle. Fret
 * not for when you return, the battle will be exactly as it was before.
 *
 * ============================================================================
 * Field Map Debug Tools
 * ============================================================================
 *
 * Here's a list of debug tools you can use on the field map.
 *
 * - Walk Through Walls: Inherent in the game but holding the 'Control' button
 * as you walk allows you to pass through everything and anything. It will also
 * prevent battle encounters.
 *
 * - Click Teleport: You can hold down the 'Control' button and click an area
 * on the map to instantly teleport there. This does not trigger any on touch
 * events. All it does is just instantly teleport the player there.
 *
 * ============================================================================
 * Special Thanks
 * ============================================================================
 *
 * I just wanted to say, thank you, to soome very special people:
 *
 * Archeia - Thank you for letting me into beta for RPG Maker MV. Always
 * keeping me updated and figuring things out together to make this the best
 * RPG Maker yet. Let's walk together towards success.
 *
 * FlyingDream - Thank you for all you've done to me. You have a very special
 * place in my heart and I'll never be able to get as far as I did without you
 * supporting me from behind like always. When it comes to support, you're
 * second to none. We had a lot of wonderful moments together that I'll never
 * ever forget for the rest of my life. Thank you.
 *
 * Rukaroa - Thank you for always staying a wonderful friend and giving me so
 * many ideas to work with. It's always a blast to work together with you.
 *
 * And to all my supporters - I'm happy you're all faithful users of mine and
 * had it not been for you believing in my work these past years, I probably
 * wouldn't even be here right now.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.12: 2016.01.11
 * Version 1.11: 2016.01.04
 * Version 1.10: 2015.12.28
 * Version 1.09: 2015.12.21
 * Version 1.08: 2015.12.14
 * Version 1.07: 2015.12.07
 * Version 1.06: 2015.11.30
 * Version 1.05: 2015.11.23
 * Version 1.04: 2015.11.16
 * Version 1.03: 2015.11.09
 * Version 1.02: 2015.11.02
 * Version 1.01: 2015.10.26
 * Version 1.00: Finished plugin!
 */
//=============================================================================

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Debugger');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DebugAutoNewGame = String(Yanfly.Parameters['Auto New Game']);

Yanfly.Param.DebugBattleDebug = eval(String(Yanfly.Parameters['Battle Debug']));
Yanfly.Param.DebugMapIcon = Number(Yanfly.Parameters['Debug Menu Icon']);

Yanfly.Param.DebugFullTP = eval(String(Yanfly.Parameters['Full TP']));
Yanfly.Param.DebugFieldDebug = eval(String(Yanfly.Parameters['Field Debug']));

//=============================================================================
// Quick Settings
//=============================================================================

Yanfly.Debug.Command      = 'Debug';
Yanfly.Debug.StartBoat    = 'Debug:Boat';
Yanfly.Debug.StartShip    = 'Debug:Ship';
Yanfly.Debug.StartAirship = 'Debug:Airship';
Yanfly.Debug.BattleWin    = 'Debug Win';
Yanfly.Debug.BattleLose   = 'Debug Lose';

Yanfly.Debug.CmdQuick    = 'Quick';
Yanfly.Debug.CmdSwitch   = 'Switches';
Yanfly.Debug.CmdVariable = 'Variables';
Yanfly.Debug.CmdTeleport = 'Teleport';
Yanfly.Debug.CmdBattle   = 'Battle';
Yanfly.Debug.CmdEvent    = 'Common Event';
Yanfly.Debug.CmdEnemies  = 'Enemies';

Yanfly.Debug.HelpQuick    = "A quick list of debugging shortcuts.";
Yanfly.Debug.HelpSwitch   = "Let's you toggle switches ON/OFF.";
Yanfly.Debug.HelpVariable = "Let's you adjust the values of variables.";
Yanfly.Debug.HelpTeleport = "Allows you to quickly teleport to other maps.";
Yanfly.Debug.HelpTeleport += '\nThis will take you to point 0, 0 of the map.';
Yanfly.Debug.HelpBattle   = "Starts a battle with the selected enemy troop.";
Yanfly.Debug.HelpEvent    = "Launches a Common Event.";
Yanfly.Debug.HelpEnemies  = "Modify enemy stats mid-battle.";

Yanfly.Debug.QuickGoldMax    = 'Gold = Max';
Yanfly.Debug.QuickGold0      = 'Gold = 0';
Yanfly.Debug.QuickLvUpx1     = 'Level Up x1';
Yanfly.Debug.QuickLvUpx10    = 'Level Up x10';
Yanfly.Debug.QuickLvUpxMax   = 'Level Up xMax';
Yanfly.Debug.QuickLvDnx1     = 'Level Down x1';
Yanfly.Debug.QuickLvDnx10    = 'Level Down x10';
Yanfly.Debug.QuickLvDnto1    = 'Level Down to 1';
Yanfly.Debug.QuickItemsx1    = 'Gain All Items x1';
Yanfly.Debug.QuickItemsx10   = 'Gain All Items x10';
Yanfly.Debug.QuickItemsMax   = 'Gain All Items xMax';
Yanfly.Debug.QuickWeaponsx1  = 'Gain All Weapons x1';
Yanfly.Debug.QuickWeaponsx10 = 'Gain All Weapons x10';
Yanfly.Debug.QuickWeaponsMax = 'Gain All Weapons xMax';
Yanfly.Debug.QuickArmorsx1   = 'Gain All Armors x1';
Yanfly.Debug.QuickArmorsx10  = 'Gain All Armors x10';
Yanfly.Debug.QuickArmorsMax  = 'Gain All Armors xMax';
Yanfly.Debug.QuickJp         = 'JP ';
Yanfly.Debug.QuickUnlockClasses = 'Unlock All Classes';

Yanfly.Debug.Attention  = '! ATTENTION !';
Yanfly.Debug.Unnamed    = '<Unnamed>';
Yanfly.Debug.InputValue = 'Set a value for variable %1, %2:';

//=============================================================================
// Scene_Boot
//=============================================================================

if (eval(Yanfly.Param.DebugAutoNewGame)) {
  Scene_Boot.prototype.start = function() {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
      } else {
        this.newGame();
      }
      this.updateDocumentTitle();
  };

  Scene_Boot.prototype.newGame = function() {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
  };
};

//=============================================================================
// DataManager
//=============================================================================

DataManager.debugStart = function(vehicle) {
    DataManager._debugStart = true;
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(vehicle.startMapId,
        vehicle.startX, vehicle.startY);
    Graphics.frameCount = 0;
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Debug.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    if (!$gameTemp._debugBattle) {
      Yanfly.Debug.BattleManager_startBattle.call(this);
    }
    $gameTemp._debugBattle = false;
    this._bypassMoveToStartLocation = false;
};

Yanfly.Debug.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    var restartBgm = true;
    if (Yanfly.Debug.SavedBattleBgm) {
      AudioManager.playBgm(Yanfly.Debug.SavedBattleBgm);
      Yanfly.Debug.SavedBattleBgm = undefined;
      restartBgm = false;
    }
    if (Yanfly.Debug.SavedBattleBgs) {
      AudioManager.playBgs(Yanfly.Debug.SavedBattleBgs);
      Yanfly.Debug.SavedBattleBgs = undefined;
      restartBgm = false;
    }
    if (restartBgm) Yanfly.Debug.BattleManager_playBattleBgm.call(this);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.getEventAtPos = function(x, y) {
    for (var i = 0; i < this.events().length; ++i) {
      var ev = this.events()[i];
      if (!ev) continue;
      if (ev.x === x && ev.y === y) return ev;
    }
    return null;
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.Debug.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.Debug.Game_Battler_onBattleStart.call(this);
    if (!BattleManager.isBattleTest()) return;
    if (!Yanfly.Param.DebugFullTP) return;
    if (this.isEnemy()) return;
    this.gainTp(this.maxTp());
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.Debug.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    if ($gameTemp._debugBattle) return;
    Yanfly.Debug.Game_Unit_onBattleStart.call(this);
};

Yanfly.Debug.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function() {
    if ($gameTemp._debugBattle) return;
    Yanfly.Debug.Game_Unit_onBattleEnd.call(this);
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.Debug.Game_Vehicle_loadSystemSettings =
    Game_Vehicle.prototype.loadSystemSettings;
Game_Vehicle.prototype.loadSystemSettings = function() {
    if (DataManager._debugStart) {
      var vehicle = this.vehicle();
      this._mapId = 0;
      this.setPosition(0, 0);
      this.setImage(vehicle.characterName, vehicle.characterIndex);
    } else {
      Yanfly.Debug.Game_Vehicle_loadSystemSettings.call(this);
    }
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.Debug.Sprite_Actor_moveToStartPosition =
    Sprite_Actor.prototype.moveToStartPosition;
Sprite_Actor.prototype.moveToStartPosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    Yanfly.Debug.Sprite_Actor_moveToStartPosition.call(this);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

if (!Imported.YEP_MainMenuManager) {
  Yanfly.Debug.Window_MenuCommand_addGameEndCommand =
      Window_MenuCommand.prototype.addGameEndCommand;
  Window_MenuCommand.prototype.addGameEndCommand = function() {
      this.addDebugCommand();
      Yanfly.Debug.Window_MenuCommand_addGameEndCommand.call(this);
  };

  Window_MenuCommand.prototype.addDebugCommand = function() {
      this.addCommand(Yanfly.Debug.Command, 'debug');
  };
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

Yanfly.Debug.Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Yanfly.Debug.Window_TitleCommand_makeCommandList.call(this);
    this.addDebugCommands();
};

Window_TitleCommand.prototype.addDebugCommands = function() {
    if ($dataSystem.boat.startMapId > 0) {
      this.addCommand(Yanfly.Debug.StartBoat, 'startBoat');
    }
    if ($dataSystem.ship.startMapId > 0) {
      this.addCommand(Yanfly.Debug.StartShip, 'startShip');
    }
    if ($dataSystem.airship.startMapId > 0) {
      this.addCommand(Yanfly.Debug.StartAirship, 'startAirship');
    }
};

Yanfly.Debug.Window_TitleCommand_selectLast =
    Window_TitleCommand.prototype.selectLast;
Window_TitleCommand.prototype.selectLast = function() {
    Yanfly.Debug.Window_TitleCommand_selectLast.call(this);
    if ($dataSystem.boat.startMapId > 0) {
      this.selectSymbol('startBoat');
    } else if ($dataSystem.ship.startMapId > 0) {
      this.selectSymbol('startShip');
    } else if ($dataSystem.airship.startMapId > 0) {
      this.selectSymbol('startAirship');
    }
};

//=============================================================================
// Window_DebugMapIcon
//=============================================================================

function Window_DebugMapIcon() {
    this.initialize.apply(this, arguments);
}

Window_DebugMapIcon.prototype = Object.create(Window_Base.prototype);
Window_DebugMapIcon.prototype.constructor = Window_DebugMapIcon;

Window_DebugMapIcon.prototype.initialize = function() {
    var ww = Window_Base._iconWidth + this.standardPadding() * 2;
    var wh = Window_Base._iconHeight + this.standardPadding() * 2;
    var wx = Graphics.boxWidth - ww + this.standardPadding() / 2;
    var wy = 0 - this.standardPadding() / 2;
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this.refresh();
    this.opacity = 0;
};

Window_DebugMapIcon.prototype.refresh = function() {
    this.contents.clear();
    this.drawIcon(Yanfly.Param.DebugMapIcon, 2, 2);
};

Window_DebugMapIcon.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.visible = !$gameTemp._debugHideIcon;
};

Window_DebugMapIcon.prototype.isTouchedInsideFrame = function() {
    if ($gameTemp._debugHideIcon) return false;
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Yanfly.Debug.Window_PartyCommand_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    Yanfly.Debug.Window_PartyCommand_makeCommandList.call(this);
    if (!Yanfly.Param.DebugBattleDebug) return;
    this.addCommand(Yanfly.Debug.BattleWin, 'debugWin');
    this.addCommand(Yanfly.Debug.BattleLose, 'debugLose');
    this.addCommand(Yanfly.Debug.Command, 'debug');
};

//=============================================================================
// Window_DebugCommand
//=============================================================================

function Window_DebugCommand() {
    this.initialize.apply(this, arguments);
}

Window_DebugCommand.prototype = Object.create(Window_Command.prototype);
Window_DebugCommand.prototype.constructor = Window_DebugCommand;

Window_DebugCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this._actor = null;
};

Window_DebugCommand.prototype.windowWidth = function() {
    return 240;
};

Window_DebugCommand.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_DebugCommand.prototype.makeCommandList = function() {
    var inBattle = $gameParty.inBattle();
    this.addCommand(Yanfly.Debug.CmdQuick,    'quick',    true);
    this.addCommand(Yanfly.Debug.CmdSwitch,   'switch',   true);
    this.addCommand(Yanfly.Debug.CmdVariable, 'variable', true);
    this.addCommand(Yanfly.Debug.CmdTeleport, 'teleport', !inBattle);
    this.addCommand(Yanfly.Debug.CmdBattle,   'battle',   !inBattle);
    this.addCommand(Yanfly.Debug.CmdEvent,    'event',    true);
    this.addCommand(Yanfly.Debug.CmdEnemies,  'enemies',  inBattle);
};

Window_DebugCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_DebugCommand.prototype.updateHelp = function() {
    Window_Command.prototype.updateHelp.call(this);
    switch (this.currentSymbol()) {
    case 'quick':
      this._helpWindow.setText(Yanfly.Debug.HelpQuick);
      break;
    case 'switch':
      this._helpWindow.setText(Yanfly.Debug.HelpSwitch);
      break;
    case 'variable':
      this._helpWindow.setText(Yanfly.Debug.HelpVariable);
      break;
    case 'teleport':
      this._helpWindow.setText(Yanfly.Debug.HelpTeleport);
      break;
    case 'battle':
      this._helpWindow.setText(Yanfly.Debug.HelpBattle);
      break;
    case 'event':
      this._helpWindow.setText(Yanfly.Debug.HelpEvent);
      break;
    case 'enemies':
      this._helpWindow.setText(Yanfly.Debug.HelpEnemies);
      break;
    default:
      this._helpWindow.setText('');
      break;
    }
};

//=============================================================================
// Window_DebugQuick
//=============================================================================

function Window_DebugQuick() {
    this.initialize.apply(this, arguments);
}

Window_DebugQuick.prototype = Object.create(Window_Command.prototype);
Window_DebugQuick.prototype.constructor = Window_DebugQuick;

Window_DebugQuick.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugQuick.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugQuick.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugQuick.prototype.makeCommandList = function() {
    this.addCommand(Yanfly.Debug.QuickGoldMax, 'goldMax');
    this.addCommand(Yanfly.Debug.QuickGold0, 'gold0');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickItemsx1, 'item1');
    this.addCommand(Yanfly.Debug.QuickWeaponsx1, 'wep1');
    this.addCommand(Yanfly.Debug.QuickArmorsx1, 'arm1');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickItemsx10, 'item10');
    this.addCommand(Yanfly.Debug.QuickWeaponsx10, 'wep10');
    this.addCommand(Yanfly.Debug.QuickArmorsx10, 'arm10');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickItemsMax, 'itemMax');
    this.addCommand(Yanfly.Debug.QuickWeaponsMax, 'wepMax');
    this.addCommand(Yanfly.Debug.QuickArmorsMax, 'armMax');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickLvUpx1, 'lvup1');
    this.addCommand(Yanfly.Debug.QuickLvUpx10, 'lvup10');
    this.addCommand(Yanfly.Debug.QuickLvUpxMax, 'lvupMax');
    this.addCommand(' ', 'nothing', false);
    this.addCommand(Yanfly.Debug.QuickLvDnx1, 'lvdn1');
    this.addCommand(Yanfly.Debug.QuickLvDnx10, 'lvdn10');
    this.addCommand(Yanfly.Debug.QuickLvDnto1, 'lvdnto1');
    if (Imported.YEP_JobPoints) {
      this.addCommand(' ', 'nothing', false);
      this.addCommand(Yanfly.Debug.QuickJp + '+100 All', 'jpPlus100All');
      this.addCommand(Yanfly.Debug.QuickJp + '+1,000 All', 'jpPlus1000All');
      this.addCommand(Yanfly.Debug.QuickJp + '+Max All', 'jpMaxAll');
      this.addCommand(' ', 'nothing', false);
      this.addCommand(Yanfly.Debug.QuickJp + '-100 All', 'jpMinus100All');
      this.addCommand(Yanfly.Debug.QuickJp + '-1,000 All', 'jpMinus1000All');
      this.addCommand(Yanfly.Debug.QuickJp + 'Zero All', 'jpZeroAll');
    }
    if (Imported.YEP_ClassChangeCore) {
      this.addCommand(' ', 'nothing', false);
      this.addCommand(Yanfly.Debug.QuickUnlockClasses, 'unlockAllClasses');
    }
    if (Imported.YEP_EnhancedTP) {
      this.addCommand(' ', 'nothing', false);
      this.addCommand('Unlock All TP Modes', 'unlockTpModes');
      this.addCommand('Removek All TP Modes', 'removeTpModes');
    }
};

//=============================================================================
// Window_DebugSwitch
//=============================================================================

function Window_DebugSwitch() {
    this.initialize.apply(this, arguments);
}

Window_DebugSwitch.prototype = Object.create(Window_Command.prototype);
Window_DebugSwitch.prototype.constructor = Window_DebugSwitch;

Window_DebugSwitch.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugSwitch.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugSwitch.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugSwitch.prototype.makeCommandList = function() {
    for (var i = 1; i < $dataSystem.switches.length; ++i) {
      var switchId = i;
      var switchName = $dataSystem.switches[i];
      var fmt = 'S%1:%2';
      var text = fmt.format(switchId.padZero(4), switchName);
      this.addCommand(text, 'toggleSwitch', true, switchId);
    }
};

Window_DebugSwitch.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.setColor(index);
    var text = this.commandName(index);
    var onoff = '';
    var switchId = this._list[index].ext;
    if ($gameSwitches.value(switchId)) {
      onoff = '[ON] ';
      if ($dataSystem.switches[switchId].length === 0) {
        text = text + Yanfly.Debug.Attention;
      }
    } else {
      onoff = '[OFF]';
      if ($dataSystem.switches[switchId].length === 0) {
        text = text + Yanfly.Debug.Unnamed;
      }
    }
    this.drawText(text, rect.x, rect.y, rect.width, 'left');
    this.drawText(onoff, rect.x, rect.y, rect.width, 'right');
};

Window_DebugSwitch.prototype.setColor = function(index) {
    var switchId = this._list[index].ext;
    if ($gameSwitches.value(switchId)) {
      this.changePaintOpacity(true);
      if ($dataSystem.switches[switchId].length > 0) {
        this.changeTextColor(this.crisisColor());
      } else {
        this.changeTextColor(this.deathColor());
      }
    } else {
      this.changeTextColor(this.normalColor());
      if ($dataSystem.switches[switchId].length > 0) {
        this.changePaintOpacity(true);
      } else {
        this.changePaintOpacity(false);
      }
    }
};

//=============================================================================
// Window_DebugVariable
//=============================================================================

function Window_DebugVariable() {
    this.initialize.apply(this, arguments);
}

Window_DebugVariable.prototype = Object.create(Window_Command.prototype);
Window_DebugVariable.prototype.constructor = Window_DebugVariable;

Window_DebugVariable.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugVariable.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugVariable.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugVariable.prototype.makeCommandList = function() {
    for (var i = 1; i < $dataSystem.variables.length; ++i) {
      var varId = i;
      var varName = $dataSystem.variables[i];
      var fmt = 'V%1:%2';
      var text = fmt.format(varId.padZero(4), varName);
      this.addCommand(text, 'setVar', true, varId);
    }
};

Window_DebugVariable.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.setColor(index);
    var text = this.commandName(index);
    var varId = this._list[index].ext;
    var varValue = $gameVariables.value(varId);
    var varName = $dataSystem.variables[varId];
    if (typeof varValue === 'number') {
      varValue = Yanfly.Util.toGroup(varValue);
    } else {
      varValue = '"' + varValue + '"';
    }
    if (varValue !== '0') {
      if (varName === '') text = text + Yanfly.Debug.Attention;
    } else {
      if (varName === '') text = text + Yanfly.Debug.Unnamed;
    }
    this.drawText(text, rect.x, rect.y, rect.width, 'left');
    this.drawText(varValue, rect.x, rect.y, rect.width, 'right');
};

Window_DebugVariable.prototype.setColor = function(index) {
    var varId = this._list[index].ext;
    var varValue = $gameVariables.value(varId);
    var varName = $dataSystem.variables[varId];
    if (varValue !== 0) {
      this.changePaintOpacity(true);
      if (varName !== '') {
        this.changeTextColor(this.crisisColor());
      } else {
        this.changeTextColor(this.deathColor());
      }
    } else {

      this.changeTextColor(this.normalColor());
      if (varName !== '') {
        this.changePaintOpacity(true);
      } else {
        this.changePaintOpacity(false);
      }
    }
};

//=============================================================================
// Window_DebugTeleport
//=============================================================================

function Window_DebugTeleport() {
    this.initialize.apply(this, arguments);
}

Window_DebugTeleport.prototype = Object.create(Window_Command.prototype);
Window_DebugTeleport.prototype.constructor = Window_DebugTeleport;

Window_DebugTeleport.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugTeleport.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugTeleport.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugTeleport.prototype.makeCommandList = function() {
    for (var i = 1; i < $dataMapInfos.length; ++i) {
      var mapId = i;
      if ($dataMapInfos[mapId] === null) continue;
      var mapName = $dataMapInfos[mapId].name;
      var fmt = 'M%1:%2';
      var text = fmt.format(mapId.padZero(3), mapName);
      this.addCommand(text, 'teleport', true, mapId);
    }
};

//=============================================================================
// Window_DebugBattle
//=============================================================================

function Window_DebugBattle() {
    this.initialize.apply(this, arguments);
}

Window_DebugBattle.prototype = Object.create(Window_Command.prototype);
Window_DebugBattle.prototype.constructor = Window_DebugBattle;

Window_DebugBattle.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugBattle.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugBattle.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugBattle.prototype.makeCommandList = function() {
    for (var i = 1; i < $dataTroops.length; ++i) {
      var troopId = i;
      var troopName = $dataTroops[troopId].name;
      var fmt = 'B%1:%2';
      var text = fmt.format(troopId.padZero(4), troopName);
      this.addCommand(text, 'battle', true, troopId);
    }
};

Window_DebugBattle.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var troopId = this._list[index].ext;
    var troopName = $dataTroops[troopId].name;
    var text = this.commandName(index);
    if (troopName === '') text = text + Yanfly.Debug.Unnamed;
    this.drawText(text, rect.x, rect.y, rect.width, 'left');
};

//=============================================================================
// Window_DebugEvent
//=============================================================================

function Window_DebugEvent() {
    this.initialize.apply(this, arguments);
}

Window_DebugEvent.prototype = Object.create(Window_Command.prototype);
Window_DebugEvent.prototype.constructor = Window_DebugEvent;

Window_DebugEvent.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugEvent.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugEvent.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugEvent.prototype.makeCommandList = function() {
    for (var i = 1; i < $dataCommonEvents.length; ++i) {
      var eventId = i;
      var eventName = $dataCommonEvents[eventId].name;
      var fmt = 'C%1:%2';
      var text = fmt.format(eventId.padZero(4), eventName);
      this.addCommand(text, 'playEvent', true, eventId);
    }
};

Window_DebugEvent.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var eventId = this._list[index].ext;
    var eventName = $dataCommonEvents[eventId].name;
    var text = this.commandName(index);
    if (eventName === '') text = text + Yanfly.Debug.Unnamed;
    this.drawText(text, rect.x, rect.y, rect.width, 'left');
};

//=============================================================================
// Window_DebugEnemy
//=============================================================================

function Window_DebugEnemy() {
    this.initialize.apply(this, arguments);
}

Window_DebugEnemy.prototype = Object.create(Window_Command.prototype);
Window_DebugEnemy.prototype.constructor = Window_DebugEnemy;

Window_DebugEnemy.prototype.initialize = function(dummyWindow) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugEnemy.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugEnemy.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugEnemy.prototype.makeCommandList = function() {
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var member = $gameTroop.members()[i];
      if (!member) continue;
      var text = member.name();
      this.addCommand(text, 'selectEnemy', true, i);
    }
};

//=============================================================================
// Window_DebugEnemySelect
//=============================================================================

function Window_DebugEnemySelect() {
    this.initialize.apply(this, arguments);
}

Window_DebugEnemySelect.prototype = Object.create(Window_Command.prototype);
Window_DebugEnemySelect.prototype.constructor = Window_DebugEnemySelect;

Window_DebugEnemySelect.prototype.initialize = function(dummyWindow, enemy) {
    this._dummyWindow = dummyWindow;
    var wx = dummyWindow.x;
    var wy = dummyWindow.y;
    this._enemy = enemy;
    Window_Command.prototype.initialize.call(this, wx, wy);
};

Window_DebugEnemySelect.prototype.windowWidth = function() {
    return this._dummyWindow.width;
};

Window_DebugEnemySelect.prototype.windowHeight = function() {
    return this._dummyWindow.height;
};

Window_DebugEnemySelect.prototype.setEnemy = function(enemy) {
    this._enemy = enemy;
    this.refresh();
    this.show();
    this.activate();
    this.select(0);
};

Window_DebugEnemySelect.prototype.makeCommandList = function() {
    var text = this._enemy.name();
    this.addCommand(text, 'none');
    this.addCommand('---Parameters---', 'none');
    var text = 'Current ' + TextManager.hp;
    this.addCommand(text, 'enemyHp', true, this._enemy._hp);
    var text = 'Current ' + TextManager.mp;
    this.addCommand(text, 'enemyMp', true, this._enemy._mp);
    var text = 'Current ' + TextManager.tp;
    this.addCommand(text, 'enemyTp', true, this._enemy._tp);
    for (var i = 0; i < 8; ++i) {
      var text = TextManager.param(i);
      this.addCommand(text, 'enemyParam', true, i);
    }
};

Window_DebugEnemySelect.prototype.drawItem = function(index) {
    Window_Command.prototype.drawItem.call(this, index);
    var symbol = this._list[index].symbol;
    var ext = this._list[index].ext;
    var rect = this.itemRectForText(index);
    if (symbol === 'enemyHp') {
      this.drawActorHp(this._enemy, rect.width / 2, rect.y, rect.width / 2);
    } else if (symbol === 'enemyMp') {
      this.drawActorMp(this._enemy, rect.width / 2, rect.y, rect.width / 2);
    } else if (symbol === 'enemyTp') {
      this.drawActorTp(this._enemy, rect.width / 2, rect.y, rect.width / 2);
    } else if (symbol === 'enemyParam') {
      var param = this._enemy.param(ext)
      var text = Yanfly.Util.toGroup(param);
      var ww = rect.width - this.textPadding();
      this.drawText(text, rect.x, rect.y, ww, 'right');
    }
};

//=============================================================================
// Window_FieldDebugCommand
//=============================================================================

function Window_FieldDebugCommand() {
    this.initialize.apply(this, arguments);
}

Window_FieldDebugCommand.prototype = Object.create(Window_Command.prototype);
Window_FieldDebugCommand.prototype.constructor = Window_FieldDebugCommand;

Window_FieldDebugCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
    this.deactivate();
};

Window_FieldDebugCommand.prototype.windowWidth = function() {
    return this._maxWidth || 240;
};

Window_FieldDebugCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_FieldDebugCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_FieldDebugCommand.prototype.makeCommandList = function() {
    this._maxWidth = 0;
    this.addWarpTo();
    this.addCommand('Main Menu', 'main menu');
    this.makeEventCommands();
    this.makePlayerCommands();
    if ($gameTemp._debugHideIcon) {
      var text = 'Show Debug Icon';
      this.addCommand(text, 'showDebugIcon');
    }
    this._maxWidth += this.standardPadding() * 4;
};

Window_FieldDebugCommand.prototype.makeEventCommands = function() {
    if (!this._clickedEvent) return;
    if ($gameTemp._forcePlayerDebug) return;
    this.addCommand(this._clickedEvent.event().name, 'call event');
    var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'A'];
    var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
    this.addCommand('Self Switch A: ' + text, 'self switch', true, 'A');
    var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'B'];
    var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
    this.addCommand('Self Switch B: ' + text, 'self switch', true, 'B');
    var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'C'];
    var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
    this.addCommand('Self Switch C: ' + text, 'self switch', true, 'C');
    var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'D'];
    var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
    this.addCommand('Self Switch D: ' + text, 'self switch', true, 'D');
    this.addCommand('Erase Event', 'erase event');
};

Window_FieldDebugCommand.prototype.makePlayerCommands = function() {
    var x = $gameMap.canvasToMapX(this._clickedX);
    var y = $gameMap.canvasToMapY(this._clickedY);
    if (!$gameTemp._forcePlayerDebug) {
      if (x !== $gamePlayer.x) return;
      if (y !== $gamePlayer.y) return;
    }
    // Menu Toggle
    if ($gameSystem.isMenuEnabled()) {
      var text = 'Disable Menu';
    } else {
      var text = 'Enable Menu';
    }
    this.addCommand(text, 'menuToggle');
    // Recover All
    this.addCommand('Recover All', 'recoverAll');
    this.addCommand('Fill TP', 'fillTp');
    // Random Encounter
    var text = 'Random Encounter';
    var enabled = $gamePlayer.makeEncounterTroopId();
    this.addCommand(text, 'randomEncounter', enabled);
    // Encounter Toggle
    if ($gameSystem.isEncounterEnabled()) {
      var text = 'Disable Encounters';
    } else {
      var text = 'Enable Encounters';
    }
    this.addCommand(text, 'encounterToggle');
    // Save Menu
    var text = 'Access Save Menu';
    this.addCommand(text, 'quickSave');
    // Load Menu
    var text = 'Access Load Menu';
    this.addCommand(text, 'quickLoad');
    // Save Toggle
    if ($gameSystem.isSaveEnabled()) {
      var text = 'Disable Save';
    } else {
      var text = 'Enable Save';
    }
    this.addCommand(text, 'saveToggle');
    // Corner Debug Menu
    if ($gameTemp._forcePlayerDebug) {
      var text = 'Hide Debug Icon';
      this.addCommand(text, 'hideDebugIcon');
    }
};

Window_FieldDebugCommand.prototype.addWarpTo = function() {
    if ($gameTemp._forcePlayerDebug) return;
    var x = $gameMap.canvasToMapX(this._clickedX);
    var y = $gameMap.canvasToMapY(this._clickedY);
    var text = 'Warp (X:' + x + ', Y:' + y + ')';
    this.addCommand(text, 'warp');
};

Window_FieldDebugCommand.prototype.addCommand = function(name, symbol, enabled,
ext) {
    Window_Command.prototype.addCommand.call(this, name, symbol, enabled, ext);
    if (!this._widthCalcEnabled) return;
    this._maxWidth = Math.max(this._maxWidth, this.textWidth(name));
    this._maxWidth = this._maxWidth.clamp(0, Graphics.boxWidth);
};

Window_FieldDebugCommand.prototype.setup = function() {
    SoundManager.playCursor();
    this._widthCalcEnabled = true;
    this._clickedX = TouchInput.x;
    this._clickedY = TouchInput.y;
    this.makeEventData();
    this.clearCommandList();
    this.makeCommandList();
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.createContents();
    this.refresh();
    this.select(0);
    this.activate();
    this.open();
    this.show();
    this.updatePosition();
};

Window_FieldDebugCommand.prototype.makeEventData = function() {
    var x = $gameMap.canvasToMapX(this._clickedX);
    var y = $gameMap.canvasToMapY(this._clickedY);
    this._clickedEvent = $gameMap.getEventAtPos(x, y);
    if (this._clickedEvent) this._clickedEvent._balloonId = 1;
};

Window_FieldDebugCommand.prototype.getEventData = function() {
    return this._clickedEvent;
};

Window_FieldDebugCommand.prototype.updatePosition = function() {
    var x = TouchInput.x;
    var y = TouchInput.y;
    if ($gameTemp._forcePlayerDebug) {
      x = Graphics.boxWidth;
      y = 0;
    }
    this.x = x.clamp(0, Graphics.boxWidth - this.width);
    this.y = y.clamp(0, Graphics.boxHeight - this.height);
};

Window_FieldDebugCommand.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) this.processClose();
    Window_Selectable.prototype.processOk.call(this);
};

Window_FieldDebugCommand.prototype.processClose = function() {
    this.close();
    this.deactivate();
};

Window_FieldDebugCommand.prototype.processTouch = function() {
    if (!this.isOpenAndActive()) return;
    if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
      this.processClose();
    } else {
      Window_Selectable.prototype.processTouch.call(this);
    }
};

//=============================================================================
// Window_DebugCoordinates
//=============================================================================

function Window_DebugCoordinates() {
    this.initialize.apply(this, arguments);
}

Window_DebugCoordinates.prototype = Object.create(Window_Base.prototype);
Window_DebugCoordinates.prototype.constructor = Window_DebugCoordinates;

Window_DebugCoordinates.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(2);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._opacityCounter = 60;
    this._x = 0;
    this._y = 0;
};

Window_DebugCoordinates.prototype.refresh = function() {
    this.contents.clear();
    this._x = $gamePlayer.x;
    this._y = $gamePlayer.y;
    SoundManager.playCursor();
    this._opacityCounter = 60;
    this.opacity = 255;
    this.contentsOpacity = 255;
    var text = $dataMapInfos[$gameMap.mapId()].name;
    this.drawText(text, 0, 0, this.contents.width, 'center');
    text = this.getCoordinates();
    this.drawText(text, 0, this.lineHeight(), this.contents.width, 'center');
};

Window_DebugCoordinates.prototype.getCoordinates = function() {
    var text = 'X: ' + this._x;
    text += ', Y: ' + this._y;
    return text;
};

Window_DebugCoordinates.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateOpacity();
    if (this._x !== $gamePlayer.x) {
      this.refresh();
    } else if (this._y !== $gamePlayer.y) {
      this.refresh();
    }
};

Window_DebugCoordinates.prototype.updateOpacity = function() {
    if (--this._opacityCounter < 0) {
      this.opacity -= 2;
      this.contentsOpacity -= 2;
    }
};

//=============================================================================
// Window_DebugRegionDisplay
//=============================================================================

function Window_DebugRegionDisplay() {
    this.initialize.apply(this, arguments);
}

Window_DebugRegionDisplay.prototype = Object.create(Window_Base.prototype);
Window_DebugRegionDisplay.prototype.constructor = Window_DebugRegionDisplay;

Window_DebugRegionDisplay.prototype.initialize = function() {
    var width = $gameMap.width() * $gameMap.tileWidth();
    var height = $gameMap.height() * $gameMap.tileHeight();
    width += this.standardPadding() * 2;
    height += this.standardPadding() * 2;
    var offset = this.standardPadding() * -1;
    Window_Base.prototype.initialize.call(this, -width, -height, width, height);
    this.x = 0;
    this.y = 0;
    this.opacity = 0;
    this.contentsOpacity = 128
    this._opacityCounter = 60;
    this._x = 0;
    this._y = 0;
    this.refresh();
};

Window_DebugRegionDisplay.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateOpacity();
    if (this._x !== $gamePlayer.x) {
      this.updatePosition();
    } else if (this._y !== $gamePlayer.y) {
      this.updatePosition();
    }
};

Window_DebugRegionDisplay.prototype.updateOpacity = function() {
    if (--this._opacityCounter < 0) {
      this.contentsOpacity -= 1;
    }
};

Window_DebugRegionDisplay.prototype.updatePosition = function() {
    this.contentsOpacity = 128;
    this._opacityCounter = 60;
    this._x = $gamePlayer.x;
    this._y = $gamePlayer.y;
    var offset = this.standardPadding();
    this.x = -1 * ($gameMap.displayX() * $gameMap.tileWidth()) - offset;
    this.y = -1 * ($gameMap.displayY() * $gameMap.tileHeight()) - offset;
};

Window_DebugRegionDisplay.prototype.refresh = function() {
    this.contents.clear();
    for (var x = 0; x < $gameMap.width(); ++x) {
      for (var y = 0; y < $gameMap.height(); ++y) {
        if ($gameMap.regionId(x, y) > 0) this.drawRegion(x, y);
      }
    }
};

Window_DebugRegionDisplay.prototype.drawRegion = function(x, y) {
    var regionId = $gameMap.regionId(x, y);
    var rect = this.regionRect(x, y);
    this.drawRegionColor(regionId, rect);
    this.contents.drawText(regionId, rect.x, rect.y, rect.width, rect.height,
      'center');
};

Window_DebugRegionDisplay.prototype.regionRect = function(dx, dy) {
    return {
      x: dx * $gameMap.tileWidth(),
      y: dy * $gameMap.tileHeight(),
      width: $gameMap.tileWidth(),
      height: $gameMap.tileHeight()
    }
};

Window_DebugRegionDisplay.prototype.drawRegionColor = function(id, rect) {
    var color = '#ed145b';
    switch (id % 12) {
    case 0:
      color = '#ed145b';
      break;
    case 1:
      color = '#ed1c24';
      break;
    case 2:
      color = '#f7941d';
      break;
    case 3:
      color = '#fff200';
      break;
    case 4:
      color = '#a3d39c';
      break;
    case 5:
      color = '#00a651';
      break;
    case 6:
      color = '#00a99d';
      break;
    case 7:
      color = '#00bff3';
      break;
    case 8:
      color = '#0072bc';
      break;
    case 9:
      color = '#0054a6';
      break;
    case 10:
      color = '#a864a8';
      break;
    case 11:
      color = '#f06eaa';
      break;
    }
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
};

//=============================================================================
// Scene_MapTeleport
//=============================================================================

function Scene_MapTeleport() {
    this.initialize.apply(this, arguments);
}

Scene_MapTeleport.prototype = Object.create(Scene_Map.prototype);
Scene_MapTeleport.prototype.constructor = Scene_MapTeleport;

Scene_MapTeleport.prototype.initialize = function() {
    Scene_Map.prototype.initialize.call(this);
};

Scene_MapTeleport.prototype.createDisplayObjects = function() {
    Scene_Map.prototype.createDisplayObjects.call(this);
    this.relocatePlayerToCenter();
    this.createRegionDisplayWindow();
    this.createCoordinatesWindow();
};

Scene_MapTeleport.prototype.createRegionDisplayWindow = function() {
    this._regionDisplayWindow = new Window_DebugRegionDisplay();
    this.addChild(this._regionDisplayWindow);
};

Scene_MapTeleport.prototype.createCoordinatesWindow = function() {
    this._coordinatesWindow = new Window_DebugCoordinates();
    this.addChild(this._coordinatesWindow);
};

Scene_MapTeleport.prototype.relocatePlayerToCenter = function() {
    var x = Math.floor($dataMap.width / 2);
    var y = Math.floor($dataMap.height / 2);
    $gamePlayer.locate(x, y);
};

Scene_MapTeleport.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    this.updateTouchInputControls();
    this.updateKeyInputControls();
};

Scene_MapTeleport.prototype.updateTouchInputControls = function() {
    if (!TouchInput.isTriggered()) return;
    var x = $gameMap.canvasToMapX(TouchInput.x);
    var y = $gameMap.canvasToMapY(TouchInput.y);
    if (x === $gamePlayer.x && y === $gamePlayer.y) {
      this.confirmAcceptLocation()
    } else {
      $gamePlayer.locate(x, y);
    }
};

Scene_MapTeleport.prototype.updateKeyInputControls = function() {
    if (Input.isRepeated('down')) this.updateLocation(0, 1);
    if (Input.isRepeated('left')) this.updateLocation(-1, 0);
    if (Input.isRepeated('right')) this.updateLocation(1, 0);
    if (Input.isRepeated('up')) this.updateLocation(0, -1);
    if (Input.isTriggered('ok')) this.confirmAcceptLocation();
    if (Input.isTriggered('cancel')) this.cancelLocation();
};

Scene_MapTeleport.prototype.updateLocation = function(x, y) {
    var dx = ($gamePlayer.x + x).clamp(0, $dataMap.width - 1);
    var dy = ($gamePlayer.y + y).clamp(0, $dataMap.height - 1);
    $gamePlayer.locate(dx, dy);
};

Scene_MapTeleport.prototype.confirmAcceptLocation = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_Map);
};

Scene_MapTeleport.prototype.cancelLocation = function() {
    SoundManager.playCancel();
    var x = $gameTemp._preDebugTeleportX;
    var y = $gameTemp._preDebugTeleportY;
    var mapId = $gameTemp._preDebugTeleportMap;
    $gamePlayer.reserveTransfer(mapId, x, y, 2, 0);
    SceneManager.push(Scene_Map);
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Debug.Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
  Yanfly.Debug.Scene_Title_createCommandWindow.call(this);
  DataManager._debugStart = false;
  this._commandWindow.setHandler('startBoat', this.debugBoat.bind(this));
  this._commandWindow.setHandler('startShip', this.debugShip.bind(this));
  this._commandWindow.setHandler('startAirship', this.debugAirship.bind(this));
};

Scene_Title.prototype.debugBoat = function() {
    DataManager.debugStart($dataSystem.boat);
    SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.debugShip = function() {
    DataManager.debugStart($dataSystem.ship);
    SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.debugAirship = function() {
    DataManager.debugStart($dataSystem.airship);
    SceneManager.goto(Scene_Map);
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Debug.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.Debug.Scene_Map_createAllWindows.call(this);
    this.createFieldDebugWindow();
    this.createDebugMapIconWindow();
};

Yanfly.Debug.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  if (Yanfly.Param.DebugMapIcon && TouchInput.isTriggered()) {
    if (this._debugMapIconWindow &&
    this._debugMapIconWindow.isTouchedInsideFrame()) {
      $gameTemp._forcePlayerDebug = true;
      this.processFieldDebug();
      $gameTemp._forcePlayerDebug = undefined;
      return;
    }
  }
  if (Yanfly.Param.DebugFieldDebug) {
     if (this.isProcessFieldDebug()) return this.processFieldDebug();
  }
  if (this._fieldDebugWindow.isOpen()) return;
  Yanfly.Debug.Scene_Map_processMapTouch.call(this);
  if (TouchInput.isTriggered() && Input.isPressed('control')) {
    $gamePlayer.locate($gameTemp.destinationX(), $gameTemp.destinationY());
  }
};

Scene_Map.prototype.isProcessFieldDebug = function() {
    if (TouchInput.isCancelled()) return true;
    return false;
};

Scene_Map.prototype.processFieldDebug = function() {
    this._fieldDebugWindow.openness = 0;
    this._fieldDebugWindow.setup();
};

Scene_Map.prototype.closeFieldDebug = function() {
    this._fieldDebugWindow.close();
    this._fieldDebugWindow.deactivate();
};

Yanfly.Debug.Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
Scene_Map.prototype.isMenuCalled = function() {
  if (Yanfly.Param.DebugFieldDebug && TouchInput.isCancelled()) return false;
  return Yanfly.Debug.Scene_Map_isMenuCalled.call(this);
};

Scene_Map.prototype.createFieldDebugWindow = function() {
    this._fieldDebugWindow = new Window_FieldDebugCommand();
    this.addChild(this._fieldDebugWindow);
    var win = this._fieldDebugWindow
    win.setHandler('warp', this.debugWarp.bind(this));
    win.setHandler('main menu', this.debugMainMenu.bind(this));
    win.setHandler('call event', this.debugCallEvent.bind(this));
    win.setHandler('self switch', this.debugSelfSwitch.bind(this));
    win.setHandler('erase event', this.debugEraseEvent.bind(this));
    win.setHandler('menuToggle', this.debugToggleMenu.bind(this));
    win.setHandler('randomEncounter', this.debugRandomEncounter.bind(this));
    win.setHandler('encounterToggle', this.debugToggleEncounter.bind(this));
    win.setHandler('quickSave', this.debugQuickSave.bind(this));
    win.setHandler('quickLoad', this.debugQuickLoad.bind(this));
    win.setHandler('saveToggle', this.debugToggleSave.bind(this));
    win.setHandler('recoverAll', this.debugRecoverAll.bind(this));
    win.setHandler('fillTp', this.debugFillTp.bind(this));
    win.setHandler('hideDebugIcon', this.debugHideDebugIcon.bind(this));
    win.setHandler('showDebugIcon', this.debugShowDebugIcon.bind(this));
};

Scene_Map.prototype.createDebugMapIconWindow = function() {
    this._debugMapIconWindow = new Window_DebugMapIcon();
    this.addChild(this._debugMapIconWindow);
};

Scene_Map.prototype.debugWarp = function() {
    var x = $gameMap.canvasToMapX(this._fieldDebugWindow._clickedX);
    var y = $gameMap.canvasToMapY(this._fieldDebugWindow._clickedY);
    $gameTemp.setDestination(x, y);
    $gamePlayer.locate($gameTemp.destinationX(), $gameTemp.destinationY());
};

Scene_Map.prototype.debugMainMenu = function() {
    this._fieldDebugWindow.hide();
    this.callMenu();
};

Scene_Map.prototype.debugCallEvent = function() {
    var ev = this._fieldDebugWindow.getEventData();
    if (ev) ev.start();
};

Scene_Map.prototype.debugSelfSwitch = function() {
    var ev = this._fieldDebugWindow._clickedEvent;
    if (!ev) return;
    var key = [ev._mapId, ev._eventId, this._fieldDebugWindow.currentExt()];
    $gameSelfSwitches.setValue(key, !$gameSelfSwitches.value(key));
    this._fieldDebugWindow.open();
    this._fieldDebugWindow.activate();
    this._fieldDebugWindow.refresh();
};

Scene_Map.prototype.debugEraseEvent = function() {
    var ev = this._fieldDebugWindow._clickedEvent;
    if (!ev) return;
    $gameMap.eraseEvent(ev._eventId);
};

Scene_Map.prototype.debugToggleMenu = function() {
    if ($gameSystem.isMenuEnabled()) {
      $gameSystem.disableMenu();
    } else {
      $gameSystem.enableMenu();
    }
};

Scene_Map.prototype.debugRandomEncounter = function() {
    $gamePlayer._encounterCount = 0;
    this.updateEncounter();
};

Scene_Map.prototype.debugToggleEncounter = function() {
    if ($gameSystem.isEncounterEnabled()) {
      $gameSystem.disableEncounter();
    } else {
      $gameSystem.enableEncounter();
    }
};

Scene_Map.prototype.debugQuickSave = function() {
    SceneManager.push(Scene_Save);
};

Scene_Map.prototype.debugQuickLoad = function() {
    SceneManager.push(Scene_Load);
};

Scene_Map.prototype.debugToggleSave = function() {
    if ($gameSystem.isSaveEnabled()) {
      $gameSystem.disableSave();
    } else {
      $gameSystem.enableSave();
    }
};

Scene_Map.prototype.debugRecoverAll = function() {
    SoundManager.playRecovery();
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.members()[i];
      if (member) member.recoverAll();
    }
};

Scene_Map.prototype.debugFillTp = function() {
    SoundManager.playRecovery();
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.members()[i];
      if (member) member.gainTp(member.maxTp());
    }
};

Scene_Map.prototype.debugHideDebugIcon = function() {
    $gameTemp._debugHideIcon = true;
};

Scene_Map.prototype.debugShowDebugIcon = function() {
    $gameTemp._debugHideIcon = false;
};

//=============================================================================
// Scene_Menu
//=============================================================================

if (!Imported.YEP_MainMenuManager) {
  Yanfly.Debug.Scene_Menu_createCommandWindow =
      Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.Debug.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('debug', this.commandDebug.bind(this));
  };
};

Scene_Menu.prototype.commandDebug = function() {
    SceneManager.push(Scene_Debug);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Debug.Scene_Battle_createPartyCommandWindow =
    Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  Yanfly.Debug.Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler('debug', this.debugMenu.bind(this));
  this._partyCommandWindow.setHandler('debugWin', this.debugWin.bind(this));
  this._partyCommandWindow.setHandler('debugLose', this.debugLose.bind(this));
};

Scene_Battle.prototype.debugMenu = function() {
    BattleManager._bypassMoveToStartLocation = true;
    this.prepareBackground();
    BattleManager._savedActor = BattleManager.actor();
    Yanfly.Debug.SavedBattleBgm = AudioManager.saveBgm();
    Yanfly.Debug.SavedBattleBgs = AudioManager.saveBgs();
    SceneManager.push(Scene_Debug);
    BattleManager._phase = 'input';
    $gameTemp._rowBattle = true;
};

Scene_Battle.prototype.debugWin = function() {
    $gameTroop.members().forEach(function(enemy) {
      enemy.setHp(0);
      enemy.performCollapse();
    });
    BattleManager.startTurn();
};

Scene_Battle.prototype.debugLose = function() {
    $gameParty.battleMembers().forEach(function(actor) {
      actor.setHp(0);
      actor.performCollapse();
      actor.requestMotion('dead');
    });
    BattleManager.startTurn();
};

//=============================================================================
// Scene_Debug
//=============================================================================

Scene_Debug.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createDummyWindow();
};

Scene_Debug.prototype.selectCmdWindow = function() {
    this.hideWindows();
    this._dummyWindow.show();
    this._commandWindow.activate();
};

Scene_Debug.prototype.hideWindows = function() {
    if (this._dummyWindow) this._dummyWindow.hide();
    if (this._quickWindow) this._quickWindow.hide();
    if (this._switchWindow) this._switchWindow.hide();
    if (this._varWindow) this._varWindow.hide();
    if (this._eventWindow) this._eventWindow.hide();
    if (this._battleWindow) this._battleWindow.hide();
    if (this._teleportWindow) this._teleportWindow.hide();
    if (this._enemyWindow) this._enemyWindow.hide();
    if (this._enemySelectWindow) this._enemySelectWindow.hide();
};

Scene_Debug.prototype.returnToMap = function() {
    if ($gameParty.inBattle()) {
      this.popScene();
    } else {
      this.popScene();
      if (SceneManager._stack.length === 0) return;
      this.popScene();
    }
};

Scene_Debug.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_DebugCommand();
    this._commandWindow.x = 0;
    this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.height = Graphics.boxHeight - this._commandWindow.y;
    this._commandWindow.refresh();
    this.setCommandWindowHandlers();
    this._commandWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._commandWindow);
};

Scene_Debug.prototype.setCommandWindowHandlers = function() {
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('quick', this.cmdQuick.bind(this));
    this._commandWindow.setHandler('switch', this.cmdSwitch.bind(this));
    this._commandWindow.setHandler('variable', this.cmdVariable.bind(this));
    this._commandWindow.setHandler('teleport', this.cmdTeleport.bind(this));
    this._commandWindow.setHandler('battle', this.cmdBattle.bind(this));
    this._commandWindow.setHandler('event', this.cmdEvent.bind(this));
    this._commandWindow.setHandler('enemies', this.cmdEnemies.bind(this));
};

Scene_Debug.prototype.createDummyWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._commandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._dummyWindow = new Window_Base(wx, wy, ww, wh);
    this.addWindow(this._dummyWindow);
};

Scene_Debug.prototype.cmdQuick = function() {
    this.hideWindows();
    this.createQuickWindow();
    this._quickWindow.show();
    this._quickWindow.activate();
};

Scene_Debug.prototype.createQuickWindow = function() {
    if (this._quickWindow) return;
    this._quickWindow = new Window_DebugQuick(this._dummyWindow);
    this.addWindow(this._quickWindow);
    var win = this._quickWindow;
    win.setHandler('cancel', this.selectCmdWindow.bind(this));
    win.setHandler('item1', this.gainItems1.bind(this));
    win.setHandler('item10', this.gainItems10.bind(this));
    win.setHandler('itemMax', this.gainItemsMax.bind(this));
    win.setHandler('wep1', this.gainWep1.bind(this));
    win.setHandler('wep10', this.gainWep10.bind(this));
    win.setHandler('wepMax', this.gainWepMax.bind(this));
    win.setHandler('arm1', this.gainArm1.bind(this));
    win.setHandler('arm10', this.gainArm10.bind(this));
    win.setHandler('armMax', this.gainArmMax.bind(this));
    win.setHandler('goldMax', this.goldMax.bind(this));
    win.setHandler('gold0', this.gold0.bind(this));
    win.setHandler('lvup1', this.lvup1.bind(this));
    win.setHandler('lvup10', this.lvup10.bind(this));
    win.setHandler('lvupMax', this.lvupMax.bind(this));
    win.setHandler('lvdn1', this.lvdn1.bind(this));
    win.setHandler('lvdn10', this.lvdn10.bind(this));
    win.setHandler('lvdnto1', this.lvdnto1.bind(this));
    if (Imported.YEP_JobPoints) {
      win.setHandler('jpPlus100All', this.jpPlus100.bind(this));
      win.setHandler('jpPlus1000All', this.jpPlus1000.bind(this));
      win.setHandler('jpMaxAll', this.jpMax.bind(this));
      win.setHandler('jpMinus100All', this.jpMin100.bind(this));
      win.setHandler('jpMinus1000All', this.jpMin1000.bind(this));
      win.setHandler('jpZeroAll', this.jpZero.bind(this));
    }
    if (Imported.YEP_ClassChangeCore) {
      win.setHandler('unlockAllClasses', this.unlockAllClasses.bind(this));
    }
    if (Imported.YEP_EnhancedTP) {
      win.setHandler('unlockTpModes', this.unlockTpModes.bind(this));
      win.setHandler('removeTpModes', this.removeTpModes.bind(this));
    }
};

Scene_Debug.prototype.isItemValid = function(item) {
    if (!item) return false;
    if (item.name.length <= 0) return false;
    if (Imported.YEP_ItemCore && item.baseItemId) return false;
    return true;
};

Scene_Debug.prototype.gainItems1 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataItems.length; ++i) {
      var item = $dataItems[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 1);
    }
};

Scene_Debug.prototype.gainItems10 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataItems.length; ++i) {
      var item = $dataItems[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 10);
    }
};

Scene_Debug.prototype.gainItemsMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataItems.length; ++i) {
      var item = $dataItems[i];
      if (this.isItemValid(item)) {
        $gameParty.gainItem(item, $gameParty.maxItems(item));
      }
    }
};

Scene_Debug.prototype.gainWep1 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataWeapons.length; ++i) {
      var item = $dataWeapons[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 1);
    }
};

Scene_Debug.prototype.gainWep10 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataWeapons.length; ++i) {
      var item = $dataWeapons[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 10);
    }
};

Scene_Debug.prototype.gainWepMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataWeapons.length; ++i) {
      var item = $dataWeapons[i];
      if (this.isItemValid(item)) {
        $gameParty.gainItem(item, $gameParty.maxItems(item));
      }
    }
};

Scene_Debug.prototype.gainArm1 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataArmors.length; ++i) {
      var item = $dataArmors[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 1);
    }
};

Scene_Debug.prototype.gainArm10 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataArmors.length; ++i) {
      var item = $dataArmors[i];
      if (this.isItemValid(item)) $gameParty.gainItem(item, 10);
    }
};

Scene_Debug.prototype.gainArmMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    for (var i = 0; i < $dataArmors.length; ++i) {
      var item = $dataArmors[i];
      if (this.isItemValid(item)) {
        $gameParty.gainItem(item, $gameParty.maxItems(item));
      }
    }
};

Scene_Debug.prototype.goldMax = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    var value = $gameParty.maxGold();
    $gameParty.gainGold(parseInt(value));
};

Scene_Debug.prototype.gold0 = function() {
    this._quickWindow.activate();
    SoundManager.playShop();
    $gameParty._gold = 0;
};

Scene_Debug.prototype.lvup1 = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      var level = actor.level + 1;
      actor.changeLevel(level, false);
      actor.recoverAll();
    }
};

Scene_Debug.prototype.lvup10 = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      var level = actor.level + 10;
      actor.changeLevel(level, false);
      actor.recoverAll();
    }
};

Scene_Debug.prototype.lvupMax = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.changeLevel(actor.maxLevel(), false);
      actor.recoverAll();
    }
};

Scene_Debug.prototype.lvdn1 = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      var level = actor.level - 1;
      actor.changeLevel(level, false);
      actor.recoverAll();
    }
};

Scene_Debug.prototype.lvdn10 = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      var level = actor.level - 10;
      actor.changeLevel(level, false);
      actor.recoverAll();
    }
};

Scene_Debug.prototype.lvdnto1 = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.changeLevel(1, false);
      actor.recoverAll();
    }
};

Scene_Debug.prototype.jpPlus100 = function() {
    this._quickWindow.activate();
    SoundManager.playRecovery();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.gainJp(100);
    }
};

Scene_Debug.prototype.jpPlus1000 = function() {
    this._quickWindow.activate();
    SoundManager.playRecovery();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.gainJp(1000);
    }
};

Scene_Debug.prototype.jpMax = function() {
    this._quickWindow.activate();
    SoundManager.playRecovery();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      var value = Yanfly.Param.JpMax > 0 ? Yanfly.Param.JpMax : 9999999999;
      actor.setJp(value);
    }
};

Scene_Debug.prototype.jpMin100 = function() {
    this._quickWindow.activate();
    SoundManager.playRecovery();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.loseJp(100);
    }
};

Scene_Debug.prototype.jpMin1000 = function() {
    this._quickWindow.activate();
    SoundManager.playRecovery();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.loseJp(1000);
    }
};

Scene_Debug.prototype.jpZero = function() {
    this._quickWindow.activate();
    SoundManager.playRecovery();
    for (a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      actor.setJp(0);
    }
};

Scene_Debug.prototype.unlockAllClasses = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (var i = 0; i < $dataClasses.length; ++i) {
      var cl = i;
      if (cl) $gameParty.unlockClass(cl);
    }
};

Scene_Debug.prototype.unlockTpModes = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (var i = 0; i < $gameParty.members().length; ++i) {
      var member = $gameParty.members()[i];
      if (member) member.unlockAllTpModes();
    }
};

Scene_Debug.prototype.removeTpModes = function() {
    this._quickWindow.activate();
    SoundManager.playUseSkill();
    for (var i = 0; i < $gameParty.members().length; ++i) {
      var member = $gameParty.members()[i];
      if (member) member.removeAllTpModes();
    }
};

Scene_Debug.prototype.cmdSwitch = function() {
    this.hideWindows();
    this.createSwitchkWindow();
    this._switchWindow.show();
    this._switchWindow.activate();
};

Scene_Debug.prototype.createSwitchkWindow = function() {
  if (this._switchWindow) return;
  this._switchWindow = new Window_DebugSwitch(this._dummyWindow);
  this.addWindow(this._switchWindow);
  this._switchWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
  this._switchWindow.setHandler('toggleSwitch', this.toggleSwitch.bind(this));
};

Scene_Debug.prototype.toggleSwitch = function() {
    this._switchWindow.activate();
    var switchId = this._switchWindow.currentExt();
    var index = this._switchWindow.index();
    $gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
    this._switchWindow.clearItem(index);
    this._switchWindow.drawItem(index);
};

Scene_Debug.prototype.cmdVariable = function() {
    this.hideWindows();
    this.createVariableWindow();
    this._varWindow.show();
    this._varWindow.activate();
};

Scene_Debug.prototype.createVariableWindow = function() {
  if (this._varWindow) return;
  this._varWindow = new Window_DebugVariable(this._dummyWindow);
  this.addWindow(this._varWindow);
  this._varWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
  this._varWindow.setHandler('setVar', this.setVar.bind(this));
};

Scene_Debug.prototype.setVar = function() {
  this._varWindow.activate();
  var varId = this._varWindow.currentExt();
  var varName = $dataSystem.variables[varId];
  if (varName === '') varName = Yanfly.Debug.Unnamed;
  var text = Yanfly.Debug.InputValue.format(varId, varName);
  var curVal = $gameVariables.value(varId);
  var value = prompt(text, curVal);
  window.focus();
  Input.clear();
  TouchInput.clear();
  if (/^\d+$/.test(value)) value = parseInt(value);
  $gameVariables.setValue(varId, value);
  var index = this._varWindow.index();
  this._varWindow.clearItem(index);
  this._varWindow.drawItem(index);
};

Scene_Debug.prototype.cmdTeleport = function() {
    this.hideWindows();
    this.createTeleportWindow();
    this._teleportWindow.show();
    this._teleportWindow.activate();
};

Scene_Debug.prototype.createTeleportWindow = function() {
  if (this._teleportWindow) return;
  this._teleportWindow = new Window_DebugTeleport(this._dummyWindow);
  this.addWindow(this._teleportWindow);
  this._teleportWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
  this._teleportWindow.setHandler('teleport', this.setTeleport.bind(this));
};

Scene_Debug.prototype.setTeleport = function() {
    var mapId = this._teleportWindow.currentExt();
    SoundManager.playMagicEvasion();
    $gameTemp._preDebugTeleportX = $gamePlayer.x;
    $gameTemp._preDebugTeleportY = $gamePlayer.y;
    $gameTemp._preDebugTeleportMap = $gameMap.mapId();
    $gamePlayer.reserveTransfer(mapId, 0, 0, 2, 0);
    SceneManager.push(Scene_MapTeleport);
};

Scene_Debug.prototype.cmdBattle = function() {
    this.hideWindows();
    this.createBattletWindow();
    this._battleWindow.show();
    this._battleWindow.activate();
};

Scene_Debug.prototype.createBattletWindow = function() {
  if (this._battleWindow) return;
  this._battleWindow = new Window_DebugBattle(this._dummyWindow);
  this.addWindow(this._battleWindow);
  this._battleWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
  this._battleWindow.setHandler('battle', this.startBattle.bind(this));
};

Scene_Debug.prototype.startBattle = function() {
    var troopId = this._battleWindow.currentExt();
    SoundManager.playBattleStart();
    BattleManager.setup(troopId, true, true);
    $gamePlayer.makeEncounterCount();
    SceneManager.push(Scene_Battle);
};

Scene_Debug.prototype.cmdEvent = function() {
    this.hideWindows();
    this.createEventWindow();
    this._eventWindow.show();
    this._eventWindow.activate();
};

Scene_Debug.prototype.createEventWindow = function() {
  if (this._eventWindow) return;
  this._eventWindow = new Window_DebugEvent(this._dummyWindow);
  this.addWindow(this._eventWindow);
  this._eventWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
  this._eventWindow.setHandler('playEvent', this.playCommonEvent.bind(this));
};

Scene_Debug.prototype.playCommonEvent = function() {
  var eventId = this._eventWindow.currentExt();
  $gameTemp.reserveCommonEvent(eventId);
  this.returnToMap();
};

Scene_Debug.prototype.cmdEnemies = function() {
    this.hideWindows();
    this.createEnemyWindow();
    this._enemyWindow.show();
    this._enemyWindow.activate();
};

Scene_Debug.prototype.createEnemyWindow = function() {
  if (this._enemyWindow) return;
  this._enemyWindow = new Window_DebugEnemy(this._dummyWindow);
  this.addWindow(this._enemyWindow);
  this._enemyWindow.setHandler('cancel', this.selectCmdWindow.bind(this));
  this._enemyWindow.setHandler('selectEnemy', this.selectEnemy.bind(this));
};

Scene_Debug.prototype.selectEnemy = function() {
    var index = this._enemyWindow.index();
    this._enemy = $gameTroop.members()[index];
    this.hideWindows();
    this.createEnemySelectWindow();
    this._enemySelectWindow.setEnemy(this._enemy);
};

Scene_Debug.prototype.createEnemySelectWindow = function() {
    if (this._enemySelectWindow) return;
    this._enemySelectWindow = new Window_DebugEnemySelect(this._dummyWindow,
      this._enemy);
    this.addWindow(this._enemySelectWindow);
    this._enemySelectWindow.setHandler('cancel',
      this.cancelEnemySelect.bind(this));
    this._enemySelectWindow.setHandler('enemyHp', this.setEnemyHp.bind(this));
    this._enemySelectWindow.setHandler('enemyMp', this.setEnemyMp.bind(this));
    this._enemySelectWindow.setHandler('enemyTp', this.setEnemyTp.bind(this));
    this._enemySelectWindow.setHandler('enemyParam', this.setEnPar.bind(this));
};

Scene_Debug.prototype.cancelEnemySelect = function() {
    this.hideWindows();
    this._enemyWindow.show();
    this._enemyWindow.activate();
};

Scene_Debug.prototype.setEnemyHp = function() {
  this._enemySelectWindow.activate();
  var text = 'Change ' + this._enemy.name() + '\'s ' + TextManager.hp + ' to';
  var curVal = this._enemy.hp;
  var value = prompt(text, curVal);
  window.focus();
  Input.clear();
  TouchInput.clear();
  if (/^\d+$/.test(value)) value = parseInt(value);
  if (value === null) value = this._enemy.hp;
  this._enemy.setHp(value);
  this._enemy.clearResult();
  this._enemySelectWindow.refresh();
};

Scene_Debug.prototype.setEnemyMp = function() {
  this._enemySelectWindow.activate();
  var text = 'Change ' + this._enemy.name() + '\'s ' + TextManager.mp + ' to';
  var curVal = this._enemy.mp;
  var value = prompt(text, curVal);
  window.focus();
  Input.clear();
  TouchInput.clear();
  if (/^\d+$/.test(value)) value = parseInt(value);
  if (value === null) value = this._enemy.mp;
  this._enemy.setMp(value);
  this._enemy.clearResult();
  this._enemySelectWindow.refresh();
};

Scene_Debug.prototype.setEnemyTp = function() {
  this._enemySelectWindow.activate();
  var text = 'Change ' + this._enemy.name() + '\'s ' + TextManager.tp + ' to';
  var curVal = this._enemy.tp;
  var value = prompt(text, curVal);
  window.focus();
  Input.clear();
  TouchInput.clear();
  if (/^\d+$/.test(value)) value = parseInt(value);
  if (value === null) value = this._enemy.tp;
  this._enemy.setTp(value);
  this._enemy.clearResult();
  this._enemySelectWindow.refresh();
};

Scene_Debug.prototype.setEnPar = function() {
  this._enemySelectWindow.activate();
  var n = this._enemySelectWindow.currentExt();
  var param = TextManager.param(n);
  var text = 'Change ' + this._enemy.name() + '\'s ' + param + ' to';
  var curVal = this._enemy.param(n);
  var value = prompt(text, curVal);
  window.focus();
  Input.clear();
  TouchInput.clear();
  if (/^\d+$/.test(value)) value = parseInt(value);
  if (value === null) value = this._enemy.param(n);
  this._enemy.addParam(n, value - this._enemy.param(n));
  this._enemy.clearResult();
  this._enemySelectWindow.refresh();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
};
