/**
 * Created by murad on 20/10/15.
 */

define(function () {

    function Cell(colorIndex) {
        this._mark = false;
        this._colorIndex = 0;

        this.setColor(colorIndex);
    }

    Cell.prototype = {
        constructor: Cell,
        setMark: function (mark) {
            this._mark = mark;
        },

        getMark: function () {
            return this._mark;
        },

        setColor: function (colorIndex) {
            this._colorIndex = colorIndex;
        },

        getColor: function () {
            return this._colorIndex;
        }
    }


    return Cell;
});
