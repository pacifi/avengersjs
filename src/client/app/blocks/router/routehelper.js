/**
 * Created by pacifi on 10/24/17.
 */

(function () {
    'use strict';
    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    router.$inject = ['$location', '$rootScope', '$state', 'logger', 'routehelperConfig'];

    function routehelperConfig() {
        this.config = {
            $urlRouterProvider: undefined,
            $stateProvider: undefined,
            resolveAlways: undefined,
            docTitle: undefined
        };
        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $state, logger, routehelperConfig) {
        let routes = [];
        let $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;
        let $stateProvider = routehelperConfig.config.$stateProvider;


        let service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes
        };
        init();
        return service;


        function configureRoutes(routes) {
            routes.forEach(function (route) {
                route.config.resolve = angular.extend(route.config.resolve || {},
                    routehelperConfi.config.resolveAlways());
                $stateProvider.state(route.name, route.config);

            });
            $urlRouterProvider.otherwise('/');


        }

        function init() {
            updateDocTitle();
        }

        function getRoutes() {
            for (let i = 0; i < $state.get().length; i++) {
                let route = $state.get()[i];
                let isRoute = !!route.title;
                if (isRoute) {
                    routes.push(route);
                }
            }
            return routes;
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChageSuccess', function (event, toState, fromState) {
                let title = routehelperConfig.config.docTitle + ' ' + (toState.title || '');
                $rootScope.title = title;
            });
        }
    }


}());