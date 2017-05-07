(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'family/:id': 'member',
            'random/*random': 'random',
            'query/:query': 'search',
            '*other': 'default'
        },
        index: function (){
            $("#member").html("member 1");
        },
        member: function (){
            $("#member").html("member 2");
        },
        random: function (){
            $("#member").html("member 3");
        },
        search: function (){
            $("#member").html("member 4");
        },
        default: function (){
            $("#member").html("the Router you visited is not defined");
        }
    })

    new App.Router();
    Backbone.history.start();
})();