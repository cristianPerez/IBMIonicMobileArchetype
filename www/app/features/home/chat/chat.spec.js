describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

describe('introController', function () {
    
    beforeEach(module('ui.router'));
    beforeEach(module('feature.chat'));

    var $controller, $scope, $stateParams;


    beforeEach(inject(function ($injector, $rootScope) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
        $stateParams = $injector.get('$stateParams');
         
    }));

    describe('Test Controller', function () {
        it('Create a controller with injector', function () {
            //var $scope = {};
            var controller = $controller('chatController', { 
                $scope: $scope,
            });

            expect(controller.slideTime).toBeDefined();
            //expect(controller.suma).toBeDefined();
            expect(controller.slideTime).toEqual(3000);

        });
    });

});