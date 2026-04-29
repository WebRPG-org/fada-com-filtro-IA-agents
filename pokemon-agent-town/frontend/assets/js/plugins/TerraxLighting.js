//=============================================================================
// Terrax Plugins - Lighting system
// TerraxLighting.js
// Version: 1.03
//=============================================================================
//
// This script should be compatible with most other scripts, it overwrites one
// core script (Spriteset_Map.prototype.createLowerLayer) in rpg_sprites.js to
// add a new layer. 

//=============================================================================
 /*:
 * @plugindesc v1.03 Creates an extra layer that darkens a map and adds lightsources!
 * @author Terrax
 *
 * @param Player radius
 * @desc Adjust the light radius around the player                          .
 * Default: 300
 * @default 300
 *
 * @help
 * To activate the script in an area, do the following:
 * 1. Put an event switch into the map.
 * 2. In the 'Note' field (Next to the name) put the following text :
 * Light 250 #FFFFFF
 * - Light activates the script
 * - 250 is the lightradius of the object
 * - #FFFFFF is the lightcolor (white in this case)
 * 3. You're done, its that simple.
 *
 * To alter the player radius in game use the following plugin command : 
 * Light radius 200 #FFFFFF  
 * (to change the radius and the color)
 *
 * Optional: to turn on and off lightsources in the game, do the following:
 * Give the lightsource the normal def :  Light 250 #FFFFFF and an extra number 
 * so it becomes 'Light 250 #FFFFFF 1' , the 1 indicates it will turn on when
 * switch 0001 turns on, and off when it turns off.. see the demo for an example
 *
 * Released under the MIT license,
 * if used for commercial projects feel free to make a donation or 
 * better yet, give me a free version of what you have created.
 * e-mail : fox(AT)caiw.nl / terraxz2 on steam.
 * 

*/
//=============================================================================
//  ps.. if my code looks funky, i'm an old guy..
// object orientated programming bugs the hell out of me.
var testcounter = 0;


