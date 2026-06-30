//=============================================================================
// EventTouch.js
//=============================================================================

/*:
 * @plugindesc Adds additional event-touch-event triggers for event pages.
 * @author Felix "Xilefian" Jones
 *
 * @param Turn Toward
 * @desc Controls if the "turn toward" command activates on an EventTouch.
 * @default true
 *
 * @param ==========
 * @desc
 * @default
 *
 * @param Note Name
 * @desc Event Note name for activating EventTouch.
 * @default event_touch
 *
 * @param JSON Name
 * @desc Event Comment start string for defining EventTouch data.
 * @default Event Touch
 *
 * @param ==========
 * @desc
 * @default
 *
 * @param This Touch Key
 * @desc JSON key for the "this touch" boolean.
 * @default this touch
 *
 * @param Source Key
 * @desc JSON key for the touch sources entry.
 * @default source
 *
 * @param Call Key
 * @desc JSON key for the call entry.
 * @default call
 *
 * @param Target This Key
 * @desc JSON key for the "target this" boolean for Common Events.
 * @default target this
 *
 * @param Common Event Key
 * @desc JSON key for the Common Event entry.
 * @default common event
 *
 * @param ==========
 * @desc
 * @default
 *
 * @help
 *
 * Activate by adding an event comment to an event page with the JSON Name (default "Event Touch").
 * Each new line after the JSON Name is an individual trigger.
 *
 * An example valid event comment:
 * Event Touch
 * { "source" : 1, "call" : { "common event" : 1 } }
 * { "source" : 2, "call" : { "common event" : 2, "target this" : false } }
 *
 * A single JSON entry must NOT be defined across multiple lines.
 *
 * The JSON key names can be redefined as part of the Plugin Parameters.
 *
 * Version 2.0
 * Website http://www.hbgames.org
 *
 * Defaults:
 * "source" = []    # all events on the map is a trigger
 * "this touch" = false # trigger is when event touches this
 * "call" = current_event_page  # will call the event page where the JSON is defined
 * "target this" = true # Common event will use this event as the target
 *
 * Examples:
 * # Page triggers when any event on the map touches this event
 * { "source" : [] }
 *
 * # Page triggers when "Event A" touches this event
 * { "source" : "Event A" }
 *
 * # Page triggers when this event touches "Event B" or event ID:002
 * { "this touch" : true, "source" : ["Event B", 2] }
 *
 * # Page 2 triggers when event ID:003 touches this event
 * { "call" : 2, "source" : 3 }
 *
 * # Common Event ID:001 triggers when this event touches event ID:004
 * { "call" : { "common event" : 1 }, "this touch" : true, "source" : [4] }
 *
 * # Common Event with name "Common A" triggers when event ID:004 or ID:002 touches this event
 * # the common event will target the event that touched this
 * { "call" : { "common event" : "Common A", "target this" : false }, "source" : [4, 2] }
 *
 * # When this event touches "Event B", the common event named "Common B" triggers
 * { "this touch" : true, "source" : "Event B", "call" : { "common event" : "Common 3" } }
 *
 * Change log:
 *   Version 2.0:
 *     Rewrite - API is completely changed.
 *     Added common event support.
 *   Version 1.1:
 *     Added "Turn Toward" boolean parameter.
 *   Version 1.0:
 *     Initial version.
 *
 */

