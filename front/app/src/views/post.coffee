QPRecipes.PostView = Ember.View.extend
  classNames:['post', 'animated']
   
  willAnimateIn : () ->
      @.$el.addClass 'fadeInRight'
      console.log @.$el.find('.image')
  
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