QPRecipes.Router.map ()->
  @resource 'posts', {path: '/posts'}
  @resource 'posts', {path: '/'}
  @resource 'post', {path: '/posts/:post_id'}

  @resource 'recipes', {path: '/recipes'}
  @resource 'recipe', {path: '/recipes/:recipe_id'}

QPRecipes.Router.reopen
        rootURL: '/posts/'
