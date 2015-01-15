Ember.Handlebars.helper 'format-date', (date) ->
    moment(date).fromNow()

formatMarkdown = (input) =>
  showdown = new Showdown.converter()
  new Handlebars.SafeString showdown.makeHtml(input)

highlightSyntax = (input) =>
  new Handlebars.SafeString $('pre code').each (i, e) -> hljs.highlightBlock(e)

Ember.Handlebars.helper 'format-markdown', formatMarkdown

Ember.Handlebars.helper 'highlight-syntax', highlightSyntax

Ember.Handlebars.helper 'format-article', (input) ->
  formatMarkdown highlightSyntax(input)

getURL = (url) ->
    new Ember.RSVP.Promise (resolve, reject) ->
        xhr = new XMLHttpRequest()

        handler = () ->
            if (@readyState == @DONE)
              if (@status == 200)
                resolve(@response)
              else
                reject new Error "getJSON: `#{url}` failed with status: [#{@status}]"

        xhr.open 'GET', url
        xhr.onreadystatechange = handler
        xhr.send()
        
Ember.Handlebars.helper 'add-background-image', (url) ->
  url = Handlebars.Utils.escapeExpression url
  new Handlebars.SafeString "<div class=\"image\" style=\"background: url('#{url}') 50% 50% / 100%;\"></div>"