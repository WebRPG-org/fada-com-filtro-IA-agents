// ----------------------------------------------------------------------------------------
// SOUL_MV Battle Engine Lotus
// Author: Soulpour777 - soulxregalia.wordpress.com
// ----------------------------------------------------------------------------------------
/*:
* @plugindesc v1.0 Battle Engine Lotus - An interactive front view battle system.
* @author Soulpour777 - soulxregalia.wordpress.com
*
* @param -- MASTER CONFIG --
* 
* @param Request Motion
* @desc Would you like to use Sprite Motion when you are in battle?
* @default false
* 
* @param Draw Gauges
* @desc Would you like to draw the gauges for your HP, MP and TP?
* @default true
*
* @param -- SPRITE SCALING --
*  
* @param Scale X
* @desc Width Scale of the actor battlers.
* @default 2.5
*  
* @param Scale Y
* @desc Height Scale of the actor battlers.
* @default 2.5
*
* @param -- SPRITES --
*
* @param Entry Easing Motion
* @desc Easing motion value when you enter the battle. (Entry Movement) 
* @default 0
*
* @param Index Position
* @desc This is the indention value for the sprites when shown in battle. (Left Margin)
* @default 60
*
* @param Margin Division
* @desc The division of margining for the actor sprites. 816 width / 4 (since 4 actors).
* @default 204
*
* @param Sprite Y
* @desc Y axis of the actor sprite / battlers shown during battle.
* @default 600
*
* @param -- PARTY COMMAND --
* 
* @param Party Visible Rows
* @desc How many visible rows (contents) can be seen for the party command?
* @default 4
* 
* @param Party Max Columns
* @desc How many columns of contents can be used for the party command?
* @default 2
* 
* @param Party Command X
* @desc X axis of your party command.
* @default 0
* 
* @param Party Command Y
* @desc Y axis of your party command.
* @default 0
* 
* @param Party Command Width
* @desc Width of your party command.
* @default 816
* 
* @param Party Command Height
* @desc Height of your party command.
* @default 80
*
* @param -- BATTLE STATUS --
* 
* @param Battle Status Width
* @desc Width of your battle status window.
* @default 816
* 
* @param Battle Status Opacity
* @desc Opacity of your battle status window.
* @default 255
* 
* @param Battle Status Columns
* @desc Max columns of your battle status window. (Shows Content Row)
* @default 4
*
* @param -- ACTOR COMMAND --
* 
* @param Actor Command X
* @desc X axis of your actor command.
* @default 0
* 
* @param Actor Command Y
* @desc Y axis of your actor command.
* @default 258
*
* @param -- ENEMY WINDOW --
* 
* @param Enemy Window X
* @desc X axis of your Enemy Window.
* @default 0
* 
* @param Enemy Window Y
* @desc Y axis of your Enemy Window.
* @default 0
* 
* @param Enemy Window Width
* @desc Width of your Enemy Window.
* @default 816
* 
* @param Enemy Window Height
* @desc Height of your Enemy Window.
* @default 125
*
* @help

SOUL_MV – BATTLE ENGINE LOTUS
Author: Soulpour777 – soulxregalia.wordpress.com

FOREWORD

This is a manual how to install, configure and use the Battle Engine Lotus for RPG Maker MV. 
If by any means the manual is lacking for any information, please give your messages on my 
website's contact page.

I. Installation

1. Place the js file under the js / plugins folder. Do not rename the file or else everything 
under the plugin will not work.
2. Place all needed sprites under the img / sv_actors folder. If you are using the 
sprites, make sure that you label them with the _be suffix, or else it would not work. It 
follows whatever sideview battler you are using.
3. On the Plugin Manager, set the proper configuration that would fit your style. Each of the 
plugin commands are set to create / emulate the style possible that the engine provides.

II. Configuration

To start working with the Battle Engine Lotus, you will have to make sure that you are using the
Front View Battle System.

When you are going to use the Sideview Battle, what happens is, it rearranges all the sprites in 
its original position. This Battle Engine changes your Front View Battle only.

First, what does the Request Motion mean? The Request Motion has only two parameter values,
either true or false. What it does is it allows you to use Sprite Motions like the usual Sideview
Battle Sprites.

When false, the battler is static. It doesn't move or create new motion from the spritesheet.
When true, the battler is animated. It will move and show different spritesheet action just like the

SV_Battlers. Make sure that you are using a 9 x 6 spritesheet. It doesn't matter what size.
Where do you actually get the motion for your sprites? It is still based on the SV Actors.

It includes the motion for the following:
• walk
• wait
• chant
• guard
• damage
• evade
• thrust
• swing
• missile
• skill
• spell
• item
• escape
• victory
• dying
• abnormal
• sleep
• dead

Each SV Actor used for the Battle Engine Lotus is labeled with _be. So if you are using Actor1_1
for your Actor 1's SV Battler (during sideview), you must name your Battle Engine SV Battler as
Actor1_1_be. You must inline all animation of the same format or else they won't work.

I included a PSD Template for everyone to scale their battlers properly. When I was developing the
engine, I had to rescale the battlers everytime so they won't have unnecessary movements during
motion. That also inspired me to just make a motion to each of them and request the motion
through the plugin command.

If you are not using the Phantasy Star Style, I advice that the following Plugin Manager values 
are set to the following:

Scale X is 1.
Scale Y is 1.
Sprite Y is 600.

Returning the scale of x and y to 1 means that you would not resize them. But if you feel that your sprites 
are small, please feel free to change them. Decimal numbers are accepted.

If you are using the Phantasy Star Style, I advice that the following Plugin Manager 
values are set to the following:

Request Motion is true. This is requried if you want all the battlers to move. Please scale 
them properly, or else you'll see different unnecessary movements on your battlers.
Scale X and Scaly Y is 2.5.
Sprite Y is 630.

Here are some of the things you need to consider:
1. Scaling your battlers should be proportional. If they are not sized and scaled properly 
from the PSD template, each movement would look weird and clunky.
2. Make sure that you use the same size scaling from the PSD document, or else, each 
movement would be different looking.

III. Plugin Manager Commands

Entry Easing Motion – This is the movement done when you enter the battle. In the original SV
Battle, when you go to battle, the battlers move to the left and stop. I included that function and the
ability to not use it depending on the value of the entry easing motion.

Index Position – This is the margin value for the very first sprite. This starts on the left side, so the
more indention you place, the more the battlers would have a left margin.

Margin Division – This deals with the division of the battlers when shown on the screen. When
you have two to four battlers on the screen, they get cluttered without a margin. This margin then
allows them to be inlined in the battle status as well. If you are using 816 x 624 screen, you can
divide it by 4 (since you have maximum of 4 actors / battlers during battle by default). You will get
204. It is also the division used when the Actor Commands are shown.

Sprite Y – The Y axis of the sprite. All sprites follow the said axis.
Everything beyond this point is explainable for the Battle Engine's Plugin Manager values.

Scale X and Scale Y – This is the resize value for your sprite. If you feel 
that your sprites are not that big, you can scale them to make them bigger. 
If you placed each as 1, it means they keep their original size. If you make 
it higher than 1, then it scales it bigger. You can use decimal values 
such as 1.5, 2.5, 2.7, etc. 



*/
(function(){
	var SOUL_MV = SOUL_MV || {};
	SOUL_MV.BattleEngine = SOUL_MV.BattleEngine || {};
	// Scaling
	SOUL_MV.BattleEngine.scaleX = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Scale X'] || 2.5);
	SOUL_MV.BattleEngine.scaleY = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Scale Y'] || 2.5);	
	// Request Motion?
	SOUL_MV.BattleEngine.requestMotion = PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Request Motion'] === 'true' ? true : false;
	SOUL_MV.BattleEngine.drawGauges = PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Draw Gauges'] === 'true' ? true : false;
	// Easing Motion
	SOUL_MV.BattleEngine.easingMotion = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Entry Easing Motion'] || 150);
	// Sprites
	SOUL_MV.BattleEngine.indexPos = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Index Position'] || 60);
	SOUL_MV.BattleEngine.spriteY = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Sprite Y'] || 600);
	SOUL_MV.BattleEngine.margin = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Margin Division'] || 204);
	// Window Party Command Config
	SOUL_MV.BattleEngine.partyVisibleRows = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Party Visible Rows'] || 4);
	SOUL_MV.BattleEngine.partyMaxColumns = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Party Max Columns'] || 2);
	SOUL_MV.BattleEngine.partyCommandX = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Party Command X'] || 0);
	SOUL_MV.BattleEngine.partyCommandY = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Party Command Y'] || 0);
	SOUL_MV.BattleEngine.partyCommandWidth = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Party Command Width'] || 816);
	SOUL_MV.BattleEngine.partyCommandHeight = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Party Command Height'] || 80);
	// Battle Status Config
	SOUL_MV.BattleEngine.battleStatusWidth = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Battle Status Width'] || 816);
	SOUL_MV.BattleEngine.battleStatusOpacity = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Battle Status Opacity'] || 255);
	SOUL_MV.BattleEngine.battleStatusMaxColumns = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Battle Status Columns'] || 4);
	// Actor Command
	SOUL_MV.BattleEngine.actorCommandX = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Actor Command X'] || 0);
	SOUL_MV.BattleEngine.actorCommandY = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Actor Command Y'] || 258);
	// Enemy Window
	SOUL_MV.BattleEngine.enemyWindowX = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Enemy Window X'] || 0);
	SOUL_MV.BattleEngine.enemyWindowY = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Enemy Window Y'] || 0);
	SOUL_MV.BattleEngine.enemyWindowWidth = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Enemy Window Width'] || 816);
	SOUL_MV.BattleEngine.enemyWindowHeight = Number(PluginManager.parameters('SOUL_MV Battle Engine Lotus')['Enemy Window Height'] || 125);

	// Party Command
	Window_PartyCommand.prototype.numVisibleRows = function() {
		if ($gameSystem.useSoulBattleEngine) {
			return SOUL_MV.BattleEngine.partyVisibleRows;
		} else {
			return 4;
		}
	    
	};
	Window_PartyCommand.prototype.maxCols = function() {
		if ($gameSystem.useSoulBattleEngine) {
			return SOUL_MV.BattleEngine.partyMaxColumns;
		} else {
			return 1;
		}
	    
	};

	Window_PartyCommand.prototype.itemTextAlign = function() {
		if ($gameSystem.useSoulBattleEngine) {
			return 'center';
		} else {
			return 'left';
		}
	    
	};

	Scene_Battle.prototype.createPartyCommandWindow = function() {
		if ($gameSystem.useSoulBattleEngine) {
		    this._partyCommandWindow = new Window_PartyCommand();
		    this._partyCommandWindow.width = SOUL_MV.BattleEngine.partyCommandWidth;
		    this._partyCommandWindow.height = SOUL_MV.BattleEngine.partyCommandHeight;
		    this._partyCommandWindow.x = SOUL_MV.BattleEngine.partyCommandX;
		    this._partyCommandWindow.y = SOUL_MV.BattleEngine.partyCommandY;
		    this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
		    this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
		    this._partyCommandWindow.deselect();
		    this.addChild(this._partyCommandWindow);
		} else {
		    this._partyCommandWindow = new Window_PartyCommand();
		    this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
		    this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
		    this._partyCommandWindow.deselect();
		    this.addWindow(this._partyCommandWindow);
		}

	};

	// Battle Status
	Window_BattleStatus.prototype.windowWidth = function() {
		if ($gameSystem.useSoulBattleEngine) {
			return SOUL_MV.BattleEngine.battleStatusWidth;
		} else {
			return Graphics.boxWidth - 192;
		}
	    
	};	

	Scene_Battle.prototype.createStatusWindow = function() {
		if ($gameSystem.useSoulBattleEngine) {
		    this._statusWindow = new Window_BattleStatus();
		    this._statusWindow.opacity = SOUL_MV.BattleEngine.battleStatusOpacity;
		    this.addChild(this._statusWindow);
		} else {
		    this._statusWindow = new Window_BattleStatus();
		    this.addWindow(this._statusWindow);
		}

	};	
	Window_BattleStatus.prototype.maxCols = function() {
		if ($gameSystem.useSoulBattleEngine) {
			return SOUL_MV.BattleEngine.battleStatusMaxColumns;
		} else {
			return 1;
		}
		
	}

	Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
		if ($gameSystem.useSoulBattleEngine) {
		    this.drawActorHp(actor, rect.x + 156, rect.y + 30, 108);
		    this.drawActorMp(actor, rect.x + 156, rect.y + 60, 108);
		    this.drawActorTp(actor, rect.x + 156, rect.y + 90, 108);
		} else {
		    this.drawActorHp(actor, rect.x + 0, rect.y, 108);
		    this.drawActorMp(actor, rect.x + 123, rect.y, 96);
		    this.drawActorTp(actor, rect.x + 234, rect.y, 96);
		}

	};

	Window_BattleStatus.prototype.drawActorHp = function(actor, x, y, width) {
		if ($gameSystem.useSoulBattleEngine) {
		    width = width || 186;
		    var color1 = this.hpGaugeColor1();
		    var color2 = this.hpGaugeColor2();
		    if(SOUL_MV.BattleEngine.drawGauges)this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
		    this.changeTextColor(this.systemColor());
		    this.drawText(TextManager.hpA, x, y, 44);
		    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
		                           this.hpColor(actor), this.normalColor());
		} else {
		    width = width || 186;
		    var color1 = this.hpGaugeColor1();
		    var color2 = this.hpGaugeColor2();
		    if(SOUL_MV.BattleEngine.drawGauges)this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
		    this.changeTextColor(this.systemColor());
		    this.drawText(TextManager.hpA, x, y, 44);
		    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
		                           this.hpColor(actor), this.normalColor());
		}

	};

	Window_BattleStatus.prototype.drawActorMp = function(actor, x, y, width) {
		if ($gameSystem.useSoulBattleEngine) {
		    width = width || 186;
		    var color1 = this.mpGaugeColor1();
		    var color2 = this.mpGaugeColor2();
		    if(SOUL_MV.BattleEngine.drawGauges)this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
		    this.changeTextColor(this.systemColor());
		    this.drawText(TextManager.mpA, x, y, 44);
		    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
		                           this.mpColor(actor), this.normalColor());
		} else {
		    width = width || 186;
		    var color1 = this.mpGaugeColor1();
		    var color2 = this.mpGaugeColor2();
		    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
		    this.changeTextColor(this.systemColor());
		    this.drawText(TextManager.mpA, x, y, 44);
		    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
		                           this.mpColor(actor), this.normalColor());
		}

	};

	Window_BattleStatus.prototype.windowHeight = function() {
		if ($gameSystem.useSoulBattleEngine) {
			return this.fittingHeight(this.numVisibleRows()) + 10;
		} else {
			return this.fittingHeight(this.numVisibleRows());
		}
	    
	};

	Window_BattleStatus.prototype.drawActorTp = function(actor, x, y, width) {
		if ($gameSystem.useSoulBattleEngine) {
		    width = width || 96;
		    var color1 = this.tpGaugeColor1();
		    var color2 = this.tpGaugeColor2();
		    if(SOUL_MV.BattleEngine.drawGauges)this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
		    this.changeTextColor(this.systemColor());
		    this.drawText(TextManager.tpA, x, y, 44);
		    this.changeTextColor(this.tpColor(actor));
		    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
		} else {
		    width = width || 96;
		    var color1 = this.tpGaugeColor1();
		    var color2 = this.tpGaugeColor2();
		    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
		    this.changeTextColor(this.systemColor());
		    this.drawText(TextManager.tpA, x, y, 44);
		    this.changeTextColor(this.tpColor(actor));
		    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
		}

	};

	Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
		if ($gameSystem.useSoulBattleEngine) {
		    this.drawActorName(actor, rect.x + 0, rect.y, 150);
		    this.drawActorIcons(actor, rect.x + 0, 120, 156);
		} else {
		    this.drawActorName(actor, rect.x + 0, rect.y, 150);
		    this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
		}

	};		

	// Window Actor Command Selection
	Scene_Battle.prototype.startActorCommandSelection = function() {
		if ($gameSystem.useSoulBattleEngine) { 
		    this._statusWindow.select(BattleManager.actor().index());
		    this._partyCommandWindow.close();
		    this._actorCommandWindow.setup(BattleManager.actor());
		    this._actorCommandWindow.x = this._phaseCommand * 204;
		} else {
		    this._statusWindow.select(BattleManager.actor().index());
		    this._partyCommandWindow.close();
		    this._actorCommandWindow.setup(BattleManager.actor());
		}

	    
	};

	Scene_Battle.prototype.initialize = function() {
	    Scene_Base.prototype.initialize.call(this);
	    this._phaseCommand = 0;
	};

	Scene_Battle.prototype.createActorCommandWindow = function() {
		if ($gameSystem.useSoulBattleEngine) {
		    this._actorCommandWindow = new Window_ActorCommand();
		    this._actorCommandWindow.x = SOUL_MV.BattleEngine.actorCommandX;
		    this._actorCommandWindow.y = SOUL_MV.BattleEngine.actorCommandY;
		    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
		    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
		    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
		    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
		    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
		    this.addChildAt(this._actorCommandWindow, 1);
		} else {
		    this._actorCommandWindow = new Window_ActorCommand();
		    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
		    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
		    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
		    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
		    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
		    this.addWindow(this._actorCommandWindow);
		}

	};



	Scene_Battle.prototype.selectPreviousCommand = function() {
		this._phaseCommand-=2;
		console.log(this._phaseCommand);
	    BattleManager.selectPreviousCommand();
	    this.changeInputWindow();
	};

	Scene_Battle.prototype.changeInputWindow = function() {
		if ($gameSystem.useSoulBattleEngine) {
		    if (BattleManager.isInputting()) {
		        if (BattleManager.actor()) {
		            this.startActorCommandSelection();
		            this._phaseCommand++;
		        } else {
		            this.startPartyCommandSelection();
		            this._phaseCommand = 0;
		        }
		        
		    } else {
		        this.endCommandSelection();
		    }
		} else {
		    if (BattleManager.isInputting()) {
		        if (BattleManager.actor()) {
		            this.startActorCommandSelection();
		        } else {
		            this.startPartyCommandSelection();
		        }
		    } else {
		        this.endCommandSelection();
		    }
		}

	};
	// Update Window Positions
	Scene_Battle.prototype.updateWindowPositions = function() {
		if ($gameSystem.useSoulBattleEngine) {
			this._statusWindow.x = 0;
		} else {
		    var statusX = 0;
		    if (BattleManager.isInputting()) {
		        statusX = this._partyCommandWindow.width;
		    } else {
		        statusX = this._partyCommandWindow.width / 2;
		    }
		    if (this._statusWindow.x < statusX) {
		        this._statusWindow.x += 16;
		        if (this._statusWindow.x > statusX) {
		            this._statusWindow.x = statusX;
		        }
		    }
		    if (this._statusWindow.x > statusX) {
		        this._statusWindow.x -= 16;
		        if (this._statusWindow.x < statusX) {
		            this._statusWindow.x = statusX;
		        }
		    }
		}
	    

	};	

	Scene_Battle.prototype.createEnemyWindow = function() {
		if ($gameSystem.useSoulBattleEngine) {
		    this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
		    this._enemyWindow.y = SOUL_MV.BattleEngine.enemyWindowY;
		    this._enemyWindow.x = SOUL_MV.BattleEngine.enemyWindowX;
		    this._enemyWindow.width = SOUL_MV.BattleEngine.enemyWindowWidth;
		    this._enemyWindow.height = SOUL_MV.BattleEngine.enemyWindowHeight;
		    this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
		    this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
		    this.addChild(this._enemyWindow);	
		} else {
		    this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
		    this._enemyWindow.x = Graphics.boxWidth - this._enemyWindow.width;
		    this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
		    this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
		    this.addWindow(this._enemyWindow);
		}

	};	

	// Dismiss Opening Message
	BattleManager.startBattle = function() {
	    this._phase = 'start';
	    $gameSystem.onBattleStart();
	    $gameParty.onBattleStart();
	    $gameTroop.onBattleStart();
	    if (!$gameSystem.useSoulBattleEngine)this.displayStartMessages();
	};

	Sprite_Actor.prototype.updateMain = function() {
	    Sprite_Battler.prototype.updateMain.call(this);
	    if (this._actor.isSpriteVisible() && !this.isMoving()) {
	        this.updateTargetPosition();
	    }
	};

	SOUL_MV.BattleEngine._systemInitialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		SOUL_MV.BattleEngine._systemInitialize.call(this);
		this.useSoulBattleEngine = false;
	}

	Game_System.prototype.isSideView = function() {
	    return true;
	};

	Sprite_Actor.prototype.initialize = function(battler) {
	    Sprite_Battler.prototype.initialize.call(this, battler);
	    if ($dataSystem.optSideView) {
	    	$gameSystem.useSoulBattleEngine = false;
	    } else {
	    	$gameSystem.useSoulBattleEngine = true;
	    }
	    this.moveToStartPosition();
	};

	Sprite_Actor.prototype.createMainSprite = function() {
	    this._mainSprite = new Sprite_Base();
	    this._mainSprite.anchor.x = 0.5;
	    this._mainSprite.anchor.y = 1;
	    this._mainSprite.scale.x = SOUL_MV.BattleEngine.scaleX;
	    this._mainSprite.scale.y = SOUL_MV.BattleEngine.scaleY;
	    this.addChild(this._mainSprite);
	    this._effectTarget = this._mainSprite;
	};

	Sprite_Actor.prototype.initMembers = function() {
	    Sprite_Battler.prototype.initMembers.call(this);
	    this._battlerName = '';
	    this._motion = null;
	    this._motionCount = 0;
	    this._pattern = 0;
	    if (!$gameSystem.useSoulBattleEngine) {
	    	this.createShadowSprite();
	    	this.createWeaponSprite();
	    }
	    this.createMainSprite();
	    this.createStateSprite();
	};	

	Sprite_Actor.prototype.updateBitmap = function() {
	    Sprite_Battler.prototype.updateBitmap.call(this);
	    var name = this._actor.battlerName();
	    if (this._battlerName !== name) {
	        this._battlerName = name;
	        if(!$gameSystem.useSoulBattleEngine) {
	        	this._mainSprite.bitmap = ImageManager.loadSvActor(name);
	        } else {
	        	this._mainSprite.bitmap = ImageManager.loadSvActor(name+'_be');
	        }
	    }
	};

	Sprite_Actor.prototype.moveToStartPosition = function() {
		if ($gameSystem.useSoulBattleEngine) {
			this.startMove(SOUL_MV.BattleEngine.easingMotion, 0, 0);
		} else {
			this.startMove(300, 0, 0);
		}
	    
	};

	Sprite_Actor.prototype.setActorHome = function(index) {
		if ($gameSystem.useSoulBattleEngine) {
			this.setHome(SOUL_MV.BattleEngine.indexPos + index * SOUL_MV.BattleEngine.margin, SOUL_MV.BattleEngine.spriteY);
		} else {
			this.setHome(600 + index * 32, 280 + index * 48);
		}
	    
	};	

	Scene_Battle.prototype.selectActorSelection = function() {
		if ($gameSystem.useSoulBattleEngine) {
		    this._actorWindow.refresh();
		    this._actorWindow.y = 0;
		    if ($gameSystem.useSoulBattleEngine) {
		    	this._actorCommandWindow.close();
		    	this._actorWindow.y = Graphics.boxHeight;
		    }
		    this._actorWindow.show();
		    this._actorWindow.activate();
		} else {
		    this._actorWindow.refresh();
		    this._actorWindow.show();
		    this._actorWindow.activate();
		}

	};	

	Scene_Battle.prototype.onSkillCancel = function() {
	    this._skillWindow.hide();
	    this._actorCommandWindow.activate();
	    if ($gameSystem.useSoulBattleEngine) {
	    	this._actorCommandWindow.open();
	    }
	};	

	Scene_Battle.prototype.onItemCancel = function() {
	    this._itemWindow.hide();
	    this._actorCommandWindow.activate();
	    if ($gameSystem.useSoulBattleEngine) {
	    	this._actorCommandWindow.open();
	    }	    
	};	

	Sprite_Actor.prototype.update = function() {
	    Sprite_Battler.prototype.update.call(this);
	    if (!$gameSystem.useSoulBattleEngine)this.updateShadow();
	    if (this._actor) {
	        if (!$gameSystem.useSoulBattleEngine || $gameSystem.useSoulBattleEngine && SOUL_MV.BattleEngine.requestMotion)this.updateMotion();
	    }
	};

	Sprite_Actor.prototype.updateMotion = function() {
	    this.setupMotion();
	    if (!$gameSystem.useSoulBattleEngine)this.setupWeaponAnimation();
	    if (this._actor.isMotionRefreshRequested()) {
	        this.refreshMotion();
	        this._actor.clearMotion();
	    }
	    this.updateMotionCount();
	};

	Sprite_Battler.prototype.setupDamagePopup = function() {
	    if (this._battler.isDamagePopupRequested()) {
	        if (this._battler.isSpriteVisible()) {
	            var sprite = new Sprite_Damage();
	            if ($gameSystem.useSoulBattleEngine) {
		            sprite.x = this.x + this.damageOffsetX() + 10;
		            sprite.y = this.y + this.damageOffsetY() - 200;
	            } else {
		            sprite.x = this.x + this.damageOffsetX();
		            sprite.y = this.y + this.damageOffsetY();
	            }

	            sprite.setup(this._battler);
	            this._damages.push(sprite);
	            this.parent.addChild(sprite);
	        }
	        this._battler.clearDamagePopup();
	        this._battler.clearResult();
	    }
	};

	Sprite_Actor.prototype.updateTargetPosition = function() {
	    if (this._actor.isInputting() || this._actor.isActing()) {
	        if (!$gameSystem.useSoulBattleEngine)this.stepForward();
	    } else if (this._actor.canMove() && BattleManager.isEscaped()) {
	        if (!$gameSystem.useSoulBattleEngine)this.retreat();
	    } else if (!this.inHomePosition()) {
	        if (!$gameSystem.useSoulBattleEngine)this.stepBack();
	    }
	};

})();

