(function(){
    'use strict';

    angular
        .module('feature.chat')
        .filter('chatFilter', Filter)

    function Filter(){

        return FilterFn;

        function FilterFn(chats, item){
            
            return chats.slice(item, item+1);
        }
    }

}());