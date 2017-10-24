/**
 * Created by pacifi on 10/24/17.
 */

(function () {
    'use strict';
    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    function logger($log, toastr) {

        let service = {
            showToasts: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            // directo a la consola
            log: $log.log
        };
        return service;

        ///////
        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error' + message, data)
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info("Info", title, data);

        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success ' + message, data)

        }

        function warning(message, data, title) {
            toastr.error(message, title);
            $log.warn('Warning ' + message, data)
        }

    }
}());