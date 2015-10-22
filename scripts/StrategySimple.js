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

        this.getOccurrences = function (cellsColors) {

            var occurrences = [];

            for (var i = 0; i < cellsColors.length; i++) {
                var color = cellsColors[i];

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

    return SimpleStrategy;
})
