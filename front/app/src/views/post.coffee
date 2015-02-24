QPRecipes.PostView = Ember.View.extend
  classNames:['post', 'animated']
  animations: {
    in: 'fadeInDown'
    out: 'fadeOutDown'
  }

  willAnimateIn : () ->
    @.$el.addClass @get('animations').in


  animateIn : (done) ->
    Em.run.later @, () =>
      @.$el.removeClass @get('animations').in
      done()
    ,1000

  willAnimateOut: () ->
    @.$el.addClass @get('animations').out

  animateOut : (done) ->
  	Em.run.later @, done, 1000

  didAnimateOut : () ->
    @.$el = null
