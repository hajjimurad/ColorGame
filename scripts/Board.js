/**
 * Created by murad on 18/10/15.
 */

define(["Cell"], function (Cell) {

    function Board(initialData) {

        this.size = 0;
        this.cells = [];

        if (initialData) {
            if (initialData.constructor !== Array)
                throw "invalid initial data";
            else {
                var calculatedSize = Math.sqrt(initialData.length);
                if (calculatedSize !== Math.ceil(calculatedSize)) {
                    throw "invalid initial data";
                }
                else {
                    this.size = calculatedSize;
                }
            }

            this.init(initialData);

        } else {
            throw "no initial data";
        }
    }

    Board.prototype = {
        constructor: Board,
        init: function (data) {
            for (var i = 0; i < this.size; i++) {
                this.cells[i] = new Array(this.size);
                for (var j = 0; j < this.size; j++) {
                    this.cells[i][j] = new Cell(data[i * this.size + j]);
                }
            }
        },
        getCellByCoords: function (i, j) {
            return this.cells[i][j];
        },
        forEach: function (callback) {
            for (var i = 0; i < this.size; i++)
                for (var j = 0; j < this.size; j++) {
                    var cell = this.getCellByCoords(i, j);
                    callback(cell, i, j);
                }
        },
        getCells: function () {
            var result = [];

            this.forEach(function (cell) {
                result.push(cell);
            });

            return result;
        },
        getCellsColors: function () {
            var resultColors = [];
            this.forEach(function (cell) {
                resultColors.push(cell.getColor());
            });

            return resultColors;
        },
        getMarkedCellsCoords: function () {
            var markedCellsCoords = [];
            this.forEach(function (cell, i, j) {
                if (cell.getMark()) {
                    markedCellsCoords.push({x: i, y: j});
                }
            });

            return markedCellsCoords;
        },
        resetMarkedCells: function () {
            this.forEach(function (cell) {
                cell.setMark(false);
            });
        },
        getNeighboursPositions: function (i, j) {

            var positionsRaw = [
                {x: i - 1, y: j},
                {x: i, y: j + 1},
                {x: i + 1, y: j},
                {x: i, y: j - 1}
            ];

            var resultPositions = [];

            var self = this;
            positionsRaw.forEach(function (element) {
                var position = element;
                if (position.x < 0 || position.x >= self.size)
                    return;

                if (position.y < 0 || position.y >= self.size)
                    return;

                resultPositions.push(position);
            });

            return resultPositions;
        },
        getDifferentNeighboursAndMarkArea: function (i, j) {
            var resultCoords = [];

            this.cells[i][j].setMark(true);

            this.doGetDifferentCells(i, j, resultCoords);

            var self = this;
            resultCoords.forEach(function (item) {
                var cell = self.getCellByCoords(item.x, item.y);
                cell.setMark(false);
            });

            return resultCoords;
        },
        doGetDifferentCells: function (i, j, resultCollection) {

            var currentCellColor = this.cells[i][j].getColor();

            var neighbours = this.getNeighboursPositions(i, j);

            var self = this;
            neighbours.forEach(function (coords) {

                var cell = self.cells[coords.x][coords.y];

                if (cell.getMark())
                    return;

                cell.setMark(true);

                if (cell.getColor() !== currentCellColor) {
                    resultCollection.push(coords);
                }
                else {
                    self.doGetDifferentCells(coords.x, coords.y, resultCollection);
                }
            });
        }
    };

    return Board;
});