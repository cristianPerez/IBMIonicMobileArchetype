(function(){
    'use strict';

    angular
        .module('feature.chat')
        .filter('customChatFilter', customChatFilter)
        customChatFilter.$nject = [] 
    function customChatFilter(){

        return FilterFn;

        function FilterFn(items, search){
            return items.slice(search, search+1);
        }
    }

}());