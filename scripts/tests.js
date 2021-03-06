/**
 * Created by murad on 18/10/15.
 */

requirejs(["Board", "Cell", "StrategyFactory", "StrategySimple", "StrategyNegative"], function (Board, Cell, StrategyFactory, StrategySimple, StrategyNegative) {

    QUnit.module("Cell");

    QUnit.test("cell color saved correctly", function (assert) {
        var cellColor = 3;
        var cell = new Cell(cellColor);

        assert.equal(cell.getColor(), cellColor);
    });

    QUnit.test("cell marking, marked", function (assert) {
        var cellMarked = new Cell(5);
        cellMarked.setMark(true);

        assert.ok(cellMarked.getMark());
    });


    QUnit.module("Board");

    QUnit.test("constructor not accepts empty initial data", function (assert) {
        assert.throws(function () {
            new Board();
        });
    });

    QUnit.test("constructor check initial data", function (assert) {
        var initialData = 7;
        assert.throws(function () {
            new Board(initialData);
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

    QUnit.test("constructor accepts correct data and saves correctly", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];
        var board = new Board(initialData);

        assert.deepEqual(board.getCellsColors(), initialData);
    });

    QUnit.test("get neighbours from all the cell sides", function (assert) {
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

        board.resetMarkedCells();

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

        assert.deepEqual(board.getDifferentNeighboursAndMarkArea(0, 0), [
            {x: 0, y: 1},
            {x: 1, y: 0}]);

        assert.deepEqual(board.getMarkedCellsCoords(), [
            {x: 0, y: 0}
        ]);
    });

    QUnit.test("find neighbours of another color, from center", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];
        var board = new Board(initialData);

        assert.deepEqual(board.getDifferentNeighboursAndMarkArea(1, 1), [
            {x: 0, y: 2},
            {x: 0, y: 0},
            {x: 1, y: 2},
            {x: 2, y: 0},
            {x: 1, y: 0}]);

        assert.deepEqual(board.getMarkedCellsCoords(), [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 2, y: 2}
        ]);
    });

    QUnit.module("StrategySimple");

    QUnit.test("find neighbour cells color occurrences", function (assert) {
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
        var colorWithMaxOccurrence = strategy.getColorMaxOccurrence(colorOccurrences);

        assert.equal(colorWithMaxOccurrence, 2);
    });

    QUnit.test("find max color occurrence when several colors have the same number of occurrences", function (assert) {
        var colorOccurrences = [
            {color: 1, occurrence: 3},
            {color: 2, occurrence: 2},
            {color: 3, occurrence: 3},
            {color: 4, occurrence: 1}
        ];

        var strategy = new StrategySimple();
        var colorWithMaxOccurrence = strategy.getColorMaxOccurrence(colorOccurrences);

        assert.equal(colorWithMaxOccurrence, 1);
    });

    QUnit.module("StrategyNegative");

    QUnit.test("find neighbour cells color occurrences", function (assert) {
        var colors = [1, 2, 1, 3, 2, 1, 2, 4, 2];
        var strategy = new StrategyNegative();

        var occurrences = strategy.getNeighboursColorOccurrences(colors);

        assert.deepEqual([
            {color: 1, occurrence: 3},
            {color: 2, occurrence: 4},
            {color: 3, occurrence: 1},
            {color: 4, occurrence: 1}
        ], occurrences);

    });

    QUnit.test("find min color occurrence", function (assert) {
        var colorOccurrences = [
            {color: 1, occurrence: 3},
            {color: 2, occurrence: 4},
            {color: 3, occurrence: 1},
            {color: 4, occurrence: 5}
        ];

        var strategy = new StrategyNegative();
        var colorWithMinOccurrence = strategy.getColorMinOccurrence(colorOccurrences);

        assert.equal(colorWithMinOccurrence, 3);
    });

    QUnit.test("find min color occurrence when several colors have the same number of occurrences", function (assert) {
        var colorOccurrences = [
            {color: 1, occurrence: 3},
            {color: 2, occurrence: 2},
            {color: 3, occurrence: 1},
            {color: 4, occurrence: 1}
        ];

        var strategy = new StrategyNegative();
        var colorWithMinOccurrence = strategy.getColorMinOccurrence(colorOccurrences);

        assert.equal(colorWithMinOccurrence, 3);
    });

    QUnit.test("3x3, steps according to simple strategy", function (assert) {
        var initialData = [
            1, 2, 3,
            3, 2, 3,
            1, 2, 2];

        var initialCoords = {x: 0, y: 0};
        var board = new Board(initialData);
        var strategy = StrategyFactory.createStrategy(board, initialCoords);

        assert.equal(strategy.getStepNumber(), 0);

        var stepResult;

        stepResult = strategy.nextStep();
        assert.ok(stepResult);
        assert.equal(strategy.getStepNumber(), 1);

        assert.deepEqual(board.getCellsColors(), [
            2, 2, 3,
            3, 2, 3,
            1, 2, 2]);

        stepResult = strategy.nextStep();
        assert.ok(stepResult);
        assert.equal(strategy.getStepNumber(), 2);

        assert.deepEqual(board.getCellsColors(), [
            3, 3, 3,
            3, 3, 3,
            1, 3, 3]);

        stepResult = strategy.nextStep();
        assert.ok(stepResult);
        assert.equal(strategy.getStepNumber(), 3);

        assert.deepEqual(board.getCellsColors(), [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1]);

        stepResult = strategy.nextStep();
        assert.notOk(stepResult);
        assert.equal(strategy.getStepNumber(), 3);
    });

    QUnit.test("4x4 steps according to simple strategy", function (assert) {
        var initialData = [
            3, 2, 3, 1,
            1, 2, 3, 2,
            1, 2, 2, 1,
            3, 3, 1, 2
        ];

        var initialCoords = {x: 0, y: 0};
        var board = new Board(initialData);
        var strategy = StrategyFactory.createStrategy(board, initialCoords);

        var stepResult;

        stepResult = strategy.nextStep();
        assert.ok(stepResult);

        assert.deepEqual(board.getCellsColors(), [
            1, 2, 3, 1,
            1, 2, 3, 2,
            1, 2, 2, 1,
            3, 3, 1, 2
        ]);

        stepResult = strategy.nextStep();
        assert.ok(stepResult);

        assert.deepEqual(board.getCellsColors(), [
            2, 2, 3, 1,
            2, 2, 3, 2,
            2, 2, 2, 1,
            3, 3, 1, 2
        ]);

        stepResult = strategy.nextStep();
        assert.ok(stepResult);

        assert.deepEqual(board.getCellsColors(), [
            3, 3, 3, 1,
            3, 3, 3, 2,
            3, 3, 3, 1,
            3, 3, 1, 2
        ]);

        stepResult = strategy.nextStep();
        assert.ok(stepResult);

        assert.deepEqual(board.getCellsColors(), [
            1, 1, 1, 1,
            1, 1, 1, 2,
            1, 1, 1, 1,
            1, 1, 1, 2
        ]);

        stepResult = strategy.nextStep();
        assert.ok(stepResult);

        assert.deepEqual(board.getCellsColors(), [
            2, 2, 2, 2,
            2, 2, 2, 2,
            2, 2, 2, 2,
            2, 2, 2, 2
        ]);

        stepResult = strategy.nextStep();
        assert.notOk(stepResult);
    });
});