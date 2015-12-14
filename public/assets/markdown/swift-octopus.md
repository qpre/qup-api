Two weeks ago [Apple open sourced Swift](https://developer.apple.com/swift/blog/?id=34) as announced earlier in June.

![cover](/assets/images/swift.jpg =100%x*)

Yet another web framework
=========================

I won't spend so much time on why I chose Swift to write Octopus.
When Swift first came out I felt Apple missed an occasion of making a great web development tool.
With Swift 2.2, this has been fixed, and I want to play with it.

Unfortunately there aren't so much Swift web frameworks around.
An interesting attemps is [Swifter](http://github.com/glock45/swifter), which I played a bit with.

When using Swifter I felt there was something worth dig in, but I needed more, so I decided to take a shoot at writing my own tiny HTTP framework.

To do so, I used Swifter's codebase as the first base of inspiration (even though I tried to make it more readable through comments and code shape, Octopus's socket handling implementation is largely inspired fro Swifter's).

Octopus
=======

**Goal :**

Octopus's goal is to provide an easy to use framework for server-side development.
It will be shaped with the inspiration given by nowadays re-birth of functional programming, and tainted in [Ruby's Sinatra](http://www.sinatrarb.com/) and [NodeJS's Express](http://expressjs.com/) declarative style.

It currently consists of a simple cross-platform socket's implementation, but I hope to provide at least a Router with basic POST and GET method handlers and static files delivery over the next weeks.

**why the name ?**

Octopus's will be using [Grand Central Dispatch](https://developer.apple.com/library/ios/documentation/Performance/Reference/GCD_libdispatch_Ref/) to handle concurency. Each thread looks to me like a new tentacula to a bigger organism, therefore the name.

Where to follow its development
===============================

Octopus will always be available on [Github](http://github.com/qpre/octopus).

And you can use it in your **Swift 2.2+** projects by adding it to your **Package.swift**:

```swift
let package = Package(
  name: "MyAwesomeSwiftServerApp",
  dependencies: [
    .Package(url: "https://github.com/qpre/octopus.git", majorVersion: 1),
  ]
)
```
