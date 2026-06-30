//------------------------------------------------
// ARP_SimpleStealSkill
//------------------------------------------------
/*:
@plugindesc v1.00 Creates skills or items that can steal enemy items.
<ARP_SSS>
@author Atreyo Ray

@help
** Please report any bugs you find to 'atreyo.ray[at]gmail.com'
** There's no need to credit me for using this plugin.
** You can use it on free or commercial games.
** You're free to modify it to suit your needs.
--------------------------------------------------
NOTE TAGS
--------------------------------------------------
---------------------
** For Skills or Items
---------------------
<can_steal> 
to make an steal type skill or item.
Works well for single or multiple targets.

<show_steal_items> 
to show items that can be stolen.
Doesn't show items that have already been stolen.
Will show the chance of the item being stolen.
  - shown chance max will be 100%, even it's higher.
Works well for single of multiple targets.

Those tags may be used together. Showing possible
items to steal happen before the steal attempt.

-------------
** For Enemies
-------------
Any number of 
<steal#:A,B,C,D>
#: a number begining on 1 (do not skip numbers).
A: type of item (item, weapon, or armor).
B: item ID
C: chance (a number from 0 to 100);
D: amount of items stolen at the same time. (may be left blank, = 1).
** More than one tag may be used, but '#' must start at 1.
** There's an steal attempt to each item. You may keep trying to steal
  until there's no more items to steal.

For example:
<steal1:item,1,40,2>
<steal2:weapon,3,20>
<steal3:armor,1,4>
- This enemy has 3 possible items to be stolen:
  - an item of id 1, with a 40% chance to steal 2 of it.
  - a weapon of id 3, with a 20% chance to steal 1 of it.
  - an armor of id 1, with a mere 4% chance to steal 1 of it.

-------------------------------------------------------------
** (OPTIONAL) For Actors, Classes, Weapons, Armors, and States 
-------------------------------------------------------------
<steal_chance:X>
X: the percentage of increase to steal chance. 
   You can also use negative numbers.

For example, setting a weapon with
<steal_chance: 20>
will increase the actor's steal chance by 20% while its equiped
with this weapon.

INFO: 
** using this optional notetag will also change the chance shown
  when you use an item or skill that shows "stealable" items.
** if you want to use an actor's steal chance increase in any other
place, you can access this property using battler.stc
  For instance, on damage formula, if you want to use it, make it
  a.stc or b.stc. Note that enemy's stc will always be 0, and the
  base value is 0 (just like an X-Param would be).

@param Nothing Text
@desc Text shown when enemy has no <steal> notetags.
Default: Nothing to steal!
@default Nothing to steal!

@param No Items Text
@desc Text shown when enemy has no more items to be stolen.
Default: No more items to steal!
@default No more items to steal!

@param Got Nothing Text
@desc Text shown when no item was caught on a steal atempt.
Default: You got nothing!
@default You got nothing!

@param Obtained Text
@desc Text show when you obtain an item, right before
the name of the item. Default: Obtained
@default Obtained

@param Enemy Name Color
@desc The sytem color of the enemy name shown in the message.
Check Window.png in img/system to see possible colors
@default 8

@param Message Position
@desc Where should the message window appear
0: top    1: middle     2: bottom
@default 1

@param Message Background
@desc The background of the message window
0: window    1: dim     2: transparent
@default 1
*/

(function(){

var parameters = $plugins.filter(function(p) {
        return p.description.contains('<ARP_SSS>');
    })[0].parameters;

var nothingText 	= String(parameters['Nothing Text'] 	|| 'Nothing to steal!');
var noItemsText 	= String(parameters['No Items Text'] 	|| 'No more items to steal!');
var gotNothingText 	= String(parameters['Got Nothing Text'] || 'You got nothing!');
var obtainedText	= String(parameters['Obtained Text']	|| 'Obtained');
var enemyNameColor	= String(parameters['Enemy Name Color']	|| '8');
var msgWinPos		= Number(parameters['Message Position'] || 1);
var msgWinBkg		= Number(parameters['Message Background'] || 1);


Object.defineProperties(Game_BattlerBase.prototype, {
	// Steal Chance Increase
    stc: { get: function() { return this.stealChance(); }, configurable: true }
});

Game_BattlerBase.prototype.stealChance = function() {
	if (!this.isActor()){
		return 0;
	}
	var objects = this.states();
	objects = objects.concat([this.actor(), this.currentClass()]);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) {
            objects.push(item);
        }
    }
    var chance = 0;
    objects.forEach(function(obj) {
    	if(obj.meta.steal_chance){
    		chance += Number(obj.meta.steal_chance || 0);
    	}
    }, this);
    return chance;
};

_Game_Action_applyItemUserEffect_ARPSS = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    this.applyStealDetect(target);
    this.applyStealEffect(target);
    _Game_Action_applyItemUserEffect_ARPSS.call(this,target);
};


Game_Action.prototype.applyStealDetect = function(target) {
	if(target.isActor()){
		return;
	}
	var item = this.item();
	if (item.meta.show_steal_items){
		BattleManager.showItemsToSteal(target, this.subject());
	}
};

Game_Action.prototype.applyStealEffect = function(target){
	if(target.isActor()) {
		return;
	}
	var item = this.item();
	if (item.meta.can_steal){
		var targetData = $dataEnemies[target.enemyId()];
		if (targetData.meta.steal1){
			BattleManager.applySteal(target,this.subject());
		} else {
			$gameMessage.setBackground(msgWinBkg);
			$gameMessage.setPositionType(msgWinPos);
			$gameMessage.add(nothingText);
		}
	}
};

BattleManager.resetStealItems = function() {
	this._stealItemsPerEnemy = [];
	$gameTroop.members().forEach(function(enemy) {
		this._stealItemsPerEnemy.push({ enemyName: enemy.name(), stolenItems: [] });
	},this);
};

