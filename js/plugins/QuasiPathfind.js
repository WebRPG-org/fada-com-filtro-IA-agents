//============================================================================
// Quasi Pathfind
// Version: 1.07
// Last Update: January 8, 2016
//============================================================================
// ** Terms of Use
// http://quasixi.com/mv/
// https://github.com/quasixi/RPG-Maker-MV/blob/master/README.md
//============================================================================
// How to install:
//  - Save this file as "QuasiPathfind.js" in your js/plugins/ folder
//  - Add plugin through the plugin manager
//  - - Place somewhere below QuasiMovement
//  - Configure as needed
//  - Open the Help menu for setup guide or visit one of the following:
//  - - http://quasixi.com/mv/
//  - - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
//============================================================================

var Imported = Imported || {};
Imported.Quasi_PathFind = 1.07;

//=============================================================================
 /*:
 * @plugindesc Quasi Movement Addon: A star Pathfinding plugin. ( Non-Optimized)
 * @author Quasi      Site: http://quasixi.com
 *
 * @param Search Limit
 * @desc Max amount of tiles to search.
 * default: 2000     MV Default: 12
 * @default 2000
 *
 * @param Pathfind on Click
 * @desc Set if the player will pathfind to the clicked location.
 * default: true
 * @default true
 *
 * @param Optimize Move Tiles
 * @desc Setting this to true will make pathfinding faster but less accurate
 * if you are doing pixel based.
 * @default true
 *
 * @param Half Optimize
 * @desc Uses half the value from Optimize Move Tiles. Slightly increases
 * pathfinding accuracy.
 * @default true
 *
 * @param Show Console Logs
 * @desc Shows logs about the path finding and time taken.
 * default: false
 * @default false
 *
 * @help
 * =============================================================================
 * ** Using Pathfinding
 * =============================================================================
 * By default, the player will pathfind to the location on the map that you
 * click on. But you can also move the player or events with a script call.
 *   Force Pathfind <Script Call> (pixel based)
 *       $gamePlayer.pathFind(pixelX, pixelY)
 *           or
 *       $gameMap.event(ID).pathFind(pixelX, pixelY)
 *     Set pixelX and pixelY to the location you want to reach, in pixel coordinates.
 *
 *   Force Pathfind <Script Call> (grid based)
 *       $gamePlayer.pathFindGrid(x, y)
 *           or
 *       $gameMap.event(ID).pathFindGrid(x, y)
 *     Set x and y to the location you want to reach, in grid coordinates.
 *
 *   Pathfind towards a character <Script Call>
 *       $gamePlayer.pathFindTowards(CharaID)
 *           or
 *       $gameMap.event(ID).pathFindGrid(CharaID)
 *     Set CharaID to the ID of the event you want to scroll towards.
 *      - If CharaID is set to 0, then it will scroll to the player.
 * =============================================================================
 * ** Move Route
 * =============================================================================
 * * The following are to be placed inside "Script..." commands
 *  Script calls for Move Routes:
 *       pathFind(pixelX, pixelY)
 *         and
 *       pathFindGrid(x, y)
 *         and
 *       pathFindTowards(CharaID)
 *     Same as the script call settings above.
 * =============================================================================
 * Links
 *  - http://quasixi.com/mv/
 *  - https://github.com/quasixi/RPG-Maker-MV
 *  - http://forums.rpgmakerweb.com/index.php?/topic/48741-quasi-movement/
 */
//=============================================================================

