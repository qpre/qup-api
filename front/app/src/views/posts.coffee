QPRecipes.PostsView = Ember.View.extend
  classNames:['posts', 'animated']
  
  willAnimateIn : () ->
#      @.$el.addClass 'fadeInLeft'
#      @.$el.find('.recipe-card__image-wrapper').css {
#        'background': 'url("http://lorempixel.com/400/200/food") no-repeat'
#        'background-size': '100%'
#        'background-position': 'center center'
#      }

  animateIn : (done) ->
    Em.run.later @, () =>
      @.$el.removeClass 'fadeInLeft'
      done()
    ,1000

  willAnimateOut: () ->
    @.$el.addClass 'fadeOutLeft'

  animateOut : (done) ->
    Em.run.later @, done, 1000
