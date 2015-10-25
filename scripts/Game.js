/**
 * Created by murad on 25/10/15.
 */

define(function () {

    function Game(strategy) {

        var _strategy = strategy;

        this.nextStep = function () {
            return _strategy.nextStep();
        };
    }

    return Game;
});