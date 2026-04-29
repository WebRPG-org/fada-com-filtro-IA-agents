/*
 * ==============================================================================
 * ** Victor Engine MV - SFont
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.12.25 > First release.
 *  v 1.01 - 2015.12.25 > Changed basic setup for the plugin.
 *                      > Added hue and individual spacing options.
 *  v 1.02 - 2016.01.07 > Fixed issue with anti-alias on Menu Status.
 *                      > Added setup for SFont Digits.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - SFont'] = '1.02';

var VictorEngine = VictorEngine || {};
VictorEngine.SFont = VictorEngine.SFont || {};

(function() {

	VictorEngine.SFont.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.SFont.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - SFont', 'VE - Basic Module', '1.06');
	};

	VictorEngine.SFont.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.SFont.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
*------------------------------------------------------------------------------ 
 * @plugindesc v1.02 - Replace text fonts with a bitmaped font.
 * @author Victor Sant
 *
 * @param Use Only SFont
 * @desc If you call a non existent font, it use the default instead.
 * true - ON	false - OFF
 * @default false
 *
 * @param Default Whitespace
 * @desc Default ixel width for whitespaces.
 * Default: 12.
 * @default 12
 *
 * @param Title SFont
 * @desc SFont used on the game title
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Timer SFont
 * @desc SFont used on the timer
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param SFont Digits
 * @desc Sequence of valid digits used on SFonts.
 * Check the help for more information.
 * @default !"#$%&'()+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~→
 *
 * @param == System Colors ==
 *
 * @param Text Color SFont 0
 * @desc SFont used when call text color 0. Normal Color.
 * filename(, hue)(, whitespace).	Default SFont
 * @default Arial White, 12, 0
 *
 * @param Text Color SFont 1
 * @desc SFont used when call text color 1.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 2
 * @desc SFont used when call text color 2.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 3
 * @desc SFont used when call text color 3.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 4
 * @desc SFont used when call text color 4.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 5
 * @desc SFont used when call text color 5.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 6
 * @desc SFont used when call text color 6.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 7
 * @desc SFont used when call text color 7.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 8
 * @desc SFont used when call text color 8.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 9
 * @desc SFont used when call text color 9.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 10
 * @desc SFont used when call text color 10.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 11
 * @desc SFont used when call text color 11.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 12
 * @desc SFont used when call text color 12.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 13
 * @desc SFont used when call text color 13.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 14
 * @desc SFont used when call text color 14.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 15
 * @desc SFont used when call text color 15.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 16
 * @desc SFont used when call text color 16. System Color.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Blue
 *
 * @param Text Color SFont 17
 * @desc SFont used when call text color 17. Crisis Color.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Yellow
 *
 * @param Text Color SFont 18
 * @desc SFont used when call text color 18. Death Color
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Red
 *
 * @param Text Color SFont 19
 * @desc SFont used when call text color 19.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 20
 * @desc SFont used when call text color 20.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 21
 * @desc SFont used when call text color 21.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 22
 * @desc SFont used when call text color 22.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 23
 * @desc SFont used when call text color 23. MP Cost Color.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Blue
 *
 * @param Text Color SFont 24
 * @desc SFont used when call text color 24. Powerup Color.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Green
 *
 * @param Text Color SFont 25
 * @desc SFont used when call text color 25. Powerdown Color.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Gray
 *
 * @param Text Color SFont 26
 * @desc SFont used when call text color 26.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 27
 * @desc SFont used when call text color 27.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 28
 * @desc SFont used when call text color 28.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 29
 * @desc SFont used when call text color 29. TP Cost Color
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default Arial Green
 *
 * @param Text Color SFont 30
 * @desc SFont used when call text color 30.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * @param Text Color SFont 31
 * @desc SFont used when call text color 31.
 * filename(, hue)(, whitespace).	blank - use no SFont
 * @default @@
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 *  
 *  What are SFonts? (from http://rubygame.org/docs/)
 *  SFont is a type of bitmapped font, which is loaded from an image file with
 *  a meaningful top row of pixels, and the font itself below that. The top row
 *  provides information about what parts of of the lower area contains font
 *  data, and which parts are empty. The image file should contain all of the 
 *  glyphs on one row, with the colorkey color at the bottom-left pixel and the
 *  "skip" color at the top-left pixel.
 *
 * ------------------------------------------------------------------------------
 * 
 * - SFont Digits
 *	The plugin parameter 'SFont Digits' set the valid digits for SFonts. If you
 *  try to write a digit not listed on this parameter, a blank space will be
 *  displayed. To be able to draw a digit, it must be added to this setup.
 *  The SFont graphics must follow the same sequence as this setup. Otherwise
 *  the digits will not match.
 *
 * - Setup Change
 *	The setup was changed. Now you can setup the hue and whitespace for each 
 *  SFont individually. Those values are optional, so you don't need to 
 *  include them.
 *
 *  - SFonts
 *  The SFont images must be placed on the folder img/sfonts/ (you must create 
 *  this new folder).
 *  On the SFont, the first pixel on the top left corner is considered the
 *  "skip color", so, anywhere that this color appears on the first row the
 *  part will be skiped, so use it to define the limit from each glyph.
 *
 *  The SFont replaces the default fonts of the rpg maker. When a code call for
 *  the function Window_Base.prototype.changeTextColor(color), it will replace
 *  the color with a SFont if you set one for it's color code.
 *  By default, RPG Maker MV have 32 basic color based on the windowskin, if you
 *  don't set a SFont for a given color, it will use the RM normal font instead.
 *  (ou use the default SFont if you turn on the paramenter 'Use Only SFont')
 *
 *  By default the maker system use the following colors for it's text:
 *  0  - Normal Color
 *  16 - System Color 
 *  17 - Crisis Color
 *  18 - Death Color
 *  23 - MP Cost Color
 *  24 - Powerup Color
 *  25 - Powerdown Color
 *  29 - TP Cost Color
 *  Normally, the other colors are used only when called.
 *
 *  For example, if you use the code \c[5] on a message, it will call the SFont
 *  you set on the parameter 'Text Color SFont 5'.
 *
 *  To add SFonts on non-window objects that uses the drawText, you have to
 *  add it manually (requires some scripting knowledge). 
 *  You need to call bitmap.changeSFont(index). The index must be one of the
 *  values you setup on the plugin parameters and the bitmap must be a valid
 *  bitmap object. 
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
		VictorEngine.Parameters.OnlySFonts = eval(parameters["Only SFont on Windows"]);
		VictorEngine.Parameters.TitleSFont = String(parameters["Title SFont"]);
		VictorEngine.Parameters.TimerSFont = String(parameters["Timer SFont"]);
		VictorEngine.Parameters.SFontDigit = String(parameters["SFont Digits"]);
		VictorEngine.Parameters.Whitespace = Number(parameters["Default Whitespace"]);
		VictorEngine.Parameters.SFontsList = parameters;
	};
	
	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.SFont.loadParameters = VictorEngine.loadParameters;
	VictorEngine.loadParameters = function() {
		VictorEngine.SFont.loadParameters.call(this);
		VictorEngine.SFont.processParameters();
	};
	
	VictorEngine.SFont.processParameters = function() {
		this.processSFonts();
		this.processTitleSFont();
		this.processTimerSFont();
		this.processSFontDigit();
	};
	
	VictorEngine.SFont.processSFonts = function() {
		var parameter = VictorEngine.Parameters.SFontsList;
		VictorEngine.SFont._sfonts = [];
		for (var i = 0; i < 32; i++) {
			var value = String(parameter["Text Color SFont " + String(i)]);
			this.setupSFont(value, i);
		}
	};	
	
	VictorEngine.SFont.processTitleSFont = function() {
		var value = String(VictorEngine.Parameters.TitleSFont);
		this.setupSFont(value, 32);
	};	
	
	VictorEngine.SFont.processTimerSFont = function() {
		var value = String(VictorEngine.Parameters.TitleSFont);
		this.setupSFont(value, 33);
	};
	
	VictorEngine.SFont.processSFontDigit = function() {
		this._digits = VictorEngine.Parameters.SFontDigit.split("");
	};
		
	VictorEngine.SFont.setupSFont = function(value, i) {
		var regex = new RegExp('([^,\n\r]+)(?:[ ]*,[ ]*(\\d+))*','gi')
		while ((match = regex.exec(value)) !== null) {
			var name  = match[1];
			var hue   = Number(match[2]) || 0;
			var space = Number(match[3]) || VictorEngine.Parameters.Whitespace;
			VictorEngine.SFont._sfonts[i] = new SFont(name, hue, space);
		};
	};
	
	VictorEngine.SFont.digits = function() {
		return this._digits;
	};
	
	VictorEngine.SFont.defaultSFont = function() {
		return this._sfonts[0];
	};
				
	VictorEngine.SFont.getSFont = function(index) {
		if (this._sfonts[index]) {
			return this._sfonts[index];
		} else if (VictorEngine.Parameters.OnlySFonts) {
			return this.defaultSFont();
		} else {
			return null;
		}
	};
	
	//=============================================================================
	// ImageManager
	//=============================================================================
	
	ImageManager.loadSFont = function(filename, hue) {
		return this.loadBitmap('img/sfonts/', filename, hue, true);
	};
	
	//=============================================================================
	// Bitmap
	//=============================================================================

	Object.defineProperty(Bitmap.prototype, 'sfont', {
		get: function() {
			return this._sfont;
		},
		set: function(sfont) {
			if (sfont instanceof SFont) {
				this._sfont = sfont;
			} else if (VictorEngine.Parameters.OnlySFonts) {
				this._sfont = VictorEngine.SFont.defaultSFont();
			} else {
				this._sfont = null;
			}
		},
		configurable: true
	});
	
	VictorEngine.SFont.drawText = Bitmap.prototype.drawText;
	Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
		if (this.sfont) {
			this.drawSFontText(text, x, y, maxWidth, lineHeight, align)
		} else {
			VictorEngine.SFont.drawText.call(this, text, x, y, maxWidth, lineHeight, align);
		}
	};
	
	VictorEngine.SFont.measureTextWidth = Bitmap.prototype.measureTextWidth;
	Bitmap.prototype.measureTextWidth = function(text) {
		if (this.sfont) {
			return this.sfontWidth(text.toString())
		} else {
			return VictorEngine.SFont.measureTextWidth.call(this, text);
		}
	};
	
	Bitmap.prototype.drawSFontText = function(text, x, y, maxWidth, lineHeight, align) {
		if (text !== undefined) {
			var tx = x;
			var ty = y + (lineHeight - this.sfont.bitmap.height) / 2;
			var sx = this.sfontWidth(text.toString())
			maxWidth = maxWidth || 0xffffffff;
			if (align === 'center') tx += (maxWidth - sx) / 2;
			if (align === 'right')  tx += (maxWidth - sx);
			this.drawSFontTextBody(text.toString(), Math.floor(tx), Math.floor(ty));
		}
	};

	Bitmap.prototype.sfontWidth = function(text) {
		var sfont = this.sfont;
		return text.split("").reduce(function(r, glyph) { 
			return r + sfont.values(glyph).width;
		}, 0);
	};

	Bitmap.prototype.drawSFontTextBody = function(text, tx, ty) {
		var bitmap = ImageManager.loadSFont(this.sfont.name);
		bitmap.paintOpacity = this.paintOpacity;
		text.split("").forEach(function(glyph) {
			var value = this.sfont.values(glyph);
			this.blt(bitmap, value.x, value.y, value.width, value.height, tx, ty);
			tx += value.width;
		}, this)
	};
	
	Bitmap.prototype.changeSFont = function(index) {
		this.sfont = VictorEngine.SFont.getSFont(i);
	};
	
	//=============================================================================
	// Window_Base
	//=============================================================================
	
	VictorEngine.SFont.createContents = Window_Base.prototype.createContents;
	Window_Base.prototype.createContents = function() {
		VictorEngine.SFont.createContents.call(this)
		this.changeSFont(this.normalColor());
	};
	
	VictorEngine.SFont.changeTextColor = Window_Base.prototype.changeTextColor;
	Window_Base.prototype.changeTextColor = function(color) {
		this.changeSFont(color);
		VictorEngine.SFont.changeTextColor.call(this, color)
	};
	
	Window_Base.prototype.setupSystemSFonts = function() {
		if (!this._systemSFont) {
			this._systemSFont = {};
			for (var i = 0; i < 34; i++) {
				this._systemSFont[this.textColor(i)] = VictorEngine.SFont.getSFont(i);
			};
		}
	};
	
	Window_Base.prototype.changeSFont = function(color) {
		this.setupSystemSFonts();
		this.contents.sfont = this._systemSFont[color];
	};
	
	//=============================================================================
	// Sprite_Timer
	//=============================================================================
	
	VictorEngine.SFont.createBitmap = Sprite_Timer.prototype.createBitmap;
	Sprite_Timer.prototype.createBitmap = function() {
		VictorEngine.SFont.createBitmap.call(this);
		var sfont = VictorEngine.SFont.getSFont(33);
		if (sfont) this.bitmap.sfont = sfont;
	};
	
	//=============================================================================
	// Scene_Title
	//=============================================================================
	
	VictorEngine.SFont.drawGameTitle = Scene_Title.prototype.drawGameTitle;
	Scene_Title.prototype.drawGameTitle = function() {
		var sfont = VictorEngine.SFont.getSFont(32);
		if (sfont) this._gameTitleSprite.bitmap.sfont = sfont;
		VictorEngine.SFont.drawGameTitle.call(this);
	};
	
	//=============================================================================
	// SFont
	//=============================================================================

	function SFont() {
		this.initialize.apply(this, arguments);
	}

	Object.defineProperties(SFont.prototype, {
		bitmap: { get: function() { return this._bitmap; }, configurable: true },
		name:   { get: function() { return this._name;   }, configurable: true }
	});

	SFont.prototype.initialize = function(name, hue, space) {
		this._name   = name;
		this._space  = space;
		this._bitmap = ImageManager.loadSFont(name, hue);
		this._bitmap.addLoadListener( function() { this.prepare() }.bind(this) )
	};
		
	SFont.prototype.prepare = function() {
		this._skip   = this.bitmap.getPixel(0, 0);
		this._digits = [" "].concat(VictorEngine.SFont.digits());
		this._alpha  = 255;
		this._values = {};
		this._values[" "] = {x: -this._space, y: 1, width: this._space, height: this.bitmap.height - 1};
		this.setupDigits();
	};
	
	SFont.prototype.values = function(glyph) {
		if (this._values[glyph]) {
			return this._values[glyph];
		} else {
			return this._values[" "];
		}
	};
	
	SFont.prototype.setupDigits = function() {
		var x1 = 0;
		var x2 = 0;
		for (var i = 1; i < this._digits.length; i++) {
			var glyph = this._digits[i];
			while (this.skipSamePixel(x1)) x1++;
			x2 = x1;
			while (this.skipOtherPixel(x2)) x2++;
			this._values[glyph] = {x: x1, y: 1, width: x2 - x1, height: this.bitmap.height - 1}
			x1 = x2;
		}
	};
	
	SFont.prototype.skipSamePixel = function(x) {
		return (this.bitmap.getPixel(x, 0) === this._skip && x < this.bitmap.width)
	};

	SFont.prototype.skipOtherPixel = function(x) {
		return (this.bitmap.getPixel(x, 0) !== this._skip && x < this.bitmap.width)
	};

})(); 
	

