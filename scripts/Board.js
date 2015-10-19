/**
 * Created by murad on 18/10/15.
 */

define(function () {
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
                    cells[i][j] = data[i * self.size + j];
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
        self.getData = function () {
            var resCells = [];

            for (var i = 0; i < self.size; i++) {
                for (var j = 0; j < self.size; j++) {
                    resCells[i * self.size + j] = cells[i][j];
                }
            }
            return resCells;
        };

        /**
         * Returns data by coords
         */
        self.getByCoords = function (i, j) {
            return cells[i][j];
        };
    }

    return Board;
})