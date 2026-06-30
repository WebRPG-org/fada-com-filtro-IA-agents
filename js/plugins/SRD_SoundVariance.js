//Sound Variance
//by SumRndmDde
//Requested by Driftwood Gaming
//Version 1.00

/*:
@plugindesc Adds the ability to define variance in volume, pitch,
and pan for your SE, ME, BGM, and BGS.

@author SumRndmDde

@param [Sound Effects]
@desc
@default ------------------------

@param Display SE Values
@desc Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any SE played.
@default false

@param SE Volume Upper
@desc This is the default upper margin for how much
volume will be randomly added on to your sound effects.
@default 0

@param SE Volume Lower
@desc This is the default lower margin for how much
volume will be randomly added on to your sound effects.
@default 0

@param SE Pitch Upper
@desc This is the default upper margin for how much
pitch will be randomly added on to your sound effects.
@default 0

@param SE Pitch Lower
@desc This is the default lower margin for how much
pitch will be randomly added on to your sound effects.
@default 0

@param SE Pan Upper
@desc This is the default upper margin for how much
pan will be randomly added on to your sound effects.
@default 0

@param SE Pan Lower
@desc This is the default lower margin for how much
pan will be randomly added on to your sound effects.
@default 0

@param [Music Effects]
@desc
@default ------------------------

@param Display ME Values
@desc Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any ME played.
@default false

@param ME Volume Upper
@desc This is the default upper margin for how much
volume will be randomly added on to your music effects.
@default 0

@param ME Volume Lower
@desc This is the default lower margin for how much
volume will be randomly added on to your music effects.
@default 0

@param ME Pitch Upper
@desc This is the default upper margin for how much
pitch will be randomly added on to your music effects.
@default 0

@param ME Pitch Lower
@desc This is the default lower margin for how much
pitch will be randomly added on to your music effects.
@default 0

@param ME Pan Upper
@desc This is the default upper margin for how much
pan will be randomly added on to your music effects.
@default 0

@param ME Pan Lower
@desc This is the default lower margin for how much
pan will be randomly added on to your music effects.
@default 0

@param [Background Music]
@desc
@default ------------------------

@param Display BGM Values
@desc Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any BGM played.
@default false

@param BGM Volume Upper
@desc This is the default upper margin for how much
volume will be randomly added on to your background music.
@default 0

@param BGM Volume Lower
@desc This is the default lower margin for how much
volume will be randomly added on to your background music.
@default 0

@param BGM Pitch Upper
@desc This is the default upper margin for how much
pitch will be randomly added on to your background music.
@default 0

@param BGM Pitch Lower
@desc This is the default lower margin for how much
pitch will be randomly added on to your background music.
@default 0

@param BGM Pan Upper
@desc This is the default upper margin for how much
pan will be randomly added on to your background music.
@default 0

@param BGM Pan Lower
@desc This is the default lower margin for how much
pan will be randomly added on to your background music.
@default 0

@param [Background Sound]
@desc
@default ------------------------

@param Display BGS Values
@desc Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any BGS played.
@default false

@param BGS Volume Upper
@desc This is the default upper margin for how much
volume will be randomly added on to your background sounds.
@default 0

@param BGS Volume Lower
@desc This is the default lower margin for how much
volume will be randomly added on to your background sounds.
@default 0

@param BGS Pitch Upper
@desc This is the default upper margin for how much
pitch will be randomly added on to your background sounds.
@default 0

@param BGS Pitch Lower
@desc This is the default lower margin for how much
pitch will be randomly added on to your background sounds.
@default 0

@param BGS Pan Upper
@desc This is the default upper margin for how much
pan will be randomly added on to your background sounds.
@default 0

@param BGS Pan Lower
@desc This is the default lower margin for how much
pan will be randomly added on to your background sounds.
@default 0

@help
Sound Variance
by SumRndmDde
Requested by Driftwood Gaming
Version 1.00

Before anything, allow me to explain the simple mechanics of this Plugin.

Whenever an SE/ME/BGM/BGS is called, a random value is added to its 
volume, pitch, and pan.

The upper and lower margins of the random value generated can be defined
in the Parameters or changed mid-game with the Plugin Command.

================
---Parameters---
================

---Sound Effects---

Display SE Values
Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any SE played.
Default is false

SE Volume Upper
This is the default upper margin for how much
volume will be randomly added on to your sound effects.
Default is 0

SE Volume Lower
This is the default lower margin for how much
volume will be randomly added on to your sound effects.
Default is 0

SE Pitch Upper
This is the default upper margin for how much
pitch will be randomly added on to your sound effects.
Default is 0

SE Pitch Lower
This is the default lower margin for how much
pitch will be randomly added on to your sound effects.
Default is 0

SE Pan Upper
This is the default upper margin for how much
pan will be randomly added on to your sound effects.
Default is 0

SE Pan Lower
This is the default lower margin for how much
pan will be randomly added on to your sound effects.
Default is 0

---Music Effects---

Display ME Values
Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any ME played.
Default is false

ME Volume Upper
This is the default upper margin for how much
volume will be randomly added on to your music effects.
Default is 0

ME Volume Lower
This is the default lower margin for how much
volume will be randomly added on to your music effects.
Default is 0

ME Pitch Upper
This is the default upper margin for how much
pitch will be randomly added on to your music effects.
Default is 0

ME Pitch Lower
This is the default lower margin for how much
pitch will be randomly added on to your music effects.
Default is 0

ME Pan Upper
This is the default upper margin for how much
pan will be randomly added on to your music effects.
Default is 0

ME Pan Lower
This is the default lower margin for how much
pan will be randomly added on to your music effects.
Default is 0

---Background Music---

Display BGM Values
Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any BGM played.
Default is false

BGM Volume Upper
This is the default upper margin for how much
volume will be randomly added on to your background music.
Default is 0

BGM Volume Lower
This is the default lower margin for how much
volume will be randomly added on to your background music.
Default is 0

BGM Pitch Upper
This is the default upper margin for how much
pitch will be randomly added on to your background music.
Default is 0

BGM Pitch Lower
This is the default lower margin for how much
pitch will be randomly added on to your background music.
Default is 0

BGM Pan Upper
This is the default upper margin for how much
pan will be randomly added on to your background music.
Default is 0

BGM Pan Lower
This is the default lower margin for how much
pan will be randomly added on to your background music.
Default is 0

---Background Sound---

Display BGS Values
Setting this to 'true' will make a dialogue box pop up 
and give the Volume, Pitch, and Pan of any BGS played.
Default is false

BGS Volume Upper
This is the default upper margin for how much
volume will be randomly added on to your background sounds.
Default is 0

BGS Volume Lower
This is the default lower margin for how much
volume will be randomly added on to your background sounds.
Default is 0

BGS Pitch Upper
This is the default upper margin for how much
pitch will be randomly added on to your background sounds.
Default is 0

BGS Pitch Lower
This is the default lower margin for how much
pitch will be randomly added on to your background sounds.
Default is 0

BGS Pan Upper
This is the default upper margin for how much
pan will be randomly added on to your background sounds.
Default is 0

BGS Pan Lower
This is the default lower margin for how much
pan will be randomly added on to your background sounds.
Default is 0

=====================
---Plugin Commands---
=====================

There is only one Plugin Command in this Plugin.
This one command can manipulate every variable
in this Plugin.

It's a little confusing, but let's try this:

SetSoundVariance a b c d

a = SE/ME/BGM/BGS
b = pitch/volume/pan/ALL (using ALL will affect pitch/volume/pan)
c = lower margin
d = upper margin

Examples:

SetSoundVariamce SE pitch -10 10
SetSoundVariamce BGM volume 5 20
SetSoundVariamce ME pan -20 20
SetSoundVariamce SE ALL 0 0


Also, you can do this to reset anything to the defaults 
defined from the Parameters:

SetSoundVariamce a b default

a = SE/ME/BGM/BGS
b = pitch/volume/pan/ALL (using ALL will affect pitch/volume/pan)


============
---Ending---
============

Anyway, thanks for reading!
Please check out my YouTube channel:

www.youtube.com/SumRndmDde

Thanks for eveything!
*/