(function() {

	var oldmap = 0;
    var playercolor = '#FFFFFF';    
	var parameters = PluginManager.parameters('TerraxLighting');
    var player_radius = Number(parameters['Player radius'] || 300);	
	    
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
       
        if (command === 'Light') {
            
	        var evid = this._eventId;
	        // Light radius 100 #FFFFFF  	    
	        if (args[0] == 'radius') {
    			var newradius = Number(args[1]);
    			if (newradius > 30) {
    				player_radius = newradius;
				}
			
				if (args.length > 2) {
					playercolor = args[2];
					var isValidPlayerColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(playercolor) 	    
					if (!isValidPlayerColor) {
						playercolor = '#FFFFFF'    
					}
				}
			}   
		}  
	}
    
	Spriteset_Map.prototype.createLightmask = function() {
	    this._lightmask = new Lightmask();
	    this.addChild(this._lightmask);
	};
	
	
	function Lightmask() {
	    this.initialize.apply(this, arguments);
	}
	
	Lightmask.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	Lightmask.prototype.constructor = Lightmask;
	
	Lightmask.prototype.initialize = function() {
	    PIXI.DisplayObjectContainer.call(this);
	
	    this._width = Graphics.width;
	    this._height = Graphics.height;
	    this._sprites = [];
	    this._createBitmap();
	    
	};
	
	//Updates the Lightmask for each frame.
	
	Lightmask.prototype.update = function() {
	    this._updateMask();
	};
	
	//@method _createBitmaps
	
	Lightmask.prototype._createBitmap = function() {
	
	    this._maskBitmap = new Bitmap(2500,1500);   // one big bitmap to fill the intire screen with black
	    var canvas = this._maskBitmap.canvas;
	};
	
	/**
	 * @method _updateAllSprites
	 * @private
	 */
	Lightmask.prototype._updateMask = function() {
	
	
		// ****** DETECT MAP CHANGES ********
		var map_id = $gameMap.mapId();
		if (map_id != oldmap) {
			// remove old sprites
			for (var i = 0; i < this._sprites.length; i++) {	  // remove all old sprites
				this._removeSprite();
			}
			
					
			// are there lightsources on this map?
			for (var i = 0; i < $dataMap.events.length; i++) {
	        	if ($dataMap.events[i]) {
	            	var note = $dataMap.events[i].note
	            	var note_args = note.split(" ");
	    			var note_command = note_args.shift();
	            	if (note_command == "Light" || note_command == "light") {
			
						this._addSprite(0,0,this._maskBitmap); // yes.. then turn off the lights
						break;
					}
				}
			}
			
			
		}	
		
	    // ****** PLAYER LIGHTGLOBE ********
	
	    var canvas = this._maskBitmap.canvas;
	   	var ctx = canvas.getContext("2d");
	    this._maskBitmap.fillRect(0, 0, 2500, 1500, 'black');
	  
		//ctx.globalCompositeOperation = 'lighten';
		ctx.globalCompositeOperation = 'lighter';
		
		var pw = $gameMap.tileWidth()
	    var ph = $gameMap.tileHeight();
		var dx = $gameMap.displayX();
		var dy = $gameMap.displayY();
		var px = $gamePlayer._realX;
		var py = $gamePlayer._realY;	
		
		var x1 = (pw/2)+( (px-dx)*pw);
		var y1 = (ph/2)+( (py-dy)*ph);
	    var paralax = false;
		// paralax does something weird with coordinates.. recalc needed
		if (dx>$gamePlayer.x) {
			var xjump = $gameMap.width() - Math.floor(dx-px);  
			x1 = (pw/2)+(xjump*pw);
		} 
		if (dy>$gamePlayer.y) {
			var yjump = $gameMap.height() - Math.floor(dy-py);
			y1 = (ph/2)+(yjump*ph);
		}
		if (player_radius < 100){
			this._maskBitmap.radialgradientFillRect(x1,y1, 20, player_radius, '#999999', 'black'); 
		} else { 	
			this._maskBitmap.radialgradientFillRect(x1,y1, 20, player_radius, playercolor, 'black'); 
		}
		// ********** OTHER LIGHTSOURCES **************
		
		for (var i = 0; i < $dataMap.events.length; i++) {
	        if ($dataMap.events[i]) {
	            var note = $dataMap.events[i].note
	            var note_args = note.split(" ");
	    		var note_command = note_args.shift();
	            if (note_command == "Light" || note_command == "light") {
		        	var light_radius = note_args.shift();
		        	
		        	
		        	// light radius
		        	if (light_radius > 0) {
			        	
			        	// light color
			        	var colorvalue = note_args.shift();
			        	var isValidColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorvalue) 	    
			            if (!isValidColor) {
				        	colorvalue = '#FFFFFF'    
			            }
			            
			            // lights on/off
			 
			        	var lightswitch = note_args.shift();
			        	if (lightswitch > 0) {

				            var lighton = $gameSwitches.value(lightswitch);
				            if (lighton == false) {
					            light_radius = 0;
			        		}  
					    } 
			        	
			        	
			            if (light_radius > 0) {
			        				        	
				            var lpx = $dataMap.events[i].x;
				            var lpy = $dataMap.events[i].y;
				            var lx1 = (pw/2)+( (lpx-dx)*pw);
							var ly1 = (ph/2)+( (lpy-dy)*ph);
							// paralax does something weird with coordinates.. recalc needed
							if (dx-10>lpx) {
								var lxjump = $gameMap.width() - (dx-lpx);
								lx1 = (pw/2)+(lxjump*pw);
							} 
							if (dy-10>lpy) {
								var lyjump = $gameMap.height() -(dy-lpy);
								ly1 = (ph/2)+(lyjump*ph);
							}

				            this._maskBitmap.radialgradientFillRect(lx1,ly1, 0, light_radius , colorvalue, 'black'); 
		            	}
	            	}
	            }
	            
	        }
	    }
		
		// reset drawmode to normal
	    ctx.globalCompositeOperation =  'source-over';	    
	
	};
	
	
	/**
	 * @method _addSprite
	 * @private
	 */
	Lightmask.prototype._addSprite = function(x1,y1,selectedbitmap) {
		
	    var sprite = new Sprite(this.viewport);
	    sprite.bitmap = selectedbitmap;
	    sprite.opacity = 255;
	    sprite.blendMode = 2;
	    sprite.x = x1;
	 	sprite.y = y1;
	    this._sprites.push(sprite);
	    this.addChild(sprite);
	    sprite.rotation = 0;
	    sprite.ax = 0
	    sprite.ay = 0
	 	sprite.opacity = 255;
	};
	
	/**
	 * @method _removeSprite
	 * @private
	 */
	Lightmask.prototype._removeSprite = function() {
	    this.removeChild(this._sprites.pop());
	};
	
	// Fill gradient circle
	
	Bitmap.prototype.radialgradientFillRect = function(x1, y1, r1, r2, color1, color2) {
	    var context = this._context;
	    var grad;
	    
	    grad = context.createRadialGradient(x1, y1, r1, x1, y1, r2);
	
	    grad.addColorStop(0, color1);
	    grad.addColorStop(1, color2);
	    context.save();
	    context.fillStyle = grad;
	    context.fillRect(x1-r2, y1-r2, r2*2, r2*2);
	    context.restore();
	    this._setDirty();
	};
	
	//****
	// This function is overwritten from rpg_sprites.js
	//****

	Spriteset_Map.prototype.createLowerLayer = function() {
	    Spriteset_Base.prototype.createLowerLayer.call(this);
	    this.createParallax();
	    this.createTilemap();
	    this.createCharacters();
	    this.createShadow();
	    this.createDestination();
	    this.createLightmask();
	    this.createWeather();
	
	};
	


})();