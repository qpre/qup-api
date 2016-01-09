import {publish, subscribe} from './events';
import * as Router from './router';

let GA_ID = 'UA-57446905-1';

export function initGoogleAnalytics() {
  (
    function(i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r;
      i.r = i.r || function() {
        (i.r.q = i.r.q || []).push(arguments);
      }, i.r.l = 1 * new Date();
      a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    }
  )(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', GA_ID, 'auto');
  ga('require', 'linkid', 'linkid.js');

  subscribe('route:changed', (currentRoute) => {
    ga('send', 'pageview', `${currentRoute}`);
  });
}
