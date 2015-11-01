/**
 * Created by murad on 18/10/15.
 */

requirejs(["lib/knockout", "Board", "Cell", "StrategySimple", "BoardGenerator"], function (ko, Board, Cell, StrategySimple, BoardGenerator) {

    var boardGenerator = new BoardGenerator(10, 10);
    var board = boardGenerator.generate();

    var strategy = new StrategySimple(board, {x: 0, y: 0});
    var stepNumber = ko.observable(0);
    
    var viewModel = {
        getCells: function () {
            return board.getCells();
        },
        nextStep: function () {
            strategy.nextStep();
            stepNumber(strategy.getStepNumber());
        },
        getSize: function () {
            return board.size;
        },
        getStepNumber: function () {
            return stepNumber();
        }

    };

    ko.applyBindings(viewModel);

});