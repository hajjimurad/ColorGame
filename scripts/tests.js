/**
 * Created by murad on 18/10/15.
 */

requirejs(["Board"], function (Board) {

    QUnit.module("Board");

    QUnit.test("size saving", function (assert) {

        var board = new Board(5);
        assert.deepEqual(5, board.size);
    });

    QUnit.test("second test", function (assert) {
        assert.deepEqual(1, 1);
    });

})