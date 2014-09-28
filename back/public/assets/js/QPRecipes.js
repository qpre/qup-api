var QPRecipes = {'assets':{'img':{},'style':{},'templates':{}},'extern':{'bootstrap':{'css':{},'fonts':{},'js':{}}},'files':{'markdown':{}},'src':{'controllers':{},'models':{},'routes':{},'views':{},'xfixtures':{}}};

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

  QPRecipes.Recipe = DS.Model.extend({
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
    this.resource('posts', {
      path: '/posts'
    });
    this.resource('post', {
      path: '/posts/:post_id'
    });
    this.resource('recipes', {
      path: '/recipes'
    });
    return this.resource('recipe', {
      path: '/recipes/:recipe_id'
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

  QPRecipes.RecipeRoute = Ember.Route.extend({
    model: function(params) {
      return this.get('store').find('recipe', params.recipe_id);
    }
  });

  QPRecipes.RecipesRoute = Ember.Route.extend({
    model: function() {
      return this.get('store').findAll('recipe');
    }
  });

  QPRecipes.ApplicationAdapter = DS.FixtureAdapter;

  QPRecipes.RecipeView = Ember.View.extend({
    classNames: ['recipe', 'animated'],
    willAnimateIn: function() {
      return this.$el.addClass('fadeInRight');
    },
    animateIn: function(done) {
      var _this = this;
      return Em.run.later(this, function() {
        _this.$el.removeClass('fadeInRight');
        return done();
      }, 1000);
    },
    willAnimateOut: function() {
      return this.$el.addClass('fadeOutLeft');
    },
    animateOut: function(done) {
      return Em.run.later(this, done, 1000);
    },
    didAnimateOut: function() {
      return this.$el = null;
    }
  });

  QPRecipes.RecipesView = Ember.View.extend({
    classNames: ['recipes', 'animated'],
    willAnimateIn: function() {
      return this.$el.addClass('fadeInLeft');
    },
    animateIn: function(done) {
      var _this = this;
      return Em.run.later(this, function() {
        _this.$el.removeClass('fadeInLeft');
        return done();
      }, 1000);
    },
    willAnimateOut: function() {
      return this.$el.addClass('fadeOutLeft');
    },
    animateOut: function(done) {
      return Em.run.later(this, done, 1000);
    },
    didAnimateOut: function() {
      return this.$el = null;
    }
  });

  QPRecipes.Post.FIXTURES = [
    {
      id: 1,
      title: 'Sinatra',
      bgPath: null,
      bodyPath: 'sinatra.md',
      created: Date.now(),
      edit: Date.now()
    }, {
      id: 2,
      title: 'Lorem Ipsum',
      bgPath: null,
      bodyPath: 'lorem.md',
      created: Date.now(),
      edit: Date.now()
    }
  ];

  QPRecipes.Recipe.FIXTURES = [
    {
      id: 1,
      title: 'Sinatra',
      bgPath: null,
      bodyPath: 'sinatra.md',
      created: Date.now(),
      edit: Date.now()
    }, {
      id: 2,
      title: 'Lorem Ipsum',
      bgPath: null,
      bodyPath: 'lorem.md',
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
