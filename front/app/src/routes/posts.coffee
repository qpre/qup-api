QPRecipes.PostsRoute = Ember.Route.extend
        model: ->
        	@get('store').findAll 'post'
