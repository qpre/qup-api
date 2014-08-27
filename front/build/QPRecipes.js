var QPRecipes = {'assets':{'img':{},'style':{},'templates':{}},'extern':{'foundation':{'css':{},'img':{},'js':{'foundation':{},'vendor':{}}}},'files':{'markdown':{}},'src':{'controllers':{},'models':{},'routes':{},'views':{},'xfixtures':{}}};

(function() {
  var QPRecipes, getURL, showdown;

  window.QPRecipes = QPRecipes = Ember.Application.create();

  Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
  });

  showdown = new Showdown.converter();

  Ember.Handlebars.helper('format-markdown', function(input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
  });

  getURL = function(url) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var handler, xhr;
      xhr = new XMLHttpRequest();
      handler = function() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            return resolve(this.response);
          } else {
            return reject(new Error("getJSON: `" + url + "` failed with status: [" + this.status + "]"));
          }
        }
      };
      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      return xhr.send();
    });
  };

  QPRecipes.Post = DS.Model.extend({
    title: DS.attr('string'),
    bgPath: DS.attr('string'),
    bodyPath: DS.attr('string'),
    created: DS.attr('date'),
    edit: DS.attr('date'),
    body: Ember.computed(function() {
      var _this = this;
      if (this.get('bodyPath')) {
        getURL("files/markdown/" + (this.get('bodyPath'))).then(function(result) {
          return _this.set('body', result);
        });
        return "Loading...";
      } else {
        return "empty";
      }
    })
  });

  QPRecipes.Router.map(function() {
    return this.resource('posts', {
      path: '/'
    }, function() {
      return this.resource('post', {
        path: '/posts/:post_id'
      });
    });
  });

  QPRecipes.PostRoute = Ember.Route.extend({
    model: function(params) {
      return this.get('store').find('post', params.post_id);
    }
  });

  QPRecipes.PostsRoute = Ember.Route.extend({
    model: function() {
      return this.get('store').findAll('post');
    }
  });

  QPRecipes.ApplicationAdapter = DS.FixtureAdapter;

  QPRecipes.Post.FIXTURES = [
    {
      id: 1,
      title: 'Rougail Saucisse',
      bgPath: null,
      bodyPath: 'rougail.md',
      created: Date.now(),
      edit: Date.now()
    }, {
      id: 2,
      title: 'Sinatra',
      bgPath: null,
      bodyPath: 'sinatra.md',
      created: Date.now(),
      edit: Date.now()
    }, {
      id: 3,
      title: 'Lorem Ipsum',
      bgPath: null,
      bodyPath: 'lorem.md',
      created: Date.now(),
      edit: Date.now()
    }
  ];

}).call(this);
