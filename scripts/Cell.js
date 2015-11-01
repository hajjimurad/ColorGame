/**
 * Created by murad on 20/10/15.
 */

define(["lib/knockout"], function (ko) {

    function Cell(color) {

        var _color = ko.observable();
        var _mark = false;

        this.setMark = function (mark) {
            _mark = mark;
        };

        this.getMark = function () {
            return _mark;
        };

        this.setColor = function (color) {
            _color(color);
        };

        this.getColor = function () {
            return _color();
        };

        this.setColor(color);
    }


    return Cell;
});
