//=============================================================================
// LTN_BGAudioControl.js
//=============================================================================
// Version 1.0
/*:
* @plugindesc More control over the Bgm & Bgs audio.
*
* @author LTN Games
* @param --Map Options--
* @param  Auto Map Bgm
* @desc Stop all Bgm if map's bgm setting is empty. true = on / false = off
* @default true

* @param  Auto Map Bgs
* @desc Stop all Bgs if map's bgs setting is empty. true = on / false = off
*       true/false
* @default true
*
* @param --Battle Options--
*
* @param  Auto Battle Bgm
* @desc Play maps bgm as the battle bgm. Must be enabled for battle audio control.
* @default true
*
* @help

* ------------------------What does this plugin do?----------------------------
* Compatable With Yanfly Victory Aftermath
* Map Bgs ---
* I noticed that when I had one map set with a bgs enabled, that when
* transferring to another map, would still play the previous bgs from other map.
* This plugin will stop the bgs if the map you're transferring to, does not have
* an auto bgs enabled in the settings.
*
* Map Bgm ---
* I have also included the bgm to stop as well if the map your transferring to
* bgm setting is empty and not enabled.
*
* Battle Bgm ---
* You can now transfer over the bgm playing currently on the map you are on to
* play as the battle bgm.
*
* NOTE* If the maps bgs or bgm is not empty MV will proceed to resume it's
*       normal tasks and this plugin will not do anything.
*-------------------------------------------------------------------------------
* Plugin Command: BGMAPCONTROL BGS BGM
*                 BGS = True/False,   For controlling Background Sound
*                 BGM = True/False    For controlling Background Music
*         TRUE  = Continue playing bgs/bgm from previous map, on the next map
*                 if mps bgs setting is empty.
*
*         FALSE = Stop playing bgs/bgm from previous map, on next map if
*                 maps bgs setting is empty.
*
*                 BGBATTLECONTROL BGM BGS STARTSE VICTORYSE
*                 BGS = True/False, For controlling Background Sound
*                 BGM = True/False, For controlling Background Music
*                 STARTSE = True/False - For controlling the SE on battle start
*                 VICTORYSE = True//Flase - For controlling Victory SE.
*
*         TRUE  = Setting to true will stop the battle start, bgs & victory se
*                 setting bgm to true will replace battle bgm with maps bgm.
*
*         FALSE = Setting to false will continue the defualt behaviour for battle.
*
* REMEMBER ***
* All settings for battle, reset on battle end.
*
* The command BGMAPCONTROL & BGBATTLECONTROL is case sensitive so please use
* ALL CAPS.
* Anything after command is not case sensitive, so false, FALSE, & False all work.
*-------------------------------------------------------------------------------
* If you don't want the plugin to stop the bgs for certain maps, please be sure
* to use the plugin command on the transfer in to map and on the transfer back
* out.
* Battle bgm switch will automatically reset when battle has ended.
*
* BGMAPCONTROL TRUE TRUE - Should be called on the transfer into the map you want
*                          the bgs/bgm to continue playing.
*
* BGMAPCONTROL TRUE TRUE - Should be called on the transfer out the map.
*
*/
//=============================================================================
// Plugin Parameters
//=============================================================================
var LTN = LTN || {};
var AO = AO || {};
LTN.BGAudioControl = LTN.BGAudioControl || {};

(function(){
  LTN.Parameters = PluginManager.parameters('LTN_BGAudioControl');
  LTN.Params = LTN.Params || {};
  LTN.Param.autoBgm       = String(LTN.Parameters['Auto Map Bgm']).toLowerCase();
  LTN.Param.autoBgs       = String(LTN.Parameters['Auto Map Bgs']).toLowerCase();
  LTN.Param.autoBattle    = String(LTN.Parameters['Auto Battle Bgm']).toLowerCase();

  //=============================================================================
  // Global Switch Variables
  //=============================================================================
  AO.mapBgsSwitch         = 'false';
  AO.mapBgmSwitch         = 'false';
  AO.battleBgmSwitch      = 'false';
  AO.battleBgsSwitch      = 'false';
  AO.battleStartSwitch    = 'false';
  AO.victorySeSwitch      = 'false';
})();