var SumRndmDde = SumRndmDde || {};
SumRndmDde.Sounds = SumRndmDde.Sounds || {};

SumRndmDde.Sounds.varianceParameters = PluginManager.parameters('SRD_SoundVariance');

//Sets defaults
SumRndmDde.Sounds.defaultSEPitchGain = Number(SumRndmDde.Sounds.varianceParameters['SE Pitch Upper']);
SumRndmDde.Sounds.defaultSEPitchLoss = Number(SumRndmDde.Sounds.varianceParameters['SE Pitch Lower']);
SumRndmDde.Sounds.defaultSEVolumeGain = Number(SumRndmDde.Sounds.varianceParameters['SE Volume Upper']);
SumRndmDde.Sounds.defaultSEVolumeLoss = Number(SumRndmDde.Sounds.varianceParameters['SE Volume Lower']);
SumRndmDde.Sounds.defaultSEPanGain = Number(SumRndmDde.Sounds.varianceParameters['SE Pan Upper']);
SumRndmDde.Sounds.defaultSEPanLoss = Number(SumRndmDde.Sounds.varianceParameters['SE Pan Lower']);

SumRndmDde.Sounds.defaultMEPitchGain = Number(SumRndmDde.Sounds.varianceParameters['ME Pitch Upper']);
SumRndmDde.Sounds.defaultMEPitchLoss = Number(SumRndmDde.Sounds.varianceParameters['ME Pitch Lower']);
SumRndmDde.Sounds.defaultMEVolumeGain = Number(SumRndmDde.Sounds.varianceParameters['ME Volume Upper']);
SumRndmDde.Sounds.defaultMEVolumeLoss = Number(SumRndmDde.Sounds.varianceParameters['ME Volume Lower']);
SumRndmDde.Sounds.defaultMEPanGain = Number(SumRndmDde.Sounds.varianceParameters['ME Pan Upper']);
SumRndmDde.Sounds.defaultMEPanLoss = Number(SumRndmDde.Sounds.varianceParameters['ME Pan Lower']);

