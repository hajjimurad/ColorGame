/**
 * Created by murad on 02/11/15.
 */

define(["StrategySimple", "StrategyNegative"], function (StrategySimple, StrategyNegative) {

    function StrategyFactory() {

    }

    StrategyFactory.createStrategy = function (board, initialCoords, isNegative) {
        var resultStrategy = isNegative
            ? new StrategyNegative()
            : new StrategySimple();

        resultStrategy.init(board, initialCoords);

        return resultStrategy;
    };

    return StrategyFactory;
});