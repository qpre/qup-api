QPRecipes.RecipeRoute = Ember.Route.extend
	model:(params) ->
		@get('store').find 'recipe', params.recipe_id
