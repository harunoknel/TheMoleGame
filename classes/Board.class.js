(function () {
  "use strict";

  /**
   * @param {JSONMap} map
   * @constructor
   */
  window.Board = function (map) {
    var startTile = null,
      endTiles = [],
      tiles = null;

    function init() {
      var i, type, tile, x, y;

      if (map.width * map.height !== map.tiles.length) {
        throw "Map definition is invalid. Width * Height != number of tiles.";
      }

      tiles = [];
      for(i = 0; i < map.height; i++) {
        tiles.push([]);
      }

      for (i = 0; i < map.tiles.length; i++) {
        x = i % map.width;
        y = Math.floor(i / map.width);
        type = map.tiles[i];
        tile = new Tile(x, y, type);

        tiles[y][x] = tile;

        if (tile.isStart()) {
          startTile = tile;
        }
        if (tile.isEnd()) {
          endTiles.push(tile);
        }
      }

      if (!startTile) {
        throw "Map definition is invalid. There are no start tiles.";
      }
      if (!endTiles.length) {
        throw "Map definition is invalid. There are no end tiles.";
      }
    }

    init();

    function failIfInvalidTile(x, y) {
      if (tiles[y] === undefined || tiles[y][x] === undefined) {
        throw 'Invalid area index ' + x + ', ' + y;
      }
    }

    /*********************
     ******* PUBLIC *******
     **********************/

    /**
     * Get map width.
     * @returns {number}
     */
    this.getWidth = function () {
      return map.width;
    };

    /**
     * Get map height.
     * @returns {number}
     */
    this.getHeight = function () {
      return map.height;
    };

    /**
     * Get array of starting tiles.
     * @returns {Tile}
     */
    this.getStartTilePosition = function () {
      return startTile;
    };

    /**
     * Get array of ending tiles.
     * @returns {Tile[]} Array with x and y positions of objects
     */
    this.getEndTilesPositions = function () {
      return endTiles;
    };

    /**
     * Return single tile at given position.
     *
     * @param x {number}
     * @param y {number}
     * @returns {Tile}
     */
    this.getTile = function (x, y) {
      failIfInvalidTile(x, y);

      return tiles[y][x];
    };
  };
}());