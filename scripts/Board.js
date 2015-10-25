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
        };

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
         * Returns data by coords
         */
        self.getCellByCoords = function (i, j) {
            return cells[i][j];
        };

        /**
         * Runs any action for all the cells
         */
        self.forEach = function (callback) {
            for (var i = 0; i < self.size; i++)
                for (var j = 0; j < self.size; j++) {
                    var cell = this.getCellByCoords(i, j);
                    callback(cell, i, j);
                }
        };

        /**
         * Resets the state of all cells
         */
        self.resetMarks = function () {
            self.forEach(function (cell) {
                cell.setMark(false);
            })
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
            positionsRaw.forEach(function (element) {
                var position = element;
                if (position.x < 0 || position.x >= self.size)
                    return;

                if (position.y < 0 || position.y >= self.size)
                    return;

                resultPositions.push(position);
            });

            return resultPositions;
        };

        /**
         * Searches for neighbours of another color recursively
         */
        self.findNeighboursOfAnotherColor = function (i, j) {
            var resultCoords = [];

            cells[i][j].setMark(true);

            getNeighboursOfAnotherColor(i, j, resultCoords);

            resultCoords.forEach(function (item) {
                var cell = self.getCellByCoords(item.x,item.y);
                cell.setMark(false);
            })

            return resultCoords;
        };

        var getNeighboursOfAnotherColor = function (i, j, resultCollection) {

            var currentCellColor = cells[i][j].color;

            var neighbours = self.getNeighboursPositions(i, j);
            neighbours.forEach(function (coords) {

                var cell = cells[coords.x][coords.y];

                if (cell.getMark())
                    return;

                cell.setMark(true);

                if (cell.color !== currentCellColor) {
                    resultCollection.push(coords);
                }
                else {
                    getNeighboursOfAnotherColor(coords.x, coords.y, resultCollection);
                }
            });
        };

        /**
         * Marked cells
         */
        self.getMarkedCellsCoords = function () {
            var markedCellsCoords = [];
            this.forEach(function (cell, i, j) {
                if (cell.getMark()) {
                    markedCellsCoords.push({x: i, y: j});
                }
            });

            return markedCellsCoords;
        }
    }

    return Board;
});