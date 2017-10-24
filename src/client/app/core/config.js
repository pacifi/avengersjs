/**
 * Created by pacifi on 10/24/17.
 */
(function () {
    'use strict';
    let core = angular.module('app.core');

    core.config(toastrConfig);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right'

    }

    let config = {
        appErrorPrefix: '[NG-Avengers Error]', // configura el exceptionHandler decorator
        appTitle: 'Avengers Angular Demo',
        version: '1.0.0'
    };

    core.value(config, config);
    core.config(configure);

    function configure($logProvider, $urlRouterProver, $stateProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        //enciende el debug
        if ($logProvider.debugEnable) {
            $logProvider.debugEnable(true);
        }
        //configuramos el provider de las rutas
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProver;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Avengers';

        let resolveAlways = {
            ready: ['dataservice', function (dataService) {
                return dataService.ready();
            }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        //configurar el exceptionHanderl

        exceptionHandlerProvider.configure(config.appErrorPrefix);

    }
})();