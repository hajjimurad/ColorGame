/**
 * Created by murad on 18/10/15.
 */

requirejs(["Board", "Cell", "StrategySimple"], function (Board, Cell, StrategySimple) {

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

    QUnit.test("mark central cell as checked only", function (assert) {

        var markedX = 1;
        var markedY = 1;

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        var cellToMark = board.getCellByCoords(markedX, markedY);
        cellToMark.setMark(true);

        assert.equal(board.getCellByCoords(0, 0).getMark(), false);
        assert.equal(board.getCellByCoords(0, 1).getMark(), false);
        assert.equal(board.getCellByCoords(0, 2).getMark(), false);
        assert.equal(board.getCellByCoords(1, 0).getMark(), false);
        assert.equal(board.getCellByCoords(markedX, markedY).getMark(), true);
        assert.equal(board.getCellByCoords(1, 2).getMark(), false);
        assert.equal(board.getCellByCoords(2, 0).getMark(), false);
        assert.equal(board.getCellByCoords(2, 1).getMark(), false);
        assert.equal(board.getCellByCoords(2, 2).getMark(), false);
    });

    QUnit.test("reset cell marks, all unmarked", function (assert) {

        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        var cellToMark = board.getCellByCoords(0, 0);
        cellToMark.setMark(true);

        cellToMark = board.getCellByCoords(2, 2);
        cellToMark.setMark(true);

        board.resetMarks();

        assert.equal(board.getCellByCoords(0, 0).getMark(), false);
        assert.equal(board.getCellByCoords(0, 1).getMark(), false);
        assert.equal(board.getCellByCoords(0, 2).getMark(), false);
        assert.equal(board.getCellByCoords(1, 0).getMark(), false);
        assert.equal(board.getCellByCoords(1, 1).getMark(), false);
        assert.equal(board.getCellByCoords(1, 2).getMark(), false);
        assert.equal(board.getCellByCoords(2, 0).getMark(), false);
        assert.equal(board.getCellByCoords(2, 1).getMark(), false);
        assert.equal(board.getCellByCoords(2, 2).getMark(), false);
    });

    QUnit.test("find neighbours of the another color, from initial corner", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);
        var neighboursWithDifferencColor = board.findNeighboursOfAnotherColor(0, 0);

        assert.deepEqual(neighboursWithDifferencColor, [
            {x: 0, y: 1},
            {x: 1, y: 0}]);
    });

    QUnit.test("find neighbours of another color, from center", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var board = new Board(initialData);

        var neighboursWithDifferencColor = board.findNeighboursOfAnotherColor(1, 1);

        assert.deepEqual(neighboursWithDifferencColor, [
            {x: 0, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 0},
            {x: 1, y: 0},
            {x: 0, y: 0}]);
    });

    QUnit.module("SimpleStrategy");

    QUnit.test("find neighbour cells color occurences", function (assert) {
        var colors = [1, 2, 1, 3, 2, 1, 2, 4, 2];

        var strategy = new StrategySimple();
        var occurrences = strategy.getNeighboursColorOccurrences(colors);

        assert.deepEqual([
            {color: 1, occurrence: 3},
            {color: 2, occurrence: 4},
            {color: 3, occurrence: 1},
            {color: 4, occurrence: 1}
        ], occurrences);

    });

    QUnit.test("find max color occurrence", function (assert) {
        var colorOccurrences = [
            {color: 1, occurrence: 3},
            {color: 2, occurrence: 4},
            {color: 3, occurrence: 1},
            {color: 4, occurrence: 1}
        ];

        var strategy = new StrategySimple();
        var colorWithMaxOccurrence = strategy.getMaxOccurrence(colorOccurrences);

        assert.equal(colorWithMaxOccurrence, 2);

    });

});