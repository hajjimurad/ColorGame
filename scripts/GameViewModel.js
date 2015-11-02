/**
 * Created by murad on 18/10/15.
 */

requirejs(["lib/knockout", "Board", "Cell", "StrategyFactory", "BoardGenerator"], function (ko, Board, Cell, StrategyFactory, BoardGenerator) {

    GameViewModel.availableCellsColors = [
        "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", "000000",
        "800000", "008000", "000080", "808000", "800080", "008080", "808080",
        "C00000", "00C000", "0000C0", "C0C000", "C000C0", "00C0C0", "C0C0C0",
        "400000", "004000", "000040", "404000", "400040", "004040", "404040",
        "200000", "002000", "000020", "202000", "200020", "002020", "202020",
        "600000", "006000", "000060", "606000", "600060", "006060", "606060",
        "A00000", "00A000", "0000A0", "A0A000", "A000A0", "00A0A0", "A0A0A0",
        "E00000", "00E000", "0000E0", "E0E000", "E000E0", "00E0E0", "E0E0E0"
    ];

    function GameViewModel() {
        var self = this;

        var boardGenerator = new BoardGenerator(10, 10);
        var board = boardGenerator.generate();
        var cells = board.getCells();
        var strategy = StrategyFactory.createStratgy(board, {x: 0, y: 0});

        self.stepNumber = ko.observable(0);
        self.cellsColors = [];
        self.boardSize = ko.observable(board.size);

        self.nextStep = function () {
            strategy.nextStep();
            self.stepNumber(strategy.getStepNumber());

            updateViewModelColors();
        };


        var getCellColorStyle = function (colorIndex) {
            return "#" + GameViewModel.availableCellsColors[colorIndex];
        };

        var initViewModelColors = function () {
            var cellCount = cells.length;
            for (var i = 0; i < cellCount; i++) {
                self.cellsColors.push({
                    color: ko.observable(),
                    colorIndex: ko.observable()
                });
            }
        };

        var updateViewModelColors = function () {
            for (var index in self.cellsColors) {
                var cellDestination = self.cellsColors[index];
                var cellSource = cells[index];

                cellDestination.color(getCellColorStyle(cellSource.getColor()));
                cellDestination.colorIndex(cellSource.getColor());
            }
        };

        initViewModelColors();
        updateViewModelColors();
    };

    ko.applyBindings(new GameViewModel());
});