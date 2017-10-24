/**
 * Created by pacifi on 10/24/17.
 */

(function () {
    'use strict';
    angular
        .module('blocks.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    function exceptionHandlerProvider() {
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function () {
            return {config: this.config};
        };

        function config($provider) {
            $provider.decorator('$exceptionHandler', extendExceptionHandler);
        }

        function extendExceptionHandler($delegate, exceptionHandler, logger) {
            return function (exception, cause) {
                let appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
                let errorData = {
                    exception: exception,
                    cause: cause,
                };
                exception.message = appErrorPrefix + exception.message;
                $delegate(exception, cause);
                logger.error(exception.message, errorData);
            };
        }
    }
}());