SumRndmDde.Sounds.defaultBGMPitchGain = Number(SumRndmDde.Sounds.varianceParameters['BGM Pitch Upper']);
SumRndmDde.Sounds.defaultBGMPitchLoss = Number(SumRndmDde.Sounds.varianceParameters['BGM Pitch Lower']);
SumRndmDde.Sounds.defaultBGMVolumeGain = Number(SumRndmDde.Sounds.varianceParameters['BGM Volume Upper']);
SumRndmDde.Sounds.defaultBGMVolumeLoss = Number(SumRndmDde.Sounds.varianceParameters['BGM Volume Lower']);
SumRndmDde.Sounds.defaultBGMPanGain = Number(SumRndmDde.Sounds.varianceParameters['BGM Pan Upper']);
SumRndmDde.Sounds.defaultBGMPanLoss = Number(SumRndmDde.Sounds.varianceParameters['BGM Pan Lower']);

SumRndmDde.Sounds.defaultBGSPitchGain = Number(SumRndmDde.Sounds.varianceParameters['BGS Pitch Upper']);
SumRndmDde.Sounds.defaultBGSPitchLoss = Number(SumRndmDde.Sounds.varianceParameters['BGS Pitch Lower']);
SumRndmDde.Sounds.defaultBGSVolumeGain = Number(SumRndmDde.Sounds.varianceParameters['BGS Volume Upper']);
SumRndmDde.Sounds.defaultBGSVolumeLoss = Number(SumRndmDde.Sounds.varianceParameters['BGS Volume Lower']);
SumRndmDde.Sounds.defaultBGSPanGain = Number(SumRndmDde.Sounds.varianceParameters['BGS Pan Upper']);
SumRndmDde.Sounds.defaultBGSPanLoss = Number(SumRndmDde.Sounds.varianceParameters['BGS Pan Lower']);

//Sets dynamic 
SumRndmDde.Sounds.pitchSEGain = SumRndmDde.Sounds.defaultSEPitchGain;
SumRndmDde.Sounds.pitchSELoss = SumRndmDde.Sounds.defaultSEPitchLoss;
SumRndmDde.Sounds.volumeSEGain = SumRndmDde.Sounds.defaultSEVolumeGain;
SumRndmDde.Sounds.volumeSELoss = SumRndmDde.Sounds.defaultSEVolumeLoss;
SumRndmDde.Sounds.panSEGain = SumRndmDde.Sounds.defaultSEPanGain;
SumRndmDde.Sounds.panSELoss = SumRndmDde.Sounds.defaultSEPanLoss;

