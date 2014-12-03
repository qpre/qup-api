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
Our Router's job is, eventually, to handle URLs as routes, therefore we'll need to store have an array of route objects. Also the basic for any website: having a root route.

I usually use this class as an extend to a Singleton class as the router is unique to the application, but might be used from anywhere within the application. This part ain't included 

```coffeescript
class Router
```
