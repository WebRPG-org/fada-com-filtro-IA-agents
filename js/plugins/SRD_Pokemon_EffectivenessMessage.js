//Effectiveness Message
//SumRndmDde's Pokemon series
//by SumRndmDde
//Version 1.00

/*:
@plugindesc This adds a message whenever a Skill/Move
hits and it's Super-Effective or Not Very Effective.

@author SumRndmDde

@param Low Effect Message
@desc This is the message displayed when someone
uses a not very effective hit.
@default It was not very effective...

@param Super Effect Message
@desc This is the message displayed when someone
uses a super effective hit.
@default It was super-effective!

@param No Effect Message
@desc This is the message displayed when someone
uses a nmove that doesn't affect the target.
@default The move had no effect.

@param Message Background
@desc This is the message background used.
'0' = normal, '1' = dim, '2' = none
@default It was super-effective!

@help
Effectiveness Message
SumRndmDde's Pokemon series
by SumRndmDde
Version 1.00

This allows you to manipulate a message that appears
when a super-effective or not very effective hit
is used.
*/

var SumRndmDde = SumRndmDde || {};
SumRndmDde.Pokemon = SumRndmDde.Pokemon || {};

SumRndmDde.Pokemon.EffectiveMessageParameters = PluginManager.parameters('SRD_Pokemon_EffectivenessMessage');

SumRndmDde.Pokemon.NotEffectiveMesssage = String(SumRndmDde.Pokemon.EffectiveMessageParameters['Low Effect Message']);
SumRndmDde.Pokemon.SuperEffectiveMesssage = String(SumRndmDde.Pokemon.EffectiveMessageParameters['Super Effect Message']);
SumRndmDde.Pokemon.NoEffectiveMesssage = String(SumRndmDde.Pokemon.EffectiveMessageParameters['No Effect Message']);

SumRndmDde.Pokemon.MessageBackground = Number(SumRndmDde.Pokemon.EffectiveMessageParameters['Message Background']);

Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);

    if(this.calcElementRate(target) < 1)
    {
    	$gameMessage.setBackground(SumRndmDde.Pokemon.MessageBackground);
    	$gameMessage.add(SumRndmDde.Pokemon.NotEffectiveMesssage);
    }
    else if(this.calcElementRate(target) > 1)
    {
    	$gameMessage.setBackground(SumRndmDde.Pokemon.MessageBackground);
    	$gameMessage.add(SumRndmDde.Pokemon.SuperEffectiveMesssage);
    }
    else if(this.calcElementRate(target) == 0)
    {
    	$gameMessage.setBackground(SumRndmDde.Pokemon.MessageBackground);
    	$gameMessage.add(SumRndmDde.Pokemon.NoEffectiveMesssage);
    }

    return value;
};