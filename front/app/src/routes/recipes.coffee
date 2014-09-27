QPRecipes.RecipesRoute = Ember.Route.extend
    model: ->
      @get('store').findAll 'recipe'
