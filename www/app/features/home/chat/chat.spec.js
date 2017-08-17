var expectChai = chai.expect;

describe("A suite", function () {
    it("True = True", function () {
        expect(true).toBe(true);
    });
});

describe('ChatController', function () {

    var $controller, chatService, $filter;
    var chatsMock = [{
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

    beforeEach(module('ui.router'));
    beforeEach(module('feature.chat'));
    beforeEach(function () {
        chatService = {
            all: function () {
                return chatsMock;
            },
            remove : function(chat) 
            {
                chatsMock.splice(chatsMock.indexOf(chat), 1);
            },
            get : function (id) {
                var x = chatsMock.filter(function(item) {
                    return item.id == id
                })[0];
                console.log(x);
                return x;
                
            }
        }
    });



    beforeEach(inject(function (_$controller_, _$filter_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $filter = _$filter_;
    }));

    describe('Create controller', function () {
        it('Create controller', function () {

            var controller = $controller('chatController', { chatService: chatService });

            expect(controller.slideTime).toBeDefined();
            //console.log(JSON.stringify(controller))
            expect(controller.slideTime).toBe(3000);

        });
    });

    describe('Test Service getAll', function() {
        it('service chat return chats', function() {
            var controller = $controller('chatController', { chatService: chatService });
            var answer = chatService.all();
            //console.log(answer);
            expect(controller.chats).toEqual(answer);
        })
    })

/*     describe('Test Service Remove', function() {
        it('service remove chat', function() {
            var controller = $controller('chatController', { chatService: chatService });
            var removeItem = chatsMock[0];
            var lengthOld = chatsMock.length; 
            var answer = chatService.remove(removeItem);
            var lengthNew = chatsMock.length; 
            expect(lengthOld).toEqual(lengthNew + 1);
        })
    }) */


    describe('Test Service get', function() {
        it('service get chat', function() {
            var controller = $controller('chatController', { chatService: chatService });
            var itemOld = chatsMock[2];
            var answer = chatService.get(2);    
            expect(itemOld).toEqual(answer);
        })
    })

    describe('Test Filter', function() {
        it('test filter', function() {
            var filter = $filter('chatFilter');
            var answer = filter(chatsMock, 1);
            expect(answer[0]).toEqual(chatsMock[1]);
            expectChai(answer).to.deep.include(chatsMock[1]);
            console.log(answer[0])
            expectChai(answer).to.be.instanceof(Array);
            expectChai(answer).to.have.lengthOf(1);
            assert.isArray(answer, 'The answer should be an array');
            
        })
    })





});