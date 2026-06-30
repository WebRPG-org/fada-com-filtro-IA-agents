//----------------------------------------------------------------------------------
// SOUL_MV Control Map Audio Pitch
// Author: Soulpour777
//----------------------------------------------------------------------------------
/*:
* @plugindesc v1.0 Controls the pitch of the currently played Map BGM at will.
* @author SoulPour777 - soulxregalia.wordpress.com
*
* @help

Control Map Audio Pitch

There are times when you do want to control the pitch of the audio being 
played. Normally, to do this in MV, you need to replay the music on
that map and change the pitch. But there are also times you want
to control it via an event. This plugin serves that purpose.

Plugin Commands:

audio pitch x

    where x is the pitch value. For example:

    audio pitch 150

*/
(function(){
    var SOUL_MV = SOUL_MV || {};
    SOUL_MV.ControlPitch = SOUL_MV.ControlPitch || {}; 
    SOUL_MV.ControlPitch._systemInitialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        SOUL_MV.ControlPitch._systemInitialize.call(this);
        this._currentBgmPitch = 100;
    }


    Game_Map.prototype.autoplay = function() {
        if ($dataMap.autoplayBgm) {
            var audio = {
                name: $dataMap.bgm.name,
                volume: $dataMap.bgm.volume,
                pitch: $gameSystem._currentBgmPitch,
                pan: $dataMap.bgm.pan,

            }
            AudioManager.playBgm(audio);
        }
        if ($dataMap.autoplayBgs) {
            AudioManager.playBgs($dataMap.bgs);
        }
    };  
    SOUL_MV.ControlPitch.pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        switch(command) {
            case 'audio':
                if (args[0] === 'pitch') {
                    $gameSystem._currentBgmPitch = Number(args[1]);
                    $gameMap.autoplay();
                }
        }
        SOUL_MV.ControlPitch.pluginCommand.call(this);
    };

})();
