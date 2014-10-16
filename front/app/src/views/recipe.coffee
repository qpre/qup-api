QPRecipes.RecipeView = Ember.View.extend
  classNames:['recipe', 'animated']
  
  willAnimateIn : () ->
      @.$el.addClass 'fadeInRight'
      console.log @.$el.find('.image')
      @.$el.find('.image').css {
        'background': 'url("http://lorempixel.com/400/200/food") no-repeat'
        'background-size': '100%'
        'background-position': 'center center'
      }
  
  animateIn : (done) ->
    Em.run.later @, () =>
      @.$el.removeClass 'fadeInRight'
      done()
    ,1000

  willAnimateOut: () ->
    @.$el.addClass 'fadeOutLeft'

  animateOut : (done) ->
  	Em.run.later @, done, 1000

  didAnimateOut : () ->
    @.$el = null