SumRndmDde.Sounds.pitchMEGain = SumRndmDde.Sounds.defaultMEPitchGain;
SumRndmDde.Sounds.pitchMELoss = SumRndmDde.Sounds.defaultMEPitchLoss;
SumRndmDde.Sounds.volumeMEGain = SumRndmDde.Sounds.defaultMEVolumeGain;
SumRndmDde.Sounds.volumeMELoss = SumRndmDde.Sounds.defaultMEVolumeLoss;
SumRndmDde.Sounds.panMEGain = SumRndmDde.Sounds.defaultMEPanGain;
SumRndmDde.Sounds.panMELoss = SumRndmDde.Sounds.defaultMEPanLoss;

SumRndmDde.Sounds.pitchBGMGain = SumRndmDde.Sounds.defaultBGMPitchGain;
SumRndmDde.Sounds.pitchBGMLoss = SumRndmDde.Sounds.defaultBGMPitchLoss;
SumRndmDde.Sounds.volumeBGMGain = SumRndmDde.Sounds.defaultBGMVolumeGain;
SumRndmDde.Sounds.volumeBGMLoss = SumRndmDde.Sounds.defaultBGMVolumeLoss;
SumRndmDde.Sounds.panBGMGain = SumRndmDde.Sounds.defaultBGMPanGain;
SumRndmDde.Sounds.panBGMLoss = SumRndmDde.Sounds.defaultBGMPanLoss;

SumRndmDde.Sounds.pitchBGSGain = SumRndmDde.Sounds.defaultBGSPitchGain;
SumRndmDde.Sounds.pitchBGSLoss = SumRndmDde.Sounds.defaultBGSPitchLoss;
SumRndmDde.Sounds.volumeBGSGain = SumRndmDde.Sounds.defaultBGSVolumeGain;
SumRndmDde.Sounds.volumeBGSLoss = SumRndmDde.Sounds.defaultBGSVolumeLoss;
SumRndmDde.Sounds.panBGSGain = SumRndmDde.Sounds.defaultBGSPanGain;
SumRndmDde.Sounds.panBGSLoss = SumRndmDde.Sounds.defaultBGSPanLoss;

// Play SE
Game_Interpreter.prototype.command250 = function() {
	var fileName = String(this._params[0].name);
	var volume = Number(this._params[0].volume);
	var pitch = Number(this._params[0].pitch);
	var pan = Number(this._params[0].pan);

	var volumeGain = SumRndmDde.Sounds.volumeSEGain;
	var volumeLoss = SumRndmDde.Sounds.volumeSELoss;

	var pitchGain = SumRndmDde.Sounds.pitchSEGain;
	var pitchLoss = SumRndmDde.Sounds.pitchSELoss;

	var panGain = SumRndmDde.Sounds.panSEGain;
	var panLoss = SumRndmDde.Sounds.panSELoss;

	volume += Math.randomInt(volumeGain - volumeLoss) + volumeLoss;
	if(volume < 0) volume = 0;
	if(volume > 100) volume = 100;

	pitch += Math.randomInt(pitchGain - pitchLoss) + pitchLoss;
	if(pitch < 50) pitch = 50;
	if(pitch > 150) pitch = 150;

	pan += Math.randomInt(panGain - panLoss) + panLoss;
	if(pan < -100) pan = -100;
	if(pan > 100) pan = 100;

	if(SumRndmDde.Sounds.varianceParameters['Display SE Values'] == 'true')
	{
		$gameMessage.add("Volume: " + String(volume) + ", Pitch: " + String(pitch) + ", Pan: " + String(pan));
	}

	var se = {name: fileName, volume: volume, pitch: pitch, pan: pan};

    AudioManager.playSe(se);
    return true;
};

//Play ME
Game_Interpreter.prototype.command249 = function() {
	var fileName = String(this._params[0].name);
	var volume = Number(this._params[0].volume);
	var pitch = Number(this._params[0].pitch);
	var pan = Number(this._params[0].pan);

	var volumeGain = SumRndmDde.Sounds.volumeMEGain;
	var volumeLoss = SumRndmDde.Sounds.volumeMELoss;

	var pitchGain = SumRndmDde.Sounds.pitchMEGain;
	var pitchLoss = SumRndmDde.Sounds.pitchMELoss;

	var panGain = SumRndmDde.Sounds.panMEGain;
	var panLoss = SumRndmDde.Sounds.panMELoss;

	volume += Math.randomInt(volumeGain - volumeLoss) + volumeLoss;
	if(volume < 0) volume = 0;
	if(volume > 100) volume = 100;

	pitch += Math.randomInt(pitchGain - pitchLoss) + pitchLoss;
	if(pitch < 50) pitch = 50;
	if(pitch > 150) pitch = 150;

	pan += Math.randomInt(panGain - panLoss) + panLoss;
	if(pan < -100) pan = -100;
	if(pan > 100) pan = 100;

	if(SumRndmDde.Sounds.varianceParameters['Display ME Values'] == 'true')
	{
		$gameMessage.add("Volume: " + String(volume) + ", Pitch: " + String(pitch) + ", Pan: " + String(pan));
	}

	var se = {name: fileName, volume: volume, pitch: pitch, pan: pan};

    AudioManager.playMe(this._params[0]);
    return true;
};

