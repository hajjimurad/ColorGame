/**
 * Created by murad on 25/10/15.
 */

define(function () {
    /**
     * Game itself
     */
    function Game(board, strategy, initialCoords) {

        var self = this;

        var _board = board;
        var _strategy = strategy;
        var _initialCoords = initialCoords;

        /**
         * Next step of the game
         */
        self.nextStep = function () {
            var neighboursCoords = _board.getDifferentNeighboursAndMarkArea(_initialCoords.x, _initialCoords.y);

            if (!neighboursCoords || neighboursCoords.length === 0)
                return false;

            var neighbourColors = [];
            neighboursCoords.forEach(function (item) {
                var cell = _board.getCellByCoords(item.x, item.y);
                neighbourColors.push(cell.color);
            })

            var nextColor = _strategy.getNextColor(neighbourColors);

            _board.forEach(function (cell, i, j) {
                if (cell.getMark() && cell.color !== nextColor) {
                    cell.color = nextColor;
                    console.log(i + " " + j);
                }
            });

            _board.resetMarks();

            return true;
        };
    }

    return Game;
});