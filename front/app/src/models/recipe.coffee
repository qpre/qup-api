QPRecipes.Recipe = DS.Model.extend {
	title:		DS.attr('string')
	bgPath: 	DS.attr('string')
	bodyPath: 	DS.attr('string')
	created: 	DS.attr('date')
	edit: 		DS.attr('date')

	# computed properties :
	body: Ember.computed () -> 
        if @get 'bodyPath'
            getURL("files/markdown/#{@get('bodyPath')}").then (result) =>
                @set 'body', result
            "Loading..."
        else
            "empty"
 }
