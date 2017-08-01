'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from an attribute in `this` article element,
      //       and then use that bit of text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
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
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
    //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
    //         onto it.
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${this.value}"]`).fadeIn(1000);
    } else {
      $('article').each(function() {
        if (!$('article').hasClass('template')){
          $(this).show();
        }
      });
    }

    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${this.value}"]`).fadeIn(1000)
    } else {
      $('article').each(function(){
        if (!$('article').hasClass('template')) {
          $(this).show();
        }
        $('#author-filter').val('');
      });
    }
  });
}

articleView.handleMainNav = function() {
  $('.main-nav .tab').on('click', function() {
    $('.tab-content').hide();
    $('#' + $(this).attr('data-content')).fadeIn();
    // $([data-content=this.data-content]).fadeIn();
  });
};

  // original code: works but not sustainable
    // $('.main-nav .tab:first').click(function(){
  //   $('.tab-content').hide();
  //   $('.main-nav .data-content:first' ).fadeIn();
  // });
  // $('.main-nav .tab:second').click(function(){
  //   $('.tab-content').hide();
  //   $('.main-nav .data-content:second' ).fadeIn();
  // });// Let's now trigger a click on the first .tab element, to set up the page.

$('.show-less').hide();
articleView.setTeasers = function() {
  $('.article-body :nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.

  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.
  $('.read-on').on('click', function(event){
    event.preventDefault();
    $(this).hide();
    $(this).siblings('.article-body').contents().show();
    $(this).siblings('.show-less').show();
    $('.show-less').on('click',function(){
      $(this).hide();
      $('.article-body :nth-of-type(n+2)').hide();
      $('.read-on').show();
    })
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
