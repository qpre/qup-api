QPRecipes.Router.map ()->
  @resource 'posts', {path: '/posts'}
  @resource 'post', {path: '/posts/:post_id'}

  @resource 'recipes', {path: '/recipes'}
  @resource 'recipe', {path: '/recipes/:recipe_id'}