(function() {

    var CMD_COMMENT = 108;
    var CMD_COMMENT_NEXT = 408;

    var parameters = PluginManager.parameters( "EventTouch" );

    EventTouch.noteRegex = new RegExp( "\\b" + ( parameters["Note Name"] || "event_touch" ) + "\\b", "g" );
    EventTouch.jsonDefine = parameters["JSON Name"] || "Event Touch";
    EventTouch.jsonKeys = {
        thisTouch :     parameters["This Touch Key"] || "this touch",
        source :        parameters["Source Key"] || "source",
        call :          parameters["Call Key"] || "call",
        targetThis :    parameters["Target This Key"] || "target this",
        commonEvent :   parameters["Common Event Key"] || "common event"
    };
    EventTouch.turnToward = parameters["Turn Toward"] != null && ( parameters["Turn Toward"] != "false" );

    function EventTouch() {
        throw new Error( "This is a static class" );
    };

    EventTouch.findEvent = function( key ) {
        if ( typeof( key ) == "string" ) {
            for ( var ii = 0; ii < $dataMap.events.length; ii++ ) {
                if ( $dataMap.events[ii] && $dataMap.events[ii].name == key ) {
                    return $dataMap.events[ii];
                }
            }
        }
        return $dataMap.events[key];
    };

    EventTouch.findCommonEvent = function( key ) {
        if ( typeof( key ) == "string" ) {
            for ( var ii = 0; ii < $dataCommonEvents.length; ii++ ) {
                if ( $dataCommonEvents[ii] && $dataCommonEvents[ii].name == key ) {
                    return $dataCommonEvents[ii];
                }
            }
        }
        return $dataCommonEvents[key];
    };

    EventTouch.Trigger = function( jsonData ) {
        this.interpreter = new Game_Interpreter();

        if ( jsonData[EventTouch.jsonKeys.thisTouch] ) {
            this.checkTrigger = EventTouch.Trigger.checkThisTouchTrigger;
        } else {
            this.checkTrigger = EventTouch.Trigger.checkEventTouchTrigger;
        }

        this.sources = [];
        if ( jsonData[EventTouch.jsonKeys.source].constructor === Array ) {
            for ( var ii = 0; ii < jsonData[EventTouch.jsonKeys.source].length; ii++ ) {
                var source = EventTouch.findEvent( jsonData[EventTouch.jsonKeys.source][ii] );
                if ( source !== undefined ) {
                    this.sources.push( source );
                }
            }
        } else {
            var source = EventTouch.findEvent( jsonData[EventTouch.jsonKeys.source] );
            if ( source !== undefined ) {
                this.sources.push( source );
            }
        }

        if ( this.sources.length == 0 ) {
            for ( var ii = 0; ii < $dataMap.events.length; ii++ ) {
                if ( $dataMap.events[ii] != null ) {
                    this.sources.push( $dataMap.events[ii] );
                }
            }
        }
    };

    EventTouch.Trigger.checkThisTouchTrigger = function( evt ) {
        if ( evt.isMovementSucceeded() ) {
            return null;
        }
        var d = evt._direction;
        var x2 = $gameMap.roundXWithDirection( evt._x, d );
        var y2 = $gameMap.roundYWithDirection( evt._y, d );
        for ( var ii = 0; ii < this.sources.length; ii++ ) {
            var source = $gameMap._events[this.sources[ii].id];
            if ( x2 == source._x && y2 == source._y ) {
                if ( EventTouch.turnToward ) {
                    source.turnTowardCharacter( evt );
                }
                return source;
            }
        }
        return null;
    };

    EventTouch.Trigger.checkEventTouchTrigger = function( evt ) {
        if ( evt.isJumping() || !evt.isNormalPriority() ) {
            return null;
        }
        for ( var ii = 0; ii < this.sources.length; ii++ ) {
            var source = $gameMap._events[this.sources[ii].id];
            if ( source.isMovementSucceeded() ) {
                continue;
            }
            if ( evt._x == $gameMap.roundXWithDirection( source._x, source._direction ) && evt._y == $gameMap.roundYWithDirection( source._y, source._direction ) ) {
                if ( EventTouch.turnToward ) {
                    source.turnTowardCharacter( evt );
                }
                return source;
            }
        }
        return null;
    };

    EventTouch.Trigger.callPage = function( source ) {
        this.interpreter.setup( this.callTarget.pages[this.callPage].list, this.callTarget.id );
    };

    EventTouch.Trigger.callCommon = function( source ) {
        var targetId;
        if ( this.callTarget == null ) {
            targetId = source._eventId;
        } else {
            targetId = this.callTarget.id;
        }
        this.interpreter.setup( this.callCommonEvent.list, targetId );
    };

    EventTouch.Trigger.pageCondition = function( evt ) {
        return evt.meetsConditions( this.callTarget.pages[this.callPage] );
    };

    EventTouch.Trigger.nullCondition = function( evt ) {
        return true;
    };

    EventTouch.Trigger.prototype.update = function( evt ) {
        this.interpreter.update();
        if ( this.callCondition( evt ) ) {
            var touchedEvent = this.checkTrigger( evt );
            if ( touchedEvent ) {
                this.callMethod( touchedEvent );
            }
        }
    };

    EventTouch.eventSupported = function( evt ) {
        return evt !== null && evt.note !== undefined && EventTouch.noteRegex.test( evt.note );
    };

    EventTouch.instantiateEvent = function( evt ) {
        evt.touchTriggers = [];
        for ( var ii = 0; ii < evt.pages.length; ii++ ) {
            var page = evt.pages[ii];

            var jsonString = [];
            for ( var jj = 0; jj < page.list.length; jj++ ) {
                if ( page.list[jj].code == CMD_COMMENT && page.list[jj].parameters[0] == EventTouch.jsonDefine ) {
                    while ( page.list[++jj].code == CMD_COMMENT_NEXT ) {
                        jsonString.push( page.list[jj].parameters[0] );
                    }
                }
            }

            var jsonArray = JSON.parse( "[" + jsonString.join() + "]" );
            for ( var jj = 0; jj < jsonArray.length; jj++ ) {
                var jsonData = jsonArray[jj];
                if ( jsonData[EventTouch.jsonKeys.source] === undefined ) {
                    jsonData[EventTouch.jsonKeys.source] = []; // Source defaults to everything
                }

                var trigger = new EventTouch.Trigger( jsonData );

                var callValue = jsonData[EventTouch.jsonKeys.call];
                if ( callValue === undefined ) {
                    trigger.callCondition = EventTouch.Trigger.pageCondition;
                    trigger.callMethod = EventTouch.Trigger.callPage;
                    trigger.callTarget = evt;
                    trigger.callPage = ii;
                } else if ( typeof( callValue ) == "number" ) {
                    trigger.callCondition = EventTouch.Trigger.pageCondition;
                    trigger.callMethod = EventTouch.Trigger.callPage;
                    trigger.callTarget = evt;
                    trigger.callPage = callValue - 1;
                } else if ( typeof( callValue ) == "object" ) {
                    trigger.callCondition = EventTouch.Trigger.nullCondition;
                    trigger.callMethod = EventTouch.Trigger.callCommon;
                    if ( callValue[EventTouch.jsonKeys.targetThis] === undefined || callValue[EventTouch.jsonKeys.targetThis] != false ) {
                        trigger.callTarget = evt;
                    } else {
                        trigger.callTarget = null;
                    }
                    trigger.callCommonEvent = EventTouch.findCommonEvent( callValue[EventTouch.jsonKeys.commonEvent] );
                }

                evt.touchTriggers.push( trigger );
            }
        }
    };

    var _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        var movedLastUpdate = this.isMovementSucceeded();
        _Game_Event_update.call( this );
        if ( !movedLastUpdate || !this.isMovementSucceeded() ) {
            this.setMovementSuccess( false );
        } else {
            this.setMovementSuccess( true );
        }
        var evt = $dataMap.events[this._eventId];
        if ( evt.touchTriggers !== undefined ) {
            for ( var ii = 0; ii < evt.touchTriggers.length; ii++ ) {
                evt.touchTriggers[ii].update( this );
            }
        }
    };

    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function( object ) {
        _DataManager_onLoad.call( this, object );
        if ( object === $dataMap ) {
            for ( var ii = 0; ii < object.events.length; ii++ ) {
                if ( EventTouch.eventSupported( object.events[ii] ) ) {
                    EventTouch.instantiateEvent( object.events[ii] );
                }
            }
        }
    };

})();
