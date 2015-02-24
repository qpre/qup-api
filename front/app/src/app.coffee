window.QPRecipes = QPRecipes = Ember.Application.create()

QUPFixed = false

$(window).on 'scroll', () =>
  if $(window).scrollTop() >= $('.presenter').height() and not QUPFixed
    $('.navbar.navbar-default').addClass 'navbar-fixed-top'
    $('.presenter').removeClass 'show'
    $('.presenter-min').addClass 'show'
    QUPFixed = true

  if $(window).scrollTop() < $('.presenter').height() and QUPFixed
    $('.navbar.navbar-default').removeClass 'navbar-fixed-top'
    $('.presenter').addClass 'show'
    $('.presenter-min').removeClass 'show'
    QUPFixed = false
