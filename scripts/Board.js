/**
 * Created by murad on 18/10/15.
 */

define(function () {
    function Board(size, initialData) {
        this.size = size;

        if (initialData) {
            if (initialData.constructor !== Array)
                throw "invalid initial data";


        } else {

        }
    }

    return Board;
})