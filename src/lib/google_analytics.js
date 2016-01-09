import {publish, subscribe} from './events';
import * as Router from './router';

export function initGoogleAnalytics() {
  ga('create', 'UA-57446905-1', 'auto');
  ga('require', 'linkid', 'linkid.js');

  subscribe('route:changed', () => {
    ga('send', 'pageview', '/new-page');
  });
}
