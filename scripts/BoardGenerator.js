/**
 * Created by murad on 30/10/15.
 */

define(["Board"], function (Board) {

    function BoardGenerator(boardSize, colorsNumber) {
        var self = this;
        var _boardSize = boardSize;
        var _colorsNumber = colorsNumber;
        var getRandomColor = function (maxColorNum) {
            return Math.floor(Math.random() * maxColorNum);
        };

        self.colorArray = [];
        for (var i = 0; i < _boardSize * _boardSize; i++) {
            self.colorArray.push(getRandomColor(_colorsNumber));
        }
    }

    BoardGenerator.prototype = {
        constructor: BoardGenerator,
        generate: function () {
            return new Board(this.colorArray);
        }
    };

    return BoardGenerator;
});
