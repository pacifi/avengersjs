/**
 * Created by pacifi on 10/24/17.
 */
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout', 'config', 'logger'];

    function Shell($timeout, config, logger) {

        let self = this;
        self.title = config.appTitle;
        self.showSplash = true;


        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);

            hideSplash();
        }

        function hideSplash() {
            //forazr 2 segundos de delay para que podamos ver el splash
            $timeout(function () {
                self.showSplash = false;
            }, 1000);
        }
    }
})();