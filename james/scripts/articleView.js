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
  $('.main-nav .tab').on('click', function(){
    $('.tab-content').hide();
    $('#' + $(this).attr('data-content')).fadeIn();
  })
  
  // This is how I accomplished the task before class.

  // $('.main-nav').on('click', '.tab', function() {
  //   if ($(this).attr('data-content') === 'articles') {
  //     $('.tab-content').hide();
  //     $('#articles').fadeIn();
  //   } else if ($(this).attr('data-content') === 'about') {
  //     $('.tab-content').hide();
  //     $('#about').fadeIn();
  //   }
  
  // });
  $('.main-nav .tab:first').click();
}

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    var $theLink = $(this);
    var $articleBody = $theLink.siblings('.article-body');
    $articleBody.children().show();
    $theLink.hide();
  });  
};
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.populateFilters();
  articleView.setTeasers();
  articleView.handleAuthorFilter();
})
