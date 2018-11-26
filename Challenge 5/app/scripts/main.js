$(document).ready(function() {

    var $books = $('.content__books');

    $.ajax({
        type: 'GET',
        url: '../books.json',
        success: function(books) {
            $.each(books, function(i, book){
                $books.append(' <div class="content__item">\
                                    <img class="content__img" src='+ book.volumeInfo.thumbnail +' alt=""/>\
                                    <p class="content__book-title">'+ book.volumeInfo.title +'</p>\
                                    <h3 class="content__author">'+ book.volumeInfo.authors +'</h3>\
                                    <div class="pop-up">\
                                        <div class="pop-up__container">\
                                            <a href="#" class="pop-up__button js-pop-up-button">&#10006;</a>\
                                            <h3 class="pop-up__title">'+ book.volumeInfo.title +'</h3>\
                                            <p class="pop-up__novel">Novel by <span class="pop-up__novel pop-up__novel--color">'+ book.volumeInfo.authors +'</span></p>\
                                            <p class="pop-up__summary">Summary</p>\
                                            <p class="pop-up__description">'+ book.volumeInfo.description +'</p>\
                                            <p class="pop-up__date">'+ book.volumeInfo.publishedDate +'</p>\
                                        </div>\
                                    </div>\
                                </div>')

                                $('.pop-up').hide();
            });
        }
    });

    $( '.content__books' ).on( 'click', '.content__item', function() {
        console.log($( this ));
      });
});
$( window ).on( 'load', function() {
    $('.content__item').click(function(e) {
        var $popup = $(this).find('.pop-up');
        $popup.fadeIn(1000);
        $('.is-open').hide();
        $('.pop-up').removeClass('is-open');
        $popup.addClass('is-open');
    });

    $('.js-pop-up-button').click(function (e) { 
        $('.pop-up').removeClass('is-open');
        $(this).parents('.pop-up').fadeOut(700);
        e.stopPropagation();

    });
});