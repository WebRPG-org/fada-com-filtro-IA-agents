/*:
-------------------------------------------------------------------------
@title Instance Actors
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Feb 23, 2016
@filename HIME_InstanceActors.js
@url http://himeworks.com/2016/01/instance-actors/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc 1.0 - Manage custom actors during the game. These actors can be
created during the game
@help 
-------------------------------------------------------------------------------
== Description ==

By default, RPG Maker does not support the creation of new actors during the
game.

When you create your game, you would set up actors in the database, and then
during the game, those actors will be used.

With this plugin, the possibility of creating completely new actors during
the game is open for you.

For example, you could create a mechanic where you capture enemies during
battle, which are converted to actors before they are added to the party.
These actors did not exist when you first created your project, nor do they
exist in other save files.

This plugin provides the functionality for managing custom actors that are
generated at run-time.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 - Feb 23, 2016
 * read plugin parameters
1.0 - Jan 23, 2016
 * initial release

== Usage ==

-- Setup --

In the plugin parameters, choose the "Template Actor ID". This is the
"default" actor that all newly created actors will be based on.

Then set the "Start ID", which represents how the custom actors will be
identified. Once the game starts, you have no way to change these ID's, so
if you are expecting to add more actors to your project, you should take that
into consideration when choosing the the start ID. I would go with something
like 1000 just to be safe.

-- Creating Actors --

To create a new actor, use the script call

  var newActor = InstanceManager.addActor()
  
The game would create a new actor for you, using the template actor as the
base. It would basically be a copy of it with a new ID.

If you wanted to base it on a different template, you can specify that in 
the script call like this

  var newActor = InstanceManager.addActor( 2 )
  
Which will use actor 2 as the template.
The actor creation process simply creates an actor. It doesn't automatically
add it to your party, because you might not want to do that.

If you want to add it to your party, you could write

  var newActor = InstanceManager.addActor()
  $gameParty.addActor(newActor.id)
  
-- Deleting Actors --

This plugin does not provide support for deleting actors, because that actor
might be in use by other objects. It is safer to simply not use the actor.

-------------------------------------------------------------------------------
@param Template Actor ID
@desc The default actor to base all newly created actors on
@default 1

@param Start ID
@desc The ID that the game should assign to new actors. This cannot be changed
once a game begins, so a larger value is recommended.
@default 1000
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.InstanceActors = 1;
TH.InstanceActors = TH.InstanceActors || {};

function InstanceManager() { 
};

(function ($) {

  $.params = PluginManager.parameters("HIME_InstanceActors");
  $.templateActorId = Math.floor($.params["Template Actor ID"]);
  $.startId = Math.floor($.params["Start ID"]);

  InstanceManager.loadActors = function(contents) {
    var data = contents.instanceActors;
    for (var i = 0; i < data.length; i++) {
      var actorData = data[i];
      $dataActors[actorData.id] = actorData;
    }
  };
  
  InstanceManager.saveActors = function(contents) {
    contents.instanceActors = this._instanceActors();
    return contents;
  };
  
  InstanceManager._instanceActors = function() {
    return $dataActors.slice($.startId);
  };
  
  /* Creates a new data actor.
   * If an actor ID is specified the new actor will be created using
   * that actor as a template.
   */
  InstanceManager._createActor = function(templateActorId) {
    templateActorId = templateActorId || $.templateActorId;
    var actor = JsonEx.makeDeepCopy($dataActors[templateActorId]);
    this._setupActor(actor);
    return actor;
  };
  
  InstanceManager._setupActor = function(actor) {
    var newId = this._generateActorId()
    actor.id = newId;
  }
  
  InstanceManager._generateActorId = function() {
    return Math.max($.startId, $dataActors.length);
  };

  /* Adds a new actor to the database. Returns the newly created actor */
  InstanceManager.addActor = function(templateActorId) {
    newActor = this._createActor(templateActorId);
    $dataActors[newActor.id] = newActor;
    return newActor;
  };
  
  /* Removes the specified actor from the database.
   * Let's not do this since that data may be used by other objects
   */
  InstanceManager.removeActor = function() {
  };
  
  /***************************************************************************/
  
  var TH_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = TH_DataManager_makeSaveContents.call(this);
    contents = InstanceManager.saveActors(contents);
    return contents;
  };
  
  var TH_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    TH_DataManager_extractSaveContents.call(this, contents);
    InstanceManager.loadActors(contents);
  };
  
})(TH.InstanceActors);