//Play BGM
Game_Interpreter.prototype.command241 = function() {
	var fileName = String(this._params[0].name);
	var volume = Number(this._params[0].volume);
	var pitch = Number(this._params[0].pitch);
	var pan = Number(this._params[0].pan);

	var volumeGain = SumRndmDde.Sounds.volumeBGMGain;
	var volumeLoss = SumRndmDde.Sounds.volumeBGMLoss;

	var pitchGain = SumRndmDde.Sounds.pitchBGMGain;
	var pitchLoss = SumRndmDde.Sounds.pitchBGMLoss;

	var panGain = SumRndmDde.Sounds.panBGMGain;
	var panLoss = SumRndmDde.Sounds.panBGMLoss;

	volume += Math.randomInt(volumeGain - volumeLoss) + volumeLoss;
	if(volume < 0) volume = 0;
	if(volume > 100) volume = 100;

	pitch += Math.randomInt(pitchGain - pitchLoss) + pitchLoss;
	if(pitch < 50) pitch = 50;
	if(pitch > 150) pitch = 150;

	pan += Math.randomInt(panGain - panLoss) + panLoss;
	if(pan < -100) pan = -100;
	if(pan > 100) pan = 100;

	if(SumRndmDde.Sounds.varianceParameters['Display BGM Values'] == 'true')
	{
		$gameMessage.add("Volume: " + String(volume) + ", Pitch: " + String(pitch) + ", Pan: " + String(pan));
	}

	var se = {name: fileName, volume: volume, pitch: pitch, pan: pan};

    AudioManager.playBgm(this._params[0]);
    return true;
};

// Play BGS
Game_Interpreter.prototype.command245 = function() {
	var fileName = String(this._params[0].name);
	var volume = Number(this._params[0].volume);
	var pitch = Number(this._params[0].pitch);
	var pan = Number(this._params[0].pan);

	var volumeGain = SumRndmDde.Sounds.volumeBGSGain;
	var volumeLoss = SumRndmDde.Sounds.volumeBGSLoss;

	var pitchGain = SumRndmDde.Sounds.pitchBGSGain;
	var pitchLoss = SumRndmDde.Sounds.pitchBGSLoss;

	var panGain = SumRndmDde.Sounds.panBGSGain;
	var panLoss = SumRndmDde.Sounds.panBGSLoss;

	volume += Math.randomInt(volumeGain - volumeLoss) + volumeLoss;
	if(volume < 0) volume = 0;
	if(volume > 100) volume = 100;

	pitch += Math.randomInt(pitchGain - pitchLoss) + pitchLoss;
	if(pitch < 50) pitch = 50;
	if(pitch > 150) pitch = 150;

	pan += Math.randomInt(panGain - panLoss) + panLoss;
	if(pan < -100) pan = -100;
	if(pan > 100) pan = 100;

	if(SumRndmDde.Sounds.varianceParameters['Display BGS Values'] == 'true')
	{
		$gameMessage.add("Volume: " + String(volume) + ", Pitch: " + String(pitch) + ", Pan: " + String(pan));
	}

	var se = {name: fileName, volume: volume, pitch: pitch, pan: pan};

    AudioManager.playBgs(this._params[0]);
    return true;
};

