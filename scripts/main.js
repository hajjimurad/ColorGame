/**
 * Created by murad on 18/10/15.
 */

requirejs(["Board", "Cell", "StrategySimple", "Game"], function (Board, Cell, StrategySimple, Game) {
    var initialData = [
        1, 2, 3,
        3, 2, 3,
        1, 2, 2];
    var board = new Board(initialData);

    var strategy = new StrategySimple(board, {x: 0, y: 0});
    var game = new Game(strategy);

    var viewModel = {
        getCells: function () {
            return board.getCells();
        },
        onCellClick: function () {
            game.nextStep();
        }
    };

    ko.applyBindings(viewModel);

});