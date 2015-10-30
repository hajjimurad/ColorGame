/**
 * Created by murad on 30/10/15.
 */

define(["Board"], function (Board) {

    function BoardGenerator(boardSize, colorsNumber) {
        var _boardSize = boardSize;
        var _colorsNumber = colorsNumber;
        var getRandomColor = function (maxColorNum) {
            return Math.floor(Math.random() * maxColorNum);
        };

        var colorArray = [];
        for (var i = 0; i < _boardSize * _boardSize; i++) {
            colorArray.push(getRandomColor(_colorsNumber));
        }

        this.generate = function() {
            return new Board(colorArray);
        };
    }

    return BoardGenerator;
});
