*How to write a router for your lightweight client applications.*

**disclaimer** : *This post's code excerpts will be written in [CoffeeScript](http://coffeescript.org/) but I'll provide you with a Javascript gist at the end of the article.*

## Why ?

If you've been building apps for the web recently, you surely noticed that the main trend is to fully separate frontend and backend of the web stack.

Having the frontend more or less behaving as a single page application, and your backend simply exposing APIs for your frontend to feed on. As the server doesn't serve pages anymore, this kind of web applications tend to break the navigation, and thus the user experience (Go on and hit the back button...)

Most of the frameworks available are providing full-featured routers amongst all their features. 
But what if you want to build a light-weight website, that doesn't require any extended feature (e.g: an online Resume) ?



## What we got

Modern browsers are offering us quite an extended set of APIs to play with. The ones that will interest us the most are the [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) objects. The window object has one associated, and accessible as *window.location*. It provides us with the page's full URL and allows us to set a new URL.

**Example :**
```coffeescript
console.log window.location.href
# => "http://qup.re/index.html#/posts/2"
window.location.href = "http://qup.re/index.html#/posts/3"
# will set up the url bar to the address passed

```

An interesting URL feature is the '#' char, what you pass afterwards is readable, but won't trigger any page reload: which is exactly the kind of behaviour we're looking for. Even more, the browser has a *'hashchange'* event we can listen to to trigger our page loads.



## En Route !

Okay, open your favourite music streamer, put on *Route 66* by the *Rolling Stones*, and let's write our router.

### Basics
Our Router's job is, eventually, to handle URLs as routes, therefore we'll need to store an array of route objects. We'll also need the basic for any website: having a root route.

I usually build have this class be a Singleton, because it's stateful and being used everywhere.

```coffeescript
class Router
	_routes: []
	_root: '/'
```

#### Construtor
Let's give our class a constructor which will bind it to the events we talked about earlier:

```coffeescript
constructor: () ->
    # registering to URL hash changes for this window
    window.addEventListener "hashchange", (() => @listen()), false
    # this will allow us to apply current route after load
    window.addEventListener 'load', (e) -> AE.Router.getInstance().check()
```


```coffeescript
class AE.Router extends AE.Singleton
  _routes: []
  _root: '/'
  
  # simple constructor
  constructor: () ->
    # registering to URL hash changes for this window
    window.addEventListener "hashchange", (() => @listen()), false
    # this will allow us to apply current route after load
    window.addEventListener 'load', (e) -> AE.Router.getInstance().check()
  
  ###
    getFragment:
    gets the current URL fragment from browser
  ###
  getFragment: () ->
    match = window.location.href.match /#(.*)$/
    frag = @_clearSlashes if match then match[1] else ''
    frag
    
  ###
    clearSlashes:
    @param {String} path : the path to be cleaned up
  ###
  _clearSlashes: (path) ->
    path.toString().replace(/\$/, '').replace(/^\//, '')
    
  ###
    add: associates a regexp to a handler
    @param {String} re : a regexp defining the route
    @param {Function} handler: what to do with the route
  ###
  add: (re, handler) ->
    @_routes.push {re: re, handler: handler}
    @
  
  ###
    remove:
    @param {Function,String} param a selector for a route to remove
  ###
  remove: (param) ->
    for route in @_routes
      if route.handler == param or route.re.toString() == param.toString()
        @_routes.splice i, 1
        return @
    @
  
  ###
    flush: reinits the Router
  ###
  flush: () ->
    @_routes = []
    @_root = '/'
    
  ###
    check: applies the handler for a path fragment
    (if any)
  
    @param {frag} the path fragment to be checked
  ###
  check: (frag) ->
    fragment = frag || @getFragment()
    for route in @_routes
      match = fragment.match(route.re)
      if match
        match.shift()
        route.handler.apply {}, match
        return @

    AE.log "AE.Router: no such route #{fragment}, redirecting at index"
    @navigate @_root
    
  ###
    listen: hashchanged event listener
      retrieves the current path and applies check on it
  ###
  listen: () ->
    if window.location.hash != @current
      @current = window.location.hash
      @check @current
      
  ###
    navigate: sets up a new hash path in the browser
  
    @param {String} path
  ###
      
  navigate: (path) ->
    path = path || ''
    window.location.href.match(/#(.*)$/)
    window.location.href = window.location.href.replace(/#(.*)$/, '')+"##{path}"
    @
```

