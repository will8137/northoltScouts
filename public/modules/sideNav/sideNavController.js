var Backbone = require('backbone');
var template = require('./templates/slideNavController.hbs');

var sideNavControllerView = Backbone.View.extend({
    
    tagName: "div",
    
    className:'drawer',
    
    events: {
        'click a':'selectItem'
    }, 

    initialize: function() {
        this.render();
    },

    preRender: function() {
    },
    
    render: function() {
        this.$el.html(template()).appendTo('#wrapper');
        _.defer(_.bind(this.postRender, this));
        return this;
    },
   
    postRender: function() {
    },
    
    selectItem: function(event) {
        this.$('a').removeClass('selected').parent('.drawer-item').removeClass('highlighted');
        $(event.currentTarget).addClass('selected').parent('.drawer-item').addClass('highlighted');
    },

});

module.exports = sideNavControllerView;