//=============================================================================
// Game Map - For Bgs & Bgm stopping & playing
//=============================================================================
// Aliased Methods:
LTN.aobgs_oldGameMap_autoPlay = Game_Map.prototype.autoplay;
//=============================================================================
//-----------------------------------------------------------------------------
// Aliased Method: autoPlay
//-----------------------------------------------------------------------------
Game_Map.prototype.autoplay = function() {
  if (!$dataMap.autoplayBgs && LTN.Param.autoBgs === 'true') {
      this.bgsSwitch();
    } else {
      AudioManager.playBgs($dataMap.bgs);
    }
 if (!$dataMap.autoplayBgm && LTN.Param.autoBgm === 'true') {
      this.bgmSwitch();
    } else {
      AudioManager.playBgm($dataMap.bgm);
    }
};

//-----------------------------------------------------------------------------
// New Method: bgsSwitch
//-----------------------------------------------------------------------------
Game_Map.prototype.bgsSwitch = function() {
  if(AO.mapBgsSwitch === 'false'){AudioManager.stopBgs($dataMap.bgs);}
   if(AO.mapBgsSwitch === 'true') {LTN.aobgs_oldGameMap_autoPlay = Game_Map.prototype.autoplay;}
};
//-----------------------------------------------------------------------------
// New Method: bgmSwitch
//-----------------------------------------------------------------------------
Game_Map.prototype.bgmSwitch = function() {
  if(AO.mapBgmSwitch === 'false'){AudioManager.playBgm($dataMap.bgm);}
   if(AO.mapBgmSwitch === 'true') {LTN.aobgs_oldGameMap_autoPlay = Game_Map.prototype.autoplay;}
};

//=============================================================================
// Battle Manager - For Battle BGM saving & replaying
//=============================================================================
// Aliased Methods: playBattleBgm, update
LTN.aobgs_oldBattleManager_update               = BattleManager.updateBattleEnd;
LTN.aobgs_oldBattleManager_playBattleBgm        = BattleManager.playBattleBgm;
LTN.aobgs_oldBattleManager_processVictory       = BattleManager.processVictory;
//Yanfly Aliased Method For Victory Aftermath
LTN.bgsc_oldYEPBattleManager_processNormVictory = BattleManager.processNormalVictory;
//=============================================================================
//-----------------------------------------------------------------------------
// Aliased Method: update - Reset switches on battle end
//-----------------------------------------------------------------------------
BattleManager.updateBattleEnd = function() {
  LTN.aobgs_oldBattleManager_update.call(this);
    if (AO.battleBgmSwitch === 'true') {AO.battleBgmSwitch = 'false';}
    if (AO.battleBgsSwitch === 'true') {AO.battleBgsSwitch = 'false';}
    if (AO.battlestart     === 'true') {AO.battlestart     = 'false';}
    if(AO.victorySeWitch   === 'true') {AO.victorySeSwitch = 'false';}
};

