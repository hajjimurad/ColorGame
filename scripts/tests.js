/**
 * Created by murad on 18/10/15.
 */

requirejs(["Board", "Cell"], function (Board, Cell) {

    QUnit.module("Board");

    QUnit.test("constructor not accepts empty initial data", function (assert) {
        assert.throws(function () {
            new Board();
        });
    });

    QUnit.test("constructor check initial data", function (assert) {

        var initialData = 7;
        assert.throws(function () {
            new Board(initialData)
        });
    });

    QUnit.test("constructor calculates dimension for correct dimension", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);

        assert.deepEqual(board.size, 3);
    });

    QUnit.test("constructor throws error on incorrect dimension", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2, 1];

        assert.throws(function () {
            new Board(initialData);
        });
    });

    QUnit.test("constructor accepts correct data", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        new Board(initialData);
        assert.ok(true);
    });

    QUnit.test("constructor saves initial data correctly", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        assert.propEqual(board.getCellsColors(), initialData);
    });

    QUnit.test("gets data by coords", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        assert.deepEqual(board.getCellByCoords(1, 1).color, 2);
    });

    QUnit.test("get neighbours from all the sides", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        assert.deepEqual(board.getNeighboursPositions(1, 1),
            [
                {x: 0, y: 1},
                {x: 1, y: 2},
                {x: 2, y: 1},
                {x: 1, y: 0}
            ]);
    });

    QUnit.module("Cell");

    QUnit.test("color saved correctly", function (assert) {
        var cellColor = 3;
        var cell = new Cell(cellColor);
        assert.equal(cell.color, cellColor);
    });

    QUnit.test("find neighbours of the same color, only itself", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        var actualNeighbours = board.findNeighboursOfTheSameColor(0, 0);

        assert.deepEqual(actualNeighbours, []);
    });

    QUnit.test("find neighbours of the same color, from center", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        var actualNeighbours = board.findNeighboursOfTheSameColor(1, 1);

        assert.deepEqual(actualNeighbours, [
            {x: 0, y: 1},
            {x: 2, y: 1},
            {x: 2, y: 2}
        ]);
    });
});