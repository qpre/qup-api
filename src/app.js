import 'babel-polyfill';
import * as React from 'react';

window.React = React;

import * as ObjectObserve from './polyfills/object-observe';

ObjectObserve.applyPolyfill();

import {ApplicationLayout}  from './layouts/application';
import * as Index     from './layouts/index';
import * as Articles  from './layouts/articles';
import * as Article   from './layouts/article';
import * as About     from './layouts/about';
import * as Router    from './lib/router';

import {initGoogleAnalytics} from './lib/google_analytics';

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
    path: 'about',
    handler: (params) => {
      ApplicationView.yield(About.Layout, params);
    },
  },
  {
    path: 'article/:id',
    handler: (params) => {
      ApplicationView.yield(Article.Layout, params);
    },
  },
];

window.addEventListener('load', () => {
  ApplicationView = React.render(ApplicationLayout, document.body);
  initGoogleAnalytics();
  Router.init(routes);
});
