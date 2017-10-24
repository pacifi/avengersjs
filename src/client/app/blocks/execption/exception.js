/**
 * Created by pacifi on 10/24/17.
 */

(function () {
    'use strict';
    angular.module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['logger'];

    function exception(logger) {
        let service = {
            catcher: catcher
        };

        return service;

        function catcher(message) {
            return function (reason) {
                logger.error(message, reason);
            }
        }

    }
}());