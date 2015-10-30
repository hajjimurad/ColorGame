/**
 * Created by murad on 18/10/15.
 */

requirejs(["lib/knockout", "Board", "Cell", "StrategySimple", "Game", "BoardGenerator"], function (ko, Board, Cell, StrategySimple, Game, BoardGenerator) {

    var boardGenerator = new BoardGenerator(4, 5);
    var board = boardGenerator.generate();

    var strategy = new StrategySimple(board, {x: 0, y: 0});
    var game = new Game(strategy);

    var viewModel = {
        getCells: function () {
            return board.getCells();
        },
        onCellClick: function () {
            game.nextStep();
        },
        getSize: function () {
            return board.size;
        }
    };

    ko.applyBindings(viewModel);

});