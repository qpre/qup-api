QPRecipes.Router.map ()->
  @resource 'posts', {path: '/'}, () ->
  	@resource 'post', {path: '/posts/:post_id'}