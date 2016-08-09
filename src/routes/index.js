import React                            from 'react';
import { Route, IndexRoute }            from 'react-router';
import { default as ApplicationLayout } from '../containers/application';
import { default as AboutLayout }       from '../containers/about';
import { default as ArticlesLayout }    from '../containers/articles';
import { default as ArticleLayout }     from '../containers/article';
import { default as IndexLayout }       from '../containers';

export default (
  <Route path="/" component={ApplicationLayout}>
    <IndexRoute component={IndexLayout} />

    <Route path="/" component={IndexLayout} />
    <Route path="/about" component={AboutLayout} />
    <Route path="/articles" component={ArticlesLayout} />
    <Route path="/article/:id" component={ArticleLayout} />
  </Route>
);
