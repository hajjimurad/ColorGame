/**
 * Created by murad on 22/10/15.
 */

define(["StrategyBase"], function (StrategyBase) {

    function StrategySimple() {
        var self = this;

        self.init = function (board, initialCoords) {
            StrategySimple.prototype.init(board, initialCoords);
        };

        self.nextStep = function () {
            var neighboursCoords = self._board.getDifferentNeighboursAndMarkArea(self._initialCoords.x, self._initialCoords.y);

            if (!neighboursCoords || neighboursCoords.length === 0)
                return false;

            var neighbourColors = [];
            neighboursCoords.forEach(function (item) {
                var cell = self._board.getCellByCoords(item.x, item.y);
                neighbourColors.push(cell.getColor());
            });

            var nextColor = self.getNextColor(neighbourColors);

            self._board.forEach(function (cell) {
                if (cell.getMark() && cell.getColor() !== nextColor) {
                    cell.setColor(nextColor);
                }
            });

            self._board.resetMarkedCells();

            self.stepForward();

            return true;
        };

        self.getNextColor = function (colorsToChoose) {
            var occurrences = self.getNeighboursColorOccurrences(colorsToChoose);
            return self.getColorMaxOccurrence(occurrences);
        }

    }

    StrategySimple.prototype = new StrategyBase();

    return StrategySimple;
});
