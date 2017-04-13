'use strict';

var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;

    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>';

      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {

    if ($(this).val()) {

      $('article').hide();
      $('article[data-author = "' + $(this).val() + '"]').fadeIn();

    } else {

      $('article').fadeIn();
      $('article.template').hide();

    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {

    if ($(this).val()) {

      $('article').hide();
      $('article[data-category = "' + $(this).val() + '"]').fadeIn();

    } else {

      $('article').fadeIn();
      $('article.template').hide();

    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {

  $('.main-nav .tab').on('click', function(){
    $('.tab-content').hide();
    var theTab = $(this).attr('data-content');
    $('#' + theTab).fadeIn();

  });
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('.read-on').on('click', function(){
    $('.read-on').hide();
    $('.article-body *:nth-of-type(n+2)').fadeIn();
  })

};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();

})