BattleManager.numStolenItems = function(target){
	var num = 0;
	this._stealItemsPerEnemy.forEach(function (obj){
		if (obj.enemyName === target.name()){
			num = obj.stolenItems.length;
		}
	}, this);
	return num;
};


_BattleManager_startBattle_ARPSS = BattleManager.startBattle;
BattleManager.startBattle = function() {
	_BattleManager_startBattle_ARPSS.call(this);
	this.resetStealItems();
};

BattleManager.isStolen = function(target, stealItem) {
	for (var i = 0; i < this._stealItemsPerEnemy.length; i++){
		if (this._stealItemsPerEnemy[i].enemyName === target.name()) {
			for (var j = 0; j < this._stealItemsPerEnemy[i].stolenItems.length; j++){
				var stolenItem = this._stealItemsPerEnemy[i].stolenItems[j];
				if (stolenItem.itemType === stealItem.itemType &&
					stolenItem.itemId   === stealItem.itemId   &&
					stolenItem.amount   === stealItem.amount   &&
					stolenItem.chance   === stealItem.chance) {
					return true;
				}
			}
		}
	}
	return false;
};

BattleManager.addStolenItem = function(target, stealItem) {
	for (var i = 0; i < this._stealItemsPerEnemy.length; i++) {
		if (this._stealItemsPerEnemy[i].enemyName === target.name()) {
			this._stealItemsPerEnemy[i].stolenItems.push(stealItem);
			return;
		}
	}
}

BattleManager.showItemsToSteal = function(target, subject) {
	$gameMessage.setBackground(msgWinBkg);
	$gameMessage.setPositionType(msgWinPos);
	$gameMessage.add('\\c[' + enemyNameColor + ']' + target.name() + ":\\c[0]");
	var targetStealMeta = [];
	var targetData = $dataEnemies[target.enemyId()];
	for (var i = 1; targetData.meta['steal' + i]; i++){
		targetStealMeta.push( targetData.meta['steal' + i].split(',') );
	}
	if (targetStealMeta.length === 0){
		$gameMessage.setBackground(msgWinBkg);
		$gameMessage.setPositionType(msgWinPos);
		$gameMessage.add(nothingText);
		return;
	}
	if(this.numStolenItems(target) >= targetStealMeta.length){
		$gameMessage.setBackground(msgWinBkg);
		$gameMessage.setPositionType(msgWinPos);
		$gameMessage.add(noItemsText);
		return;
	}
	targetStealMeta.forEach( function(stealMeta) {
		var stealItem = {
			   itemType: stealMeta[0], 
			   itemId:   Number(stealMeta[1]),
			   chance:   Number(stealMeta[2] || 100),
			   amount:   Number(stealMeta[3] || 1)
			};
		if(!this.isStolen(target, stealItem)){
			var item = null;
			switch(stealItem.itemType.trim()){
				case 'item':
					item = $dataItems[stealItem.itemId];
					break;
				case 'weapon':
					item = $dataWeapons[stealItem.itemId];
					break;
				case 'armor':
					item = $dataArmors[stealItem.itemId];
					break;
				default:
					break;
			}
			if (item !== null) {
				var chance = Math.min(stealItem.chance + subject.stc, 100);
				text = '\\i[' + item.iconIndex + ']' + item.name + ' x' + stealItem.amount + ' : ' + chance + '%';
				$gameMessage.setBackground(msgWinBkg);
				$gameMessage.setPositionType(msgWinPos);
				$gameMessage.add(text);
			}
		}
	}, this);
};

BattleManager.applySteal = function(target, subject) {
	$gameMessage.setBackground(msgWinBkg);
	$gameMessage.setPositionType(msgWinPos);
	$gameMessage.add('\\c[' + enemyNameColor + ']' + target.name() + ":\\c[0]");
	var targetStealMeta = [];
	var targetData = $dataEnemies[target.enemyId()];
	for (var i = 1; targetData.meta['steal' + i]; i++){
		targetStealMeta.push( targetData.meta['steal' + i].split(',') );
	}
	var text = '';
	if(this.numStolenItems(target) >= targetStealMeta.length){
		$gameMessage.setBackground(msgWinBkg);
		$gameMessage.setPositionType(msgWinPos);
		$gameMessage.add(noItemsText);
		return;
	}
	targetStealMeta.forEach( function(stealMeta) {
		var stealItem = {
			   itemType: stealMeta[0], 
			   itemId:   Number(stealMeta[1]),
			   chance:   Number(stealMeta[2] || 100),
			   amount:   Number(stealMeta[3] || 1)
			};
		if (!this.isStolen(target, stealItem)){
			if (Math.randomInt(100) < stealItem.chance + subject.stc) {
					var item = null;
					switch(stealItem.itemType.trim()){
					case 'item':
						item = $dataItems[stealItem.itemId];
						break;
					case 'weapon':
						item = $dataWeapons[stealItem.itemId];
						break;
					case 'armor':
						item = $dataArmors[stealItem.itemId];
						break;
					default:
						break;
				}
				if (item !== null) {
					text = obtainedText + ' \\i[' + item.iconIndex + ']' + item.name + ' x' + stealItem.amount;
					$gameMessage.setBackground(msgWinBkg);
					$gameMessage.setPositionType(msgWinPos);
					$gameMessage.add(text);
					$gameParty.gainItem(item, stealItem.amount);
					this.addStolenItem(target, stealItem);
				}
			}
		}
	}, this);
	if (text === '') {
		$gameMessage.setBackground(msgWinBkg);
		$gameMessage.setPositionType(msgWinPos);
		$gameMessage.add(gotNothingText);
	}
};

})();