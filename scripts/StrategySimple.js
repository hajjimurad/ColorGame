/**
 * Created by murad on 22/10/15.
 */

define(function () {

    /**
     * Simple strategy, base on maximum occurrence of colors
     */
    function SimpleStrategy() {

        var getIndexOfCalculatedColor = function (existentColors, colorToFind) {
            for (var i = 0; i < existentColors.length; i++) {
                if (existentColors[i].color === colorToFind)
                    return i;
            }
            return null;
        };

        /**
         * Finds how many occurrences of every color
         */
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

        /**
         * Selects maximum occurrence of colors
         */
        this.getMaxOccurrence = function (occurrences) {

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

        /**
         *
         * Chooses next color of the game
         */
        this.getNextColor = function(colorsToChoose) {
            var occurrences = this.getNeighboursColorOccurrences(colorsToChoose);
            return this.getMaxOccurrence(occurrences);
        }
    }

    return SimpleStrategy;
});
