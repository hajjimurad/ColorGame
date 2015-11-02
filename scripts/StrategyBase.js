/**
 * Created by murad on 02/11/15.
 */

define(function () {

    function StrategyBase() {

        var self = this;
        var _stepNumber;

        self.init = function (board, initialCoords) {
            self.board = board;
            self.initialCoords = initialCoords;
            _stepNumber = 0;
        };

        self.getStepNumber = function () {
            return _stepNumber;
        };

        self.stepForward = function () {
            _stepNumber++;
        };

        self.getColorMaxOccurrence = function (occurrences) {
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

        self.getNextColor = function () {
            return 0;
        }
    }

    return StrategyBase;
});