SumRndmDde.Sounds.soundVariancePluginCommands = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
   SumRndmDde.Choices.soundVariancePluginCommands.call(this, command, args);
   
   if (command.toLowerCase() === 'setsoundvariance') {
   		if(args[0].toLowerCase() === 'se')
   		{
   			if(args[1].toLowerCase() === 'pitch')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchSEGain = SumRndmDde.Sounds.defaultSEPitchGain;
					SumRndmDde.Sounds.pitchSELoss = SumRndmDde.Sounds.defaultSEPitchLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchSEGain = Number(args[4]);
					SumRndmDde.Sounds.pitchSELoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'volume')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.volumeSEGain = SumRndmDde.Sounds.defaultSEVolumeGain;
					SumRndmDde.Sounds.volumeSELoss = SumRndmDde.Sounds.defaultSEVolumeLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.volumeSEGain = Number(args[4]);
					SumRndmDde.Sounds.volumeSELoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'pan')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.panSEGain = SumRndmDde.Sounds.defaultSEPanGain;
					SumRndmDde.Sounds.panSELoss = SumRndmDde.Sounds.defaultSEPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.panSEGain = Number(args[4]);
					SumRndmDde.Sounds.panSELoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'all')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchSEGain = SumRndmDde.Sounds.defaultSEPitchGain;
					SumRndmDde.Sounds.pitchSELoss = SumRndmDde.Sounds.defaultSEPitchLoss;
					SumRndmDde.Sounds.volumeSEGain = SumRndmDde.Sounds.defaultSEVolumeGain;
					SumRndmDde.Sounds.volumeSELoss = SumRndmDde.Sounds.defaultSEVolumeLoss;
   					SumRndmDde.Sounds.panSEGain = SumRndmDde.Sounds.defaultSEPanGain;
					SumRndmDde.Sounds.panSELoss = SumRndmDde.Sounds.defaultSEPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchSEGain = Number(args[4]);
					SumRndmDde.Sounds.pitchSELoss = Number(args[3]);
					SumRndmDde.Sounds.volumeSEGain = Number(args[4]);
					SumRndmDde.Sounds.volumeSELoss = Number(args[3]);
   					SumRndmDde.Sounds.panSEGain = Number(args[4]);
					SumRndmDde.Sounds.panSELoss = Number(args[3]);
   				}
   			}
   		}
   		else if(args[0].toLowerCase() === 'me')
   		{
   			if(args[1].toLowerCase() === 'pitch')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchMEGain = SumRndmDde.Sounds.defaultMEPitchGain;
					SumRndmDde.Sounds.pitchMELoss = SumRndmDde.Sounds.defaultMEPitchLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchMEGain = Number(args[4]);
					SumRndmDde.Sounds.pitchMELoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'volume')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.volumeMEGain = SumRndmDde.Sounds.defaultMEVolumeGain;
					SumRndmDde.Sounds.volumeMELoss = SumRndmDde.Sounds.defaultMEVolumeLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.volumeMEGain = Number(args[4]);
					SumRndmDde.Sounds.volumeMELoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'pan')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.panMEGain = SumRndmDde.Sounds.defaultMEPanGain;
					SumRndmDde.Sounds.panMELoss = SumRndmDde.Sounds.defaultMEPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.panMEGain = Number(args[4]);
					SumRndmDde.Sounds.panMELoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'all')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchMEGain = SumRndmDde.Sounds.defaultMEPitchGain;
					SumRndmDde.Sounds.pitchMELoss = SumRndmDde.Sounds.defaultMEPitchLoss;
					SumRndmDde.Sounds.volumeMEGain = SumRndmDde.Sounds.defaultMEVolumeGain;
					SumRndmDde.Sounds.volumeMELoss = SumRndmDde.Sounds.defaultMEVolumeLoss;
   					SumRndmDde.Sounds.panMEGain = SumRndmDde.Sounds.defaultMEPanGain;
					SumRndmDde.Sounds.panMELoss = SumRndmDde.Sounds.defaultMEPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchMEGain = Number(args[4]);
					SumRndmDde.Sounds.pitchMELoss = Number(args[3]);
					SumRndmDde.Sounds.volumeMEGain = Number(args[4]);
					SumRndmDde.Sounds.volumeMELoss = Number(args[3]);
   					SumRndmDde.Sounds.panMEGain = Number(args[4]);
					SumRndmDde.Sounds.panMELoss = Number(args[3]);
   				}
   			}
   		}
   		else if(args[0].toLowerCase() === 'bgm')
   		{
   			if(args[1].toLowerCase() === 'pitch')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchBGMGain = SumRndmDde.Sounds.defaultBGMPitchGain;
					SumRndmDde.Sounds.pitchBGMLoss = SumRndmDde.Sounds.defaultBGMPitchLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchBGMGain = Number(args[4]);
					SumRndmDde.Sounds.pitchBGMLoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'volume')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.volumeBGMGain = SumRndmDde.Sounds.defaultBGMVolumeGain;
					SumRndmDde.Sounds.volumeBGMLoss = SumRndmDde.Sounds.defaultBGMVolumeLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.volumeBGMGain = Number(args[4]);
					SumRndmDde.Sounds.volumeBGMLoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'pan')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.panBGMGain = SumRndmDde.Sounds.defaultBGMPanGain;
					SumRndmDde.Sounds.panBGMLoss = SumRndmDde.Sounds.defaultBGMPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.panBGMGain = Number(args[4]);
					SumRndmDde.Sounds.panBGMLoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'all')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchBGMGain = SumRndmDde.Sounds.defaultBGMPitchGain;
					SumRndmDde.Sounds.pitchBGMLoss = SumRndmDde.Sounds.defaultBGMPitchLoss;
					SumRndmDde.Sounds.volumeBGMGain = SumRndmDde.Sounds.defaultBGMVolumeGain;
					SumRndmDde.Sounds.volumeBGMLoss = SumRndmDde.Sounds.defaultBGMVolumeLoss;
   					SumRndmDde.Sounds.panBGMGain = SumRndmDde.Sounds.defaultBGMPanGain;
					SumRndmDde.Sounds.panBGMLoss = SumRndmDde.Sounds.defaultBGMPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchBGMGain = Number(args[4]);
					SumRndmDde.Sounds.pitchBGMLoss = Number(args[3]);
					SumRndmDde.Sounds.volumeBGMGain = Number(args[4]);
					SumRndmDde.Sounds.volumeBGMLoss = Number(args[3]);
   					SumRndmDde.Sounds.panBGMGain = Number(args[4]);
					SumRndmDde.Sounds.panBGMLoss = Number(args[3]);
   				}
   			}
   		}
   		else if(args[0].toLowerCase() === 'bgs')
   		{
   			if(args[1].toLowerCase() === 'pitch')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchBGSGain = SumRndmDde.Sounds.defaultBGSPitchGain;
					SumRndmDde.Sounds.pitchBGSLoss = SumRndmDde.Sounds.defaultBGSPitchLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchBGSGain = Number(args[4]);
					SumRndmDde.Sounds.pitchBGSLoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'volume')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.volumeBGSGain = SumRndmDde.Sounds.defaultBGSVolumeGain;
					SumRndmDde.Sounds.volumeBGSLoss = SumRndmDde.Sounds.defaultBGSVolumeLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.volumeBGSGain = Number(args[4]);
					SumRndmDde.Sounds.volumeBGSLoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'pan')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.panBGSGain = SumRndmDde.Sounds.defaultBGSPanGain;
					SumRndmDde.Sounds.panBGSLoss = SumRndmDde.Sounds.defaultBGSPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.panBGSGain = Number(args[4]);
					SumRndmDde.Sounds.panBGSLoss = Number(args[3]);
   				}
   			}
   			else if(args[1].toLowerCase() === 'all')
   			{
   				if(args[2].toLowerCase() === 'default')
   				{
   					SumRndmDde.Sounds.pitchBGSGain = SumRndmDde.Sounds.defaultBGSPitchGain;
					SumRndmDde.Sounds.pitchBGSLoss = SumRndmDde.Sounds.defaultBGSPitchLoss;
					SumRndmDde.Sounds.volumeBGSGain = SumRndmDde.Sounds.defaultBGSVolumeGain;
					SumRndmDde.Sounds.volumeBGSLoss = SumRndmDde.Sounds.defaultBGSVolumeLoss;
   					SumRndmDde.Sounds.panBGSGain = SumRndmDde.Sounds.defaultBGSPanGain;
					SumRndmDde.Sounds.panBGSLoss = SumRndmDde.Sounds.defaultBGSPanLoss;
   				}
   				else
   				{
   					SumRndmDde.Sounds.pitchBGSGain = Number(args[4]);
					SumRndmDde.Sounds.pitchBGSLoss = Number(args[3]);
					SumRndmDde.Sounds.volumeBGSGain = Number(args[4]);
					SumRndmDde.Sounds.volumeBGSLoss = Number(args[3]);
   					SumRndmDde.Sounds.panBGSGain = Number(args[4]);
					SumRndmDde.Sounds.panBGSLoss = Number(args[3]);
   				}
   			}
   		}
   }
}