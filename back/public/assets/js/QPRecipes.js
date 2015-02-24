var QPRecipes = {'assets':{'img':{},'style':{'.sass-cache':{'34a425aafa7dafd66f8721deb1bb245d4d1ad57c':{}}},'templates':{}},'extern':{'bootstrap':{'css':{},'fonts':{},'js':{}},'highlight':{'styles':{}}},'files':{'markdown':{}},'src':{'controllers':{},'models':{},'routes':{},'views':{},'xfixtures':{}}};

(function() {
  var QPRecipes, QUPFixed, formatMarkdown, getURL, highlightSyntax,
    _this = this;

  window.QPRecipes = QPRecipes = Ember.Application.create();

  QUPFixed = false;

  $(window).on('scroll', function() {
    if ($(window).scrollTop() >= $('.presenter').height() && !QUPFixed) {
      $('.navbar.navbar-default').addClass('navbar-fixed-top');
      $('.presenter').removeClass('show');
      $('.presenter-min').addClass('show');
      QUPFixed = true;
    }
    if ($(window).scrollTop() < $('.presenter').height() && QUPFixed) {
      $('.navbar.navbar-default').removeClass('navbar-fixed-top');
      $('.presenter').addClass('show');
      $('.presenter-min').removeClass('show');
      return QUPFixed = false;
    }
  });

  Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
  });

  formatMarkdown = function(input) {
    var showdown;
    showdown = new Showdown.converter();
    return new Handlebars.SafeString(showdown.makeHtml(input));
  };

  highlightSyntax = function(input) {
    return new Handlebars.SafeString($('pre code').each(function(i, e) {
      return hljs.highlightBlock(e);
    }));
  };

  Ember.Handlebars.helper('format-markdown', formatMarkdown);

  Ember.Handlebars.helper('highlight-syntax', highlightSyntax);

  Ember.Handlebars.helper('format-article', function(input) {
    return formatMarkdown(highlightSyntax(input));
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

  Ember.Handlebars.helper('add-background-image', function(url) {
    url = Handlebars.Utils.escapeExpression(url);
    return new Handlebars.SafeString("<div class=\"image\" style=\"background: url('" + url + "') 50% 50% / 100%;\"></div>");
  });

  QPRecipes.Post = DS.Model.extend({
    title: DS.attr('string'),
    bgPath: DS.attr('string'),
    bodyPath: DS.attr('string'),
    created: DS.attr('date'),
    edit: DS.attr('date'),
    tags: DS.attr('array'),
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
    tags: DS.attr('array'),
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
    this.resource('posts', {
      path: '/'
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

  QPRecipes.Router.reopen({
    rootURL: '/posts/'
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

  QPRecipes.PostView = Ember.View.extend({
    classNames: ['post', 'animated'],
    animations: {
      "in": 'fadeInDown',
      out: 'fadeOutDown'
    },
    willAnimateIn: function() {
      return this.$el.addClass(this.get('animations')["in"]);
    },
    animateIn: function(done) {
      var _this = this;
      return Em.run.later(this, function() {
        _this.$el.removeClass(_this.get('animations')["in"]);
        return done();
      }, 1000);
    },
    willAnimateOut: function() {
      return this.$el.addClass(this.get('animations').out);
    },
    animateOut: function(done) {
      return Em.run.later(this, done, 1000);
    },
    didAnimateOut: function() {
      return this.$el = null;
    }
  });

  QPRecipes.PostsView = Ember.View.extend({
    classNames: ['posts', 'animated'],
    animations: {
      "in": 'fadeInDown',
      out: 'fadeOutDown'
    },
    willAnimateIn: function() {
      return this.$el.addClass(this.get('animations')["in"]);
    },
    animateIn: function(done) {
      var _this = this;
      return Em.run.later(this, function() {
        _this.$el.removeClass(_this.get('animations')["in"]);
        return done();
      }, 1000);
    },
    willAnimateOut: function() {
      return this.$el.addClass(this.get('animations').out);
    },
    animateOut: function(done) {
      return Em.run.later(this, done, 1000);
    }
  });

  QPRecipes.RecipeView = Ember.View.extend({
    classNames: ['recipe', 'animated'],
    animations: {
      "in": 'fadeInDown',
      out: 'fadeOutDown'
    },
    willAnimateIn: function() {
      this.$el.addClass(this.get('animations')["in"]);
      console.log(this.$el.find('.image'));
      return this.$el.find('.image').css({
        'background': 'url("http://lorempixel.com/400/200/food") no-repeat',
        'background-size': '100%',
        'background-position': 'center center'
      });
    },
    animateIn: function(done) {
      var _this = this;
      return Em.run.later(this, function() {
        _this.$el.removeClass(_this.get('animations')["in"]);
        return done();
      }, 1000);
    },
    willAnimateOut: function() {
      return this.$el.addClass(this.get('animations').out);
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
    animations: {
      "in": 'fadeInDown',
      out: 'fadeOutDown'
    },
    willAnimateIn: function() {
      return this.$el.addClass(this.get('animations')["in"]);
    },
    animateIn: function(done) {
      var _this = this;
      return Em.run.later(this, function() {
        _this.$el.removeClass(_this.get('animations')["in"]);
        return done();
      }, 1000);
    },
    willAnimateOut: function() {
      return this.$el.addClass(this.get('animations').out);
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
      title: 'Writing a simple client router',
      bgPath: '/assets/img/Desert-Road-Wallpaper-Photos.jpg',
      bodyPath: 'blog-simple-client-router.md',
      created: Date.now(),
      edit: Date.now(),
      tags: ['CoffeeScript', "Javascript", "FrontEnd"]
    }, {
      id: 2,
      title: 'Writing a simple client router',
      bgPath: '/assets/img/Desert-Road-Wallpaper-Photos.jpg',
      bodyPath: 'blog-simple-client-router.md',
      created: Date.now(),
      edit: Date.now(),
      tags: ['CoffeeScript', "Javascript", "FrontEnd"]
    }
  ];

  QPRecipes.Recipe.FIXTURES = [
    {
      id: 1,
      title: 'Sinatra',
      bgPath: 'http://lorempixel.com/400/250/food',
      bodyPath: 'sinatra.md',
      created: Date.now(),
      edit: Date.now()
    }, {
      id: 2,
      title: 'Lorem Ipsum',
      bgPath: 'http://lorempixel.com/400/250/food',
      bodyPath: 'lorem.md',
      created: Date.now(),
      edit: Date.now()
    }, {
      id: 3,
      title: 'Lorem Ipsum',
      bgPath: 'http://lorempixel.com/400/250/food',
      bodyPath: 'lorem.md',
      created: Date.now(),
      edit: Date.now()
    }
  ];

}).call(this);