//-----------------------------------------------------------------------------
// Aliased Method: playBattleBgm - Play bgm if enabled
//-----------------------------------------------------------------------------
BattleManager.playBattleBgm = function() {
  if(LTN.Param.autoBattle === 'true') {
    this.battleBgmSwitch();
    if(AO.battleBgsSwitch ==='false') AudioManager.stopBgs();
  } else {
    LTN.aobgs_oldBattleManager_playBattleBgm.call(this);
  }
};
//-----------------------------------------------------------------------------
// Aliased Method: playBattleBgm - Play bgm if enabled
//-----------------------------------------------------------------------------
BattleManager.processVictory = function() {
  if(LTN.Param.autoBattle === 'true'){
    if(AO.victorySeSwitch === 'true') {
      this.processVictoryNoSe();
    } else {
      LTN.aobgs_oldBattleManager_processVictory.call(this);
    }
  } else {
    LTN.aobgs_oldBattleManager_processVictory.call(this);
  }
};
//-----------------------------------------------------------------------------
// New Method: Process Victory Without SE + Yanfly "Vic AM" Compatability
//-----------------------------------------------------------------------------
BattleManager.processVictoryNoSe = function() {
  //YEP Victory Aftermath Compatability
  if(Imported.YEP_VictoryAftermath){
    this.oldYanflyProcessVictory();
  } else {
    //Without Victory Aftermath
    $gameParty.removeBattleStates();
    $gameParty.performVictory();
    this.makeRewards();
    this.displayVictoryMessage();
    this.displayRewards();
    this.gainRewards();
    this.endBattle(0);
  }
};
//-----------------------------------------------------------------------------
// Yandfly Method Alias - Compatability with victory aftermath
// Yanfly did not alias original method this is my work-around, this Will
// Ensure the victory aftermath opens up on battle end.
//-----------------------------------------------------------------------------
BattleManager.oldYanflyProcessVictory = function() {
  $gameParty.performVictory();
  if (this.isVictoryPhase()) return;
  $gameParty.removeBattleStates();
  this._victoryPhase = true;
  if ($gameSystem.skipVictoryAftermath()) {
    this.processSkipVictory();
  } else {
    this.processNormalVictory();
  }
};

//-----------------------------------------------------------------------------
// Yandfly Method Alias - Compatability with victory aftermath
//-----------------------------------------------------------------------------
BattleManager.processNormalVictory = function() {
  if(Imported.YEP_VictoryAftermath && AO.battleBgsSwitch === 'true') {
    this.makeRewards();
    this.startVictoryPhase();
  } else if(Imported.YEP_VictoryAftermath) {
    LTN.bgsc_oldYEPBattleManager_processNormVictory.call(this);
  }
};
//-----------------------------------------------------------------------------
// New Method: Battle Bgs Switch - Play bgm acordding to switch
//-----------------------------------------------------------------------------
BattleManager.battleBgmSwitch = function() {
  if(AO.battleBgmSwitch === 'false'){LTN.aobgs_oldBattleManager_playBattleBgm.call(this);}
  if(AO.battleBgmSwitch === 'true'){this.replayBgmAndBgs();}
};
//=============================================================================
// Scene Map -- For Battle Start Sound
//=============================================================================
LTN.aobgs_oldSceneMap_launchBattle = Scene_Map.prototype.launchBattle;
//-----------------------------------------------------------------------------
Scene_Map.prototype.launchBattle = function() {
  if( LTN.Param.autoBattle === 'true'){
    if(AO.battleStartSwitch === 'true') {
      BattleManager.saveBgmAndBgs();
      this.startEncounterEffect();
      this._mapNameWindow.hide();
    } else {
      LTN.aobgs_oldSceneMap_launchBattle.call(this);
    }
  } else {
    LTN.aobgs_oldSceneMap_launchBattle.call(this);
  }
};
//=============================================================================
// Game Interpreter
//=============================================================================
//-----------------------------------------------------------------------------
// Aliased Method: Plugin Command
LTN.aobgs_oldGameInt_pluginCommand = Game_Interpreter.prototype.pluginCommand;
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  LTN.aobgs_oldGameInt_pluginCommand.call(this, command, args); // Call Original Method
  switch (command) {
    case 'BGMAPCONTROL':
    AO.mapBgsSwitch = args[0] ? String(args[0].toLowerCase()) : 'false';
    AO.mapBgmSwitch = args[1] ? String(args[1].toLowerCase()) : 'false';
      break;
    case 'BGBATTLECONTROL':
    AO.battleBgmSwitch    = args[0] ? String(args[0].toLowerCase()) : 'false';
    AO.battleBgsSwitch    = args[1] ? String(args[1].toLowerCase()) : 'false';
    AO.battleStartSwitch  = args[2] ? String(args[2].toLowerCase()) : 'false';
    AO.victorySeSwitch    = args[3] ? String(args[3].toLowerCase()) : 'false';
    break;
  }
};
//=============================================================================
// The End, based on a true story :D
//=============================================================================
