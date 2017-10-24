/**
 * Created by pacifi on 10/24/17.
 */

(function () {
    'use strict';

    angular.module('app.data')
        .factory('dataservice', dataservice);
    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];

    function dataservice($http, $location, $q, exception, logger) {
        let isPrimed = false;
        let primePromise;
        let service = {
            getAvengerCast: getAvengersCast,
            getAvengerCount: getAvengersCount,
            getAvenger: getAvengers,
            ready: ready
        };

        return service;

        function getAvengers() {
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(function (message) {
                    exception.catcher('Llamada fallo para GetAvenger')(message);
                    $location.url('/');
                })
        }

        function getAvengersComplete(data, status, headers, config) {
            return data.data[0].data.results;
        }

        function getAvengerCount() {
            let count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAvengersCastComplete(data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function getAvengersCast() {
            let cast = [
                {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
                {name: 'Chris Hemsworth', character: 'Thor'},
                {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
                {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
                {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
                {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
                {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
                {name: 'Samuel L. Jackson', character: 'Nick Fury'},
                {name: 'Paul Bettany', character: 'Jarvis'},
                {name: 'Tom Hiddleston', character: 'Loki'},
                {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
            ];
            return $q.when(cast);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                //carga de data inicial
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            let readyPromise = primePromise || prime();

            return readyPromise
                .then(function () {
                    return $q.all(nextPromises);
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();