/**
 * Created by murad on 02/11/15.
 */

define(["StrategySimple"], function (StrategySimple) {

    StrategyFactory.createStratgy = function (board, initialCoords) {
        return new StrategySimple(board, initialCoords);
    }
}