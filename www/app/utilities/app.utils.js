(function () {
    'use strict';
    angular
        .module('quala')
        .factory('serviceUtil', serviceUtil);

    serviceUtil.$inject = ['MFPInit', 'ionicToast', '$rootScope', '$ionicLoading', '$timeout'];
    function serviceUtil(MFPInit, ionicToast, $rootScope, $ionicLoading, $timeout) {

        var vm = this;

        vm.showLoader = showLoader;
        vm.hideLoader = hideLoader;
        vm.setTimeoutLoader = setTimeoutLoader;

        /**
         * Método para esconder el loader.
         * @method showLoader
         * @public
         */
        function showLoader () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        /**
         * Método para esconder el loader.
         * @method hideLoader
         * @public
         */
        function hideLoader () {
            $ionicLoading.hide();
        };

        /**
         * Funcion para cerrar el loader en caso de time out de 30 segundos.
         */
        function setTimeoutLoader(){
            $timeout(function () {
                hideLoader();
            }, 30000);
        }

        var service = {
            consumeGET: consumeGET,
            consumePOST: consumePOST,
            validateConnection: validateConnection,
            isFunction: isFunction,
            isConnectedToNetwork: isConnectedToNetwork,
            consumeService: consumeService,
            showToast: showToast,
            getTomorrow: getTomorrow,
            getDays: getDays,
            getFormatDate: getFormatDate,
            utf8Encode: utf8Encode,
            utf8Decode: utf8Decode,
            validateNull: validateNull
        };

        return service;

        /**
         * Metodo que permite consumir los adaptadores
         * @method consumeService
         * @param uri
         * @param parameters
         * @param operation
         * @param successFunction
         * @param failureFunction
         */
        function consumeService(uri, parameters, operation, successFunction, failureFunction, _showLoader) {
            if(_showLoader == undefined || _showLoader || _showLoader == null) {
                vm.showLoader();
                vm.setTimeoutLoader();
            }
            switch (operation) {
                case 'POST':
                    consumePOST(uri, parameters, operation, successFunction, failureFunction);
                    break;
                case 'PUT':
                    consumePOST(uri, parameters, operation, successFunction, failureFunction);
                    break;
                case 'DELETE-BODY':
                    consumePOST(uri, parameters, operation, successFunction, failureFunction);
                    break;
                default:
                    consumeGET(uri, parameters, operation, successFunction, failureFunction);
            }
        }

        /**
         * Metodo que permite consumir servicios tipo GET y DELETE
         * @method consumeGET
         * @param uri
         * @param parameters
         * @param operation
         * @param successFunction
         * @param failureFunction
         */
        function consumeGET(uri, parameters, operation, successFunction, failureFunction) {
            validateConnection(function () {
                MFPInit.then(function () {
                    if (operation === "GET") {
                        var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.GET);
                    } else {
                        var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.DELETE);
                    }
                    for (var i = 0; i < parameters.length; i++) {
                        resourceRequest.setQueryParameter(parameters[i].key, parameters[i].value);
                    }
                    resourceRequest.send().then(
                        function (response) {
                            var responseJson = JSON.parse(response.responseText);
                            if (responseJson.message === 'SUCCESS') {
                                if (isFunction(successFunction)) {
                                    successFunction(responseJson.data);
                                    hideLoader();
                                }
                            } else {
                                if (isFunction(failureFunction)) {
                                    showToast($rootScope.root_messages.toast.connection.alertFail, 'error');
                                    hideLoader();
                                }
                            }
                        },
                        function (error) {
                            if (isFunction(failureFunction)) {
                                console.log(error);
                                showToast($rootScope.root_messages.toast.connection.alertFail, 'error');
                                hideLoader();
                            }
                        }
                    );
                });
            }, failureFunction);
        }

        /**
         * Metodo que permite consumir servicios tipo POST
         * @method consumePOST
         * @param uri
         * @param parameters
         * @param successFunction
         * @param failureFunction
         */
        function consumePOST(uri, parameters, operation, successFunction, failureFunction) {
            validateConnection(function () {
                MFPInit.then(function () {
                    if (operation === "POST") {
                        var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.POST);
                    } else {
                        var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.PUT);
                    }
                    switch (operation) {
                        case 'POST':
                            var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.POST);
                            break;
                        case 'PUT':
                            var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.PUT);
                            break;
                        case 'DELETE-BODY':
                            var resourceRequest = new WLResourceRequest(uri, WLResourceRequest.DELETE);
                            break;
                    }
                    resourceRequest.sendFormParameters(parameters).then(
                        function (response) {
                            var responseJson = JSON.parse(response.responseText);
                            if (responseJson.message === 'SUCCESS') {
                                if (isFunction(successFunction)) {
                                    hideLoader();
                                    successFunction(responseJson.data);
                                }
                            } else {
                                if (isFunction(failureFunction)) {
                                    showToast($rootScope.root_messages.toast.connection.alertFail, 'error');
                                    if (responseJson.codigoRespuesta == 400) {
                                        showToast(responseJson.message, 'error');
                                        hideLoader();
                                    }
                                    else {
                                        showToast($rootScope.root_messages.toast.connection.alertFail, 'error');
                                        hideLoader();
                                    }
                                }
                            }
                        },
                        function (error) {
                            if (isFunction(failureFunction)) {
                                showToast($rootScope.root_messages.toast.connection.alertFail, 'error');
                                hideLoader();
                            }
                        }
                    );
                });
            }, failureFunction);
        }

        /**
         * Metodo que permite manipular la respuesta si el usurio tiene conexion
         * @method validateConnection
         * @param successFunction
         * @param failureFunction
         */
        function validateConnection(successFunction, failureFunction) {
            var response = {};
            if (isConnectedToNetwork()) {
                if (isFunction(successFunction)) {
                    successFunction(response);
                }

            } else {
                if (isFunction(failureFunction)) {
                    showToast($rootScope.root_messages.toast.connection.connectionFail, 'error');
                    hideLoader();
                }
            }

        }

        /**
         * Metodo que permite verificar que sea una funcion
         * @method isFunction
         *
         */
        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        /**
         * Metodo que permite revisar si el dispositivo se encuentra con conexion a internet
         * @method isConnectedToNetwork
         *
         */
        function isConnectedToNetwork() {
            var isConnected = false, online = false, networkState;
            try {
                online = navigator.onLine;
                networkState = navigator.connection.type;
                if (online && networkState !== 'none' && networkState !== 'unknown') {
                    isConnected = true;
                }
            } catch (e) {
            }
            return isConnected;
        }

        /**
         * Método para abrir toast
         * @method showToast
         * @public
         * @param message Mensage que se muestra en el toast 
         * @param error variable boolean para especificar si es mensage de error (true)
         * @param img variable que almacena la imagen izquierda que se muestra en el toast
         * @param detail informacion detalle, mensage que devuelve el servicio  
         */
        function showToast(message, type, img, detail) {
            var msg;
            switch(type) {
                case 'error':
                    if(!img){
                        img = $rootScope.root_messages.toast.imagesToast.error;
                    }
                    document.getElementsByClassName("ionic_toast")[0].className += " alert_toast";
                    break;
                case 'success':
                    if(!img){
                        img = $rootScope.root_messages.toast.imagesToast.success;
                    }
                    document.getElementsByClassName("ionic_toast")[0].className = "ionic_toast";
                    break;
                case 'dog':
                    if(!img){
                        img = $rootScope.root_messages.toast.imagesToast.success;
                    }
                    document.getElementsByClassName("ionic_toast")[0].className += " dog_toast";
                    break;
                default:
                    if(!img){
                        img = $rootScope.root_messages.toast.imagesToast.success;
                    }
                    document.getElementsByClassName("ionic_toast")[0].className = "ionic_toast";
            }

            
            if(!detail || detail === '') {
                msg = '<img src="'+ img +'" />' + '<span>' + message + '</span>'; 
            }else {
                msg = '<img src="'+ img +'" />' + '<span>' + message + '</span>' + '<p class="detailToast"> Detalle: '+ detail +'</p>'; 
            }
            
            ionicToast.show(msg, 'top', false, 3500);
        };

        /**
         * Método para obtener el dia actual o el dia siguiente en diferentes formatos.
         * @method getToday
         * @public
         */
        function getTomorrow(format) {
            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            var dd = tomorrow.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            var today = yyyy + format + mm + format + dd;
            return today;
        }

        /**
         * Funcion para obtener el date atraves de un formato.
         * @param {*} date
         * @param {*} format
         */
        function getFormatDate(date, format) {
            var today = new Date(date);
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = yyyy + format + mm + format + dd;
            return today;
        }

        /**
         * Funcion encargada de contrar el numero de dias entre dos fechas.
         * @param {*} dateOne
         * @param {*} dateTwo
         */
        function getDays(dateOne, dateTwo) {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(dateOne);
            var secondDate = new Date(dateTwo);
            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
            return diffDays;
        }
    }

    /**
     * Funcion para codificar los strings con formato UTF 8, para ajustar los caracteres a
     * formato UTF8
     * @method utf8Encode
     * @param {[type]} strUni String a codificar
     * @private
     */
    function utf8Encode(strUni) {
        var strUtf = strUni;

        if (validateNull(strUtf)) {
            strUtf = strUni.replace(
                /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
                function (c) {
                    var cc = c.charCodeAt(0);
                    return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
                }
            );
            strUtf = strUtf.replace(
                /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
                function (c) {
                    var cc = c.charCodeAt(0);
                    return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
                }
            );
        }
        return strUtf;
    }

    /**
     * Funcion para decodificar s trings y eliminar los caracteres especiales
     * @property {string} strUtf Propiedad con el encode aplicado
     * @method utf8Decode
     * @private
     */
    function utf8Decode(strUtf) {
        var strUni = strUtf;

        if (validateNull(strUni)) {
            // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
            strUni = strUtf.replace(
                /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
                function (c) {  // (note parentheses for precedence)
                    var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | ( c.charCodeAt(2) & 0x3f);
                    return String.fromCharCode(cc);
                }
            );
            strUni = strUni.replace(
                /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
                function (c) {  // (note parentheses for precedence)
                    var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                    return String.fromCharCode(cc);
                }
            );
        }

        return strUni;
    }

    /**
     * Método para validar si una variable es nula o indefinida
     * @method validateNull
     * @param value {Object}
     * @private
     */
    function validateNull(value) {
        return typeof value !== 'undefined' && value !== null && value !== '';
    }


})();