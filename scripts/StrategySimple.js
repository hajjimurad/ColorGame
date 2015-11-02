/**
 * Created by murad on 22/10/15.
 */

define(["StrategyBase"], function (StrategyBase) {

    function StrategySimple() {
        var self = this;

        self.nextStep = function () {
            var neighboursCoords = self.board.getDifferentNeighboursAndMarkArea(self.initialCoords.x, self.initialCoords.y);

            if (!neighboursCoords || neighboursCoords.length === 0)
                return false;

            var neighbourColors = [];
            neighboursCoords.forEach(function (item) {
                var cell = self.board.getCellByCoords(item.x, item.y);
                neighbourColors.push(cell.getColor());
            });

            var nextColor = self.getNextColor(neighbourColors);

            self.board.forEach(function (cell) {
                if (cell.getMark() && cell.getColor() !== nextColor) {
                    cell.setColor(nextColor);
                }
            });

            self.board.resetMarkedCells();

            self.stepForward();

            return true;
        };

        var getIndexOfCalculatedColor = function (existentColors, colorToFind) {
            for (var i = 0; i < existentColors.length; i++) {
                if (existentColors[i].color === colorToFind)
                    return i;
            }
            return null;
        };

        self.getNeighboursColorOccurrences = function (neighboursColors) {

            var occurrences = [];

            for (var i = 0; i < neighboursColors.length; i++) {
                var color = neighboursColors[i];

                var indexOfOccurrence = getIndexOfCalculatedColor(occurrences, color);
                if (indexOfOccurrence === null) {
                    occurrences.push({color: color, occurrence: 1})
                }
                else {
                    occurrences[indexOfOccurrence].occurrence = occurrences[indexOfOccurrence].occurrence + 1;
                }
            }
            return occurrences;
        };

        self.getNextColor = function (colorsToChoose) {
            var occurrences = self.getNeighboursColorOccurrences(colorsToChoose);
            return self.getColorMaxOccurrence(occurrences);
        }
    }

    StrategySimple.prototype = new StrategyBase();

    return StrategySimple;
});