if (!Imported.Quasi_Movement) {
  alert("Error: Quasi Pathfind requires Quasi Movement to work.");
  throw new Error("Error: Quasi Pathfind requires Quasi Movement to work.")
}
(function() {
  var Pathfind = {}
  Pathfind.proccessParameters = function() {
    var parameters   = PluginManager.parameters('QuasiPathfind');
    this.searchLimit = Number(parameters['Search Limit'] || 2);
    this.moveOnClick = parameters['Pathfind on Click'].toLowerCase() === "true";
    this.showLog     = parameters['Show Console Logs'].toLowerCase() === "true";
    this.optTiles    = parameters['Optimize Move Tiles'].toLowerCase() === "true";
    this.halfOpt     = parameters['Half Optimize'].toLowerCase() === "true";
  };
  Pathfind.proccessParameters();

  Pathfind.node = function(parent, point) {
    var mapWidth = $gameMap.width() * QuasiMovement.tileSize;
    var node = {
      parent: parent,
      x: point[0],
      y: point[1],
      value: point[0] + (point[1] * mapWidth),
      f: 0,
      g: 0
    };
    return node;
  };

  Pathfind.nodeDistance = function(initial, final) {
    //return this.realDistanceSqd(initial, final);
    return this.manhattanDistance(initial, final);
  };

  Pathfind.manhattanDistance = function(initial, final) {
    return Math.abs(initial.x - final.x) + Math.abs(initial.y - final.y);
  };

  Pathfind.realDistanceSqd = function(initial, final) {
    var dx = initial.x - final.x;
    var dy = initial.y - final.y;
    return dx * dx + dy * dy;
  };

  //-----------------------------------------------------------------------------
  // Game_Character
  //
  // The superclass of Game_Player, Game_Follower, GameVehicle, and Game_Event.

  var Alias_Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
  Game_Character.prototype.processMoveCommand = function(command) {
    var gc = Game_Character;
    var params = command.parameters;
    if (command.code === gc.ROUTE_SCRIPT) {
      var find  = /pathFind\((.*)\)/i.exec(params[0]);
      var findG = /pathFindGrid\((.*)\)/i.exec(params[0]);
      var findC = /pathFindTowards\((.*)\)/i.exec(params[0]);
      if (find) {
        find = QuasiMovement.stringToAry(find[1]);
        find = find.constructor === Array ? find : [findG];
        this.pathFind(find[0], find[1], true);
        return;
      }
      if (findG) {
        findG = QuasiMovement.stringToAry(findG[1]);
        findG = findG.constructor === Array ? findG : [findG];
        this.pathFindGrid(findG[0], findG[1], true);
        return;
      }
      if (findC) {
        findC = Number(findC[1]);
        this.pathFindTowards(findC, true);
        return;
      }
    }
    Alias_Game_Character_processMoveCommand.call(this, command);
  };

  Game_Character.prototype.updatePathFind = function(goalX, goalY) {
    if (this._pathFind && this._pathFind.path) {
      if (this._pathFind.path.length === 1) {
        this._pathFind = null;
        $gameTemp.clearDestination();
        return;
      }
      if (this._tempGoal[0] !== $gameTemp.destinationPX() ||
          this._tempGoal[1] !== $gameTemp.destinationPY()) {
        this._pathFind = null;
        return;
      }
      var dir, dist;
      var current = this._pathFind.path.shift();
      var next = this._pathFind.path[0];
      var sx = current[0] - next[0];
      var sy = current[1] - next[1];
      /*
      if (sx !== 0 && sy !== 0) {
        horz = sx > 0 ? 4 : 6;
        vert = sy > 0 ? 8 : 2;
        dist = Math.abs(sx);
        this.fixedDiagMove(horz, vert, dist);
        return;
      }
      */
      if (Math.abs(sx) > Math.abs(sy)) {
        dir  = sx > 0 ? 4 : 6;
        dist = Math.abs(sx);
      } else if (sy !== 0) {
        dir  = sy > 0 ? 8 : 2;
        dist = Math.abs(sy);
      }
      this.fixedMove(dir, dist);
    }
  };

  Game_Character.prototype.startPathFind = function(goalX, goalY) {
    if (!Pathfind.moveOnClick) return;
    var half = QuasiMovement.tileSize / 2;
    goalX -= half;
    goalY -= half;
    this.pathFind(goalX, goalY);
  };

  Game_Character.prototype.pathFindGrid = function(goalX, goalY, forced) {
    var x = goalX * QuasiMovement.tileSize;
    var y = goalY * QuasiMovement.tileSize;
    this.pathFind(x, y, forced);
  };

  Game_Character.prototype.pathFindTowards = function(chara, forced) {
    chara = chara === 0 ? $gamePlayer : $gameMap.event(chara);
    if (this === chara) return;
    var x = chara._px;
    var y = chara._py;
    this.pathFind(x, y, forced);
  };

  Game_Character.prototype.pathFind = function(goalX, goalY, forced, skipNeighbor) {
    this._pathFind = {};
    this._pathFind.path = null;
    if (goalX === this._px && goalY === this._py) {
      return this._pathFind = null;
    }
    if (!this.canPixelPass(goalX, goalY, 5)) {
      if (Pathfind.showLog) console.log("Trying Neighboring points");
      var neighbor = skipNeighbor ? false : this.anyNeighborPass(goalX, goalY);
      this.collider().moveto(this._px, this._py);
      if (neighbor) {
        if (Pathfind.showLog) console.log("Neighboring points found");
        return this.pathFind(neighbor[0], neighbor[1], forced, [goalX, goalY]);
      } else {
        if (Pathfind.showLog) console.log("Not passable");
        $gameTemp.clearDestination();
        return this._pathFind = null;
      }
    }
    if (!this.canPixelPass(this._px, this._py, 5)) {
      if (Pathfind.showLog) console.log("Can't move");
      $gameTemp.clearDestination();
      return this._pathFind = null;
    }
    this._pathFind.path = this.aStar([this._px, this._py], [goalX, goalY]);
    this.collider().moveto(this._px, this._py);
    if (this === $gamePlayer && !forced) {
      if (skipNeighbor) this._pathFind.path.push(skipNeighbor);
      this._tempGoal = [$gameTemp.destinationPX(), $gameTemp.destinationPY()];
    } else {
      this.endPathFind(typeof forced === 'undefined' ? true : forced);
      this._pathFind = null;
    }
  };

  Game_Character.prototype.endPathFind = function(forced) {
    var move = {
      2: Game_Character.ROUTE_MOVE_DOWN,     4: Game_Character.ROUTE_MOVE_LEFT,
      6: Game_Character.ROUTE_MOVE_RIGHT,    8: Game_Character.ROUTE_MOVE_UP
    }
    if (forced) {
      var route = {};
      route.list = [];
      route.repeat = false;
      route.skippable = false;
      route.wait = false;
    } else {
      var route = this._moveRoute;
    }
    var current = this._pathFind.path.shift();
    for (var i = 0, j = this._pathFind.path.length; i < j; i++) {
     var sx = current[0] - this._pathFind.path[i][0];
     var sy = current[1] - this._pathFind.path[i][1];
     var dist, dir;
     if (Math.abs(sx) > Math.abs(sy)) {
       dir = sx > 0 ? 4 : 6;
       dist = Math.abs(sx);
     } else if (sy !== 0) {
       dir = sy > 0 ? 8 : 2;
       dist = Math.abs(sy);
     }
     var steps = Math.floor(dist / this.moveTiles());
     var moved = 0;
     var command;
     for (var k = 0; k < steps; k++) {
       moved += this.moveTiles();
       command = {};
       command.code = move[dir];
       if (forced) {
         route.list.push(command);
       } else {
         this._moveRoute.list.splice(this._moveRouteIndex + 1 + i, 0, command);
       }
     }
     if (moved < dist ) {
       command = {};
       command.code = "fixedMove";
       command.parameters = [dir, dist - moved];
       if (forced) {
         route.list.push(command);
       } else {
         this._moveRoute.list.splice(this._moveRouteIndex + 1 + i, 0, command);
       }
     }
     current = this._pathFind.path[i];
    }
    if (forced) {
     command = {};
     command.code = 0;
     route.list.push(command);
     this.forceMoveRoute(route);
    } else {
     this._moveRoute.list.splice(this._moveRouteIndex, 1);
    }
  };

  Game_Character.prototype.aStar = function(start, end) {
    var startNode = Pathfind.node(null, start);
    var endNode = Pathfind.node(null, end);
    var openNodes = [startNode];
    var closedValues = {};
    closedValues[startNode.value] = true;
    var current = startNode;
    var neighbors, newNode, finalPath;
    var max = Pathfind.searchLimit;
    var i, j;
    var finalPath = [];
    if (Pathfind.showLog) {
      console.log("Pathfinding Started");
      console.time("Pathfind");
    }
    while(openNodes.length !== 0) {
      max--;
      if (max === 0) {
        if (Pathfind.showLog) console.log("Pathfinding reached search Limit.");
        finalPath = this.createPathFrom(current);
        break;
      }
      current = openNodes[0];
      for (i = 0; i < openNodes.length; i++) {
        if (openNodes[i].f < current.f) current = openNodes[i];
      }
      if (current.value === endNode.value) {
        if (Pathfind.showLog) console.log("Pathfinding found end point.");
        finalPath = this.createPathFrom(current);
        break;
      }
      openNodes.splice(openNodes.indexOf(current), 1);
      neighbors = this.findNeighbors(current.x, current.y, endNode);
      for (i = 0, j = neighbors.length; i < j; i++) {
        newNode = Pathfind.node(current, neighbors[i]);
        if (!closedValues[newNode.value]) {
          newNode.g = current.g + Pathfind.nodeDistance(newNode, current);
          newNode.f = newNode.g + Pathfind.nodeDistance(newNode, endNode);
          openNodes.push(newNode);
          closedValues[newNode.value] = true;
        }
      }
    }
    if (Pathfind.showLog) console.timeEnd("Pathfind");
    finalPath.unshift([startNode.x, startNode.y]);
    return finalPath;
  };

  Game_Character.prototype.findNeighbors = function(x, y, endNode) {
    var neighbors = [];
    var i, dir, x2, y2, successor;
    var nearEnd = Math.abs(x - endNode.x) < QuasiMovement.tileSize &&
                  Math.abs(y - endNode.y) < QuasiMovement.tileSize;
    var tiles = nearEnd ? this.moveTiles() : this.optTiles();
    for (i = 1; i < 5; i++) {
      dir = i * 2;
      if (this.canPixelPass(x, y, dir, tiles)) {
        x2 = $gameMap.roundPXWithDirection(x, dir, tiles);
        y2 = $gameMap.roundPYWithDirection(y, dir, tiles);
        if (Math.abs(x2 - endNode.x) < tiles &&
            Math.abs(y2 - endNode.y) < tiles) {
          neighbors.push([endNode.x, endNode.y]);
        } else {
          neighbors.push([x2, y2]);
        }
        continue;
      }
      if (Pathfind.successor) {
        successor = this.findSuccessors(x, y, x2, y2, dir, tiles);
        if (successor) neighbors.push(successor);
      }
    }
    if (Pathfind.diagonal) {
      neighbors.concat(this.findDiagNeighbors(x, y, endNode));
    }
    return neighbors;
  };

  // * Adds diagonal neighbors
  // Doesn't completely work, must be an issue with parenting or f score since
  // when it reconstructs the path, it does horz and vert moves instead of
  // a single diagonal move
  Game_Character.prototype.findDiagNeighbors = function(x, y, endNode) {
    var neighbors = [];
    var i, horz, vert, x2, y2;
    var tiles = this.optTiles();
    var dir8 = [[4, 2], [4, 8], [6, 2], [6, 8]];
    for (i = 0; i < 4; i++) {
      horz = dir8[i][0];
      vert = dir8[i][1];
      if (this.canPixelPassDiagonally(x, y, horz, vert, tiles)) {
        x2 = $gameMap.roundPXWithDirection(x, horz, tiles);
        y2 = $gameMap.roundPYWithDirection(y, vert, tiles);
        if (Math.abs(x2 - endNode.x) < tiles &&
            Math.abs(y2 - endNode.y) < tiles) {
          neighbors.push([endNode.x, endNode.y]);
        } else {
          neighbors.push([x2, y2]);
        }
      }
    }
    return neighbors;
  };

  // * A Precision fix for optimize tiles.
  // Doesn't completely work since it adds unpassable tiles
  // to the list sometimes.
  Game_Character.prototype.findSuccessors = function(x1, y1, x2, y2, dir, tiles) {
    if (tiles === this.moveTiles() || !Pathfind.optTiles) return;
    var dir = this.reverseDir(dir);
    var amt = tiles / this.moveTiles();
    var success, i, dist;
    for (i = 0; i < amt; i++) {
      if (this.canPixelPass(x2, y2, 5)) {
        success = [x2, y2];
        break;
      }
      x2 = $gameMap.roundPXWithDirection(x2, dir, this.moveTiles());
      y2 = $gameMap.roundPYWithDirection(y2, dir, this.moveTiles());
    }
    return success;
  };

  Game_Character.prototype.optTiles = function() {
    if (!Pathfind.optTiles || !QuasiMovement.offGrid) {
      return this.moveTiles();
    }
    if (!this._optTiles) {
      var w = Math.round(this.collider().width);
      if (Pathfind.halfOpt) w /= 2;
      var h = Math.round(this.collider().height);
      if (Pathfind.halfOpt) h /= 2;
      while (w % this.moveTiles() !== 0) {
        w--;
        if (w <= this.moveTiles()) break;
      }
      while (h % this.moveTiles() !== 0) {
        h--;
        if (h <= this.moveTiles()) break;
      }
      this._optTiles = Math.max(Math.min(w, h), this.moveTiles());
    }
    return this._optTiles;
  };

  Game_Character.prototype.anyNeighborPass = function(x, y) {
    var dir, x2, y2, steps, distx, disty;
    var maxDist = QuasiMovement.tileSize;
    var neighbors = [];
    for (var i = 1; i < 5; i++) {
      dir = i * 2;
      x2 = x;
      y2 = y;
      steps = 0;
      while (!this.canPixelPass(x2, y2, 5)) {
        x2 = $gameMap.roundPXWithDirection(x2, dir, this.moveTiles());
        y2 = $gameMap.roundPYWithDirection(y2, dir, this.moveTiles());
        steps += this.moveTiles();
        if (steps >= maxDist) break;
      }
      if (!this.canPixelPass(x2, y2, 5)) continue;
      distx = Math.abs(this.px - x2)
      disty = Math.abs(this.py - y2);
      neighbors.push([x2, y2, Math.sqrt(distx * distx + disty * disty)]);
    }
    if (neighbors.length === 0) return false;
    neighbors.sort(function(a, b) {
      return a[2] - b[2];
    });
    return neighbors[0];
  };

  Game_Character.prototype.createPathFrom = function(node) {
    var path = [];
    do {
      path.push([node.x, node.y]);
      node = node.parent;
    }while(node.parent);
    return path.reverse();
  };
})();
