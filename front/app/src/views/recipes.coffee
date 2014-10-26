QPRecipes.RecipesView = Ember.View.extend
  classNames:['recipes', 'animated']
  
  willAnimateIn : () ->
      @.$el.addClass 'fadeInLeft'

  animateIn : (done) ->
    Em.run.later @, () =>
      @.$el.removeClass 'fadeInLeft'
      done()
    ,1000

  willAnimateOut: () ->
    @.$el.addClass 'fadeOutLeft'

  animateOut : (done) ->
    Em.run.later @, done, 1000

  didAnimateOut : () ->
    @.$el = null
