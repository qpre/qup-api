import 'babel-polyfill';
import * as React from 'react';

window.React = React;

import * as ObjectObserve from './polyfills/object-observe';

ObjectObserve.applyPolyfill();

import {ApplicationLayout}  from './layouts/application';
import * as Index     from './layouts/index';
import * as Articles  from './layouts/articles';
import * as Article   from './layouts/article';
import * as Router    from './lib/router';

export let ApplicationView;

let routes = [
  {
    path: '',
    handler: (params) => {
      ApplicationView.yield(Index.Layout, params);
    },
  },
  {
    path: 'articles',
    handler: (params) => {
      ApplicationView.yield(Articles.Layout, params);
    },
  },
  {
    path: 'article/:id',
    handler: (params) => {
      ApplicationView.yield(Article.Layout, params)
    }
  }
];

window.addEventListener('load', () => {
  ApplicationView = React.render(ApplicationLayout, document.body);
  Router.init(routes);
});
