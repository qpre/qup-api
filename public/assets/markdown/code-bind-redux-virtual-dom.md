For a little bit more than a year now I have been playing around with _React_ and _Redux_.
I will show you how you can get the benefits of _virtual-dom_ bound to _Redux_.

## When size matters

When _Redux_ is only **2kb**, _React_ weights **136kb**, this ain't so much, but in certain cases in can be **too** much.
_Virtual-DOM_ on its side only costs **17kb** after minification, a size that can go down when imported through a bundler using tree-shaking,
such as _Webpack-2.0_.

## Virtual-DOM

### Basics

The _Virtual-DOM_ approach comes from one postulate: modifying the DOM is expansive.
It gets even more expensive when running a single-page-application with frequent navigation or modifications of the application's internal state.
Modern browsers offer the possibility to create "in-memory" fractions of DOM with no link to the real one (the one you see).
This fragments can be used as drafts, when comparing those drafts with reality you can prepare a plan of action on how to make reality meet the draft,
and finally apply this plan of action to the reality. This is the _Virtual-DOM_ approach.
