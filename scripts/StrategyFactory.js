/**
 * Created by murad on 02/11/15.
 */

define(["StrategySimple"], function (StrategySimple) {

    function StrategyFactory() {

    }

    StrategyFactory.createStratgy = function (board, initialCoords) {
        var resultStrategy = new StrategySimple();
        resultStrategy.init(board, initialCoords);

        return resultStrategy;
    };

    return StrategyFactory;
});