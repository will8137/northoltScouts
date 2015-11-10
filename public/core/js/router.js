var Backbone = require('backbone');

var Router = Backbone.Router.extend({

    initialize: function() {
        
    },

    routes: {
        "" : "handleIndex",
        "dashboard/:pluginName(/*route1)(/*route2)(/*route3)(/*route4)" : "handlePluginRoute",
        ":module(/*route1)(/*route2)(/*route3)" : "handleRoute"
    },

    handleIndex: function() {
        this.removeViews();
        if (this.userIsAuthenticated()) {
            Backbone.history.navigate('#/dashboard', {trigger: true});
        } else {
            Backbone.history.navigate('#/login', {trigger: true});
        }
        $(window).scrollTop(0);
    },

    handleRoute: function(module, route1, route2, route3, route4) {
        // Trigger 'remove:views'
        this.removeViews();
        // Check if user is authenticated before routing
        // This will route to index if not authenticated
        if (this.userIsAuthenticated()) {
            // Set location on app
            _.each(arguments, function(argumentValue, argumentKey) {
                app.location[argumentKey] = argumentValue;
            });

            // Add module class to body
            $('body').removeClass().addClass(module);
            // Trigger router event
            app.hub.trigger('router:' + module, route1, route2, route3, route4);
        } else {
            app.hub.trigger('router:login');
        }
        $(window).scrollTop(0);
    },

    removeViews: function() {
        app.hub.trigger('remove:views');
    },

    userIsAuthenticated: function() {
        if (window.location.hash !== '#/login') {
            if (!app.user.get('_isAuthenticated')) {
                window.location.hash = '#/login';
                return false;
            } else {
                return true;
            }
        }
    }

});

module.exports = Router;