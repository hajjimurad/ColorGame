/**
 * Created by murad on 18/10/15.
 */

define(["Cell"], function (Cell) {
    /**
     * Board data
     */
    function Board(initialData) {

        var self = this;

        self.size = 0;
        var cells = [];

        /**
         * Initializes 2 dimension array
         */
        var init = function (data) {
            for (var i = 0; i < self.size; i++) {
                cells[i] = new Array(self.size);
                for (var j = 0; j < self.size; j++) {
                    cells[i][j] = new Cell(data[i * self.size + j]);
                }
            }
        }

        if (initialData) {
            if (initialData.constructor !== Array)
                throw "invalid initial data";
            else {
                var calculatedSize = Math.sqrt(initialData.length);
                if (calculatedSize !== Math.ceil(calculatedSize)) {
                    throw "invalid initial data";
                }
                else {
                    self.size = calculatedSize;
                }
            }

            init(initialData);

        } else {
            throw "no initial data";
        }

        /**
         * Shows internal array data
         */
        self.getCellsColors = function () {
            var resCellColors = [];

            for (var i = 0; i < self.size; i++) {
                for (var j = 0; j < self.size; j++) {
                    resCellColors[i * self.size + j] = cells[i][j].color;
                }
            }
            return resCellColors;
        };

        /**
         * Returns data by coords
         */
        self.getCellByCoords = function (i, j) {
            return cells[i][j];
        };

        /**
         * Returns neighbours of current position
         */
        self.getNeighboursPositions = function (i, j) {

            var positionsRaw = [
                {x: i - 1, y: j},
                {x: i, y: j + 1},
                {x: i + 1, y: j},
                {x: i, y: j - 1}
            ];

            var resultPositions = [];
            for (var i in positionsRaw) {
                var position = positionsRaw[i];
                if (position.x < 0 || position.x >= self.size)
                    continue;

                if (position.y < 0 || position.y >= self.size)
                    continue;

                resultPositions.push(position);
            }

            return resultPositions;
        }
    }

    return Board;
})