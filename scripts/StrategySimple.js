/**
 * Created by murad on 22/10/15.
 */

define(function () {

    function SimpleStrategy(board, initiaCoords) {
        var _board = board;
        var _initialCoords = initiaCoords;

        this.nextStep = function () {
            var neighboursCoords = _board.getDifferentNeighboursAndMarkArea(_initialCoords.x, _initialCoords.y);

            if (!neighboursCoords || neighboursCoords.length === 0)
                return false;

            var neighbourColors = [];
            neighboursCoords.forEach(function (item) {
                var cell = _board.getCellByCoords(item.x, item.y);
                neighbourColors.push(cell.getColor());
            });

            var nextColor = this.getNextColor(neighbourColors);

            _board.forEach(function (cell) {
                if (cell.getMark() && cell.getColor() !== nextColor) {
                    cell.setColor(nextColor);
                }
            });

            _board.resetMarkedCells();

            return true;
        };

        this.getNextColor = function (colorsToChoose) {
            var occurrences = this.getNeighboursColorOccurrences(colorsToChoose);
            return this.getColorMaxOccurrence(occurrences);
        }

        var getIndexOfCalculatedColor = function (existentColors, colorToFind) {
            for (var i = 0; i < existentColors.length; i++) {
                if (existentColors[i].color === colorToFind)
                    return i;
            }
            return null;
        };

        this.getNeighboursColorOccurrences = function (neighboursColors) {

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

        this.getColorMaxOccurrence = function (occurrences) {

            var mostPopularColor = null;
            var maxOccurrence = 0;
            for (var i = 0; i < occurrences.length; i++) {

                var colorOccurrence = occurrences[i];
                if (maxOccurrence < colorOccurrence.occurrence) {
                    mostPopularColor = colorOccurrence.color;
                    maxOccurrence = colorOccurrence.occurrence;
                }
                else if (maxOccurrence == colorOccurrence.occurrence) {
                    if (colorOccurrence.color < mostPopularColor) {
                        mostPopularColor = colorOccurrence.color;
                    }
                }
            }
            return mostPopularColor;
        };
    }

    return SimpleStrategy;
});
