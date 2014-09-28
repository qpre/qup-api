QPRecipes.RecipeView = Ember.View.extend
  classNames:['recipe', 'animated']
  
  willAnimateIn : () ->
      @.$el.addClass('fadeInRight');
  
  animateIn : (done) ->
    Em.run.later @, () =>
      @.$el.removeClass('fadeInRight')
      done()
    ,1000

  willAnimateOut: () ->
    @.$el.addClass('fadeOutLeft')

  animateOut : (done) ->
  	Em.run.later @, done, 1000

  didAnimateOut : () ->
    @.$el = null