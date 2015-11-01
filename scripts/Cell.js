/**
 * Created by murad on 20/10/15.
 */

define(function () {

    function Cell(colorIndex) {

        var _colorIndex;
        var _mark = false;

        this.setMark = function (mark) {
            _mark = mark;
        };

        this.getMark = function () {
            return _mark;
        };

        this.setColor = function (colorIndex) {
            _colorIndex = colorIndex;
        };

        this.getColor = function () {
            return _colorIndex;
        };

        this.setColor(colorIndex);
    }

    return Cell;
});
