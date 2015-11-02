/**
 * Created by murad on 02/11/15.
 */

define(function () {

    function StrategyBase() {

        this._board;
        this._initialCoords;

        var _stepNumber;

        this.init = function (board, initialCoords) {
            this._board = board;
            this._initialCoords = initialCoords;
            _stepNumber = 0;
        };

        this.getStepNumber = function () {
            return _stepNumber;
        };

        this.stepForward = function () {
            _stepNumber++;
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
    }

    return StrategyBase;
});