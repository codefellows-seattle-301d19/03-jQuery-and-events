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
      $('article.template').hide();
      $('article').show();
      
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

      $('article.template').hide();
      
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    if ($(this).attr('data-content') === 'articles') {
      $('.tab-content').hide();
      $('#articles').fadeIn();
    } else if ($(this).attr('data-content') === 'about') {
      $('.tab-content').hide();
      $('#about').fadeIn();
    }
  });
}

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.
  $('.read-on').on('click', function(){
      $('.read-on').show();
  });
  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

};
articleView.populateFilters();
$(document).ready(function() {
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.populateFilters();
  articleView.setTeasers();
articleView.handleAuthorFilter();
})
