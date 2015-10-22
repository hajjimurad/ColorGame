/**
 * Created by murad on 20/10/15.
 */

define(function () {
    /**
     * Cell container
     */
    function Cell(color) {
        this.color = color;
        this.mark = false;

        this.setMark = function (mark) {
            this.mark = mark;
        };

        this.getMark = function () {
            return this.mark;
        };
    }

    return Cell;
})
