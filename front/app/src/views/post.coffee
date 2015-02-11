QPRecipes.PostView = Ember.View.extend
  classNames:['post', 'animated']
  animations: {
    in: 'fadeInDown'
    out: 'fadeOutDown'
  }

  willAnimateIn : () ->
    debugger
    @.$el.addClass @get('animations').in


  animateIn : (done) ->
    Em.run.later @, () =>
      debugger
      @.$el.removeClass @get('animations').in
      done()
    ,1000

  willAnimateOut: () ->
    @.$el.addClass @get('animations').out

  animateOut : (done) ->
  	Em.run.later @, done, 1000

  didAnimateOut : () ->
    @.$el = null
