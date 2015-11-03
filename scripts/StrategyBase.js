/**
 * Created by murad on 02/11/15.
 */

define(function () {

    function StrategyBase() {

        var self = this;
        var _stepNumber;

        self.init = function (board, initialCoords) {
            self.board = board;
            self.initialCoords = initialCoords;
            _stepNumber = 0;
        };

        self.getStepNumber = function () {
            return _stepNumber;
        };

        self.stepForward = function () {
            _stepNumber++;
        };

        self.getNextColor = function () {
            return 0;
        }
    }

    return StrategyBase;
});