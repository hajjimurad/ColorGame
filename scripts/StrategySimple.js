/**
 * Created by murad on 22/10/15.
 */

define(function () {

    function SimpleStrategy() {

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

        this.getMaxOccurrence = function(occurrences) {

            var mostPopularColor = null;
            var maxOccurrence = 0;
            for(var i in occurrences) {

                var colorOccurrence = occurrences[i];
                if(maxOccurrence < colorOccurrence.occurrence) {
                    mostPopularColor = colorOccurrence.color;
                    maxOccurrence = colorOccurrence.occurrence;
                }
            }

            return mostPopularColor;
        }
    }

    return SimpleStrategy;
})
