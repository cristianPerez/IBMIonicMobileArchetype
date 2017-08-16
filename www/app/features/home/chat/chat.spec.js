var expectChai = chai.expect;

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

describe('chatController', function () {

    beforeEach(module('ui.router'));
    beforeEach(module('feature.chat'));

    var $controller, $scope, $stateParams, chatService, $compile;

    beforeEach(function () {
        chatService = {
            all: function () {
                return [{
                    id: 0,
                    name: 'Ben Sparrow',
                    lastText: 'You on your way?',
                    face: 'img/ben.png'
                }, {
                    id: 1,
                    name: 'Max Lynx',
                    lastText: 'Hey, it\'s me',
                    face: 'img/max.png'
                }, {
                    id: 2,
                    name: 'Adam Bradleyson',
                    lastText: 'I should buy a boat',
                    face: 'img/adam.jpg'
                }, {
                    id: 3,
                    name: 'Perry Governor',
                    lastText: 'Look at my mukluks!',
                    face: 'img/perry.png'
                }, {
                    id: 4,
                    name: 'Mike Harrington',
                    lastText: 'This is wicked good ice cream.',
                    face: 'img/mike.png'
                }];
            }
        }
    });

    /*beforeEach(inject(function ($injector, $rootScope, $compile) {
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
        $stateParams = $injector.get('$stateParams');
    }));*/

    
    beforeEach(inject(
        ['$compile','$rootScope', '$injector', function($c, $r, $injector) {
        $compile = $c;
        $scope = $r.$new();
        $rootScope = $r;
        $controller = $injector.get('$controller');
        }]
    ));

    describe('Test Controller', function () {
        it('Create a controller with injector', function () {
            //var $scope = {};
            var controller = $controller('chatController', {
                chatService: chatService,
            });

            expect(controller.slideTime).toBeDefined();
            //expect(controller.suma).toBeDefined();
            expect(controller.slideTime).toEqual(3000);

        });
    });

    describe('Test filter', function () {

        var $filter;

        beforeEach(inject(function (_$filter_) {
            $filter = _$filter_;
        }));

        it('should be a Filter test', function () {
            var filterCustom = $filter('customChatFilter');
            var answer = filterCustom(chatService.all(), 1);
            //console.log(JSON.stringify(answer));
            expectChai(answer).to.be.instanceof(Array);
            expectChai(answer).to.have.lengthOf(1);
            assert.isArray(answer, 'The answer should be an array');            

        });
    });

    describe("Midway: Testing My App", function() {
    
        it("should compile the widget html", function() {
           // You're out of the inject function so I used full variable names
           var element = $compile('<h1>Hello word</h1>')($rootScope);
            
           // run a digest loop
           $rootScope.$digest();
           //console.log(element);
        });
    
    });

});