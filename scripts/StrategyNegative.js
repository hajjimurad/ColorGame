/**
 * Created by murad on 22/10/15.
 */

define(["StrategyBase"], function (StrategyBase) {

    function StrategyNegative() {
        var self = this;

        self.getNeighboursColors = function (neighboursCoords) {
            var neighbourColors = [];
            neighboursCoords.forEach(function (item) {
                var cell = self.board.getCellByCoords(item.x, item.y);
                neighbourColors.push(cell.getColor());
            });

            return neighbourColors;
        };

        self.changeCellsColor = function (nextColor) {
            self.board.forEach(function (cell) {
                if (cell.getMark() && cell.getColor() !== nextColor) {
                    cell.setColor(nextColor);
                }
            });
        };

        self.nextStep = function () {
            var neighboursCoords = self.board.getDifferentNeighboursAndMarkArea(self.initialCoords.x, self.initialCoords.y);

            if (!neighboursCoords || neighboursCoords.length === 0)
                return false;
            
            self.changeCellsColor(self.getNextColor(self.getNeighboursColors(neighboursCoords)));

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

        self.getColorMinOccurrence = function (occurrences) {
            var mostUnpopularColor = null;
            var minOccurrence = Number.MAX_VALUE;
            for (var i = 0; i < occurrences.length; i++) {

                var colorOccurrence = occurrences[i];
                if (minOccurrence > colorOccurrence.occurrence) {
                    mostUnpopularColor = colorOccurrence.color;
                    minOccurrence = colorOccurrence.occurrence;
                }
                else if (minOccurrence == colorOccurrence.occurrence) {
                    if (colorOccurrence.color < mostUnpopularColor) {
                        mostUnpopularColor = colorOccurrence.color;
                    }
                }
            }
            return mostUnpopularColor;
        };


        self.getNextColor = function (colorsToChoose) {
            var occurrences = self.getNeighboursColorOccurrences(colorsToChoose);
            return self.getColorMinOccurrence(occurrences);
        }
    }

    StrategyNegative.prototype = new StrategyBase();

    return StrategyNegative;
});
