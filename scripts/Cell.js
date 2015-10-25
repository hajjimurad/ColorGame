/**
 * Created by murad on 20/10/15.
 */

define(function () {
    /**
     * Cell container
     */
    function Cell(color) {
        this.color = color;
        var _mark = false;

        this.setMark = function (mark) {
            _mark = mark;
        };

        this.getMark = function () {
            return _mark;
        };
    }

    return Cell;
});
