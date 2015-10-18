/**
 * Created by murad on 18/10/15.
 */

requirejs(["Board"], function (Board) {

    QUnit.module("Board");

    QUnit.test("constructor saves size", function (assert) {

        var board = new Board(5);
        assert.deepEqual(5, board.size);
    });

    QUnit.test("constructor check initial data", function (assert) {

        var initialData = 7;
        assert.throws(function () {
            new Board(3, initialData)
        });
    });

    QUnit.test("constructor accepts correct data", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];


        var board = new Board(3, initialData);
        assert.ok(true);
    });

})