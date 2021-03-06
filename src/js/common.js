$(document).ready(function () {
  lazy();
  landingScroll();
  popup();
  autoBlockHeight();
  checkboxes();
  publications();
  videos();
  presentation();
  awards();
  custompug();
  clients();
  cover();
  nav();
  $(".input_phone").mask("+7 (999) 999-99-99");
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();

//image-cover-box
function cover() {
  $('.cover-box').each(function() {
    //set size
    var th = $(this).height(),//box height
        tw = $(this).width(),//box width
        im = $(this).children('img'),//image
        ih = im.height(),
        iw = im.width();
    if ((tw/th) >= (iw/ih)) {
        im.addClass('ww').removeClass('wh');
    } else {
        im.addClass('wh').removeClass('ww');
    }
  });
}
//checkboxes
function checkboxes() {
  $('.checkbox__label').on('click', function() {
    if ($(this).find('input').is(':checked')) {
      $(this).addClass('checkbox__label_checked');
    } else {
      $(this).removeClass('checkbox__label_checked');
    }
  })
}
//nav
function nav() {
  var $navButton = $('.mobile-button'),
    $navClose = $('.nav-close'),
    $nav = $('.header__content'),
    flag;

  $navButton.on('click', function (e) {
    e.preventDefault();
    $nav.toggleClass('header__content_visible');
    navState();
  })
  $navClose.on('click', function () {
    $nav.removeClass('header__content_visible');
    navState();
  })
  
  function navState() {
    if ($nav.hasClass('header__content_visible')) {
      scrollLock.hide($("body"));
      $navButton.addClass('mobile-button_active');
      $nav.fadeIn(300);
      lazy();
    } else {
      scrollLock.show($("body"));
      $navButton.removeClass('mobile-button_active');
      $nav.fadeOut(300);
    }
  }

  $(window).resize(function () {
    if (innerWidth > 576) {
      if(flag) {
        $nav.addClass('header__content_visible').show();
        navState();
        scrollLock.show($("body"));
        flag = false;
      }
    } else {
      if(!flag) {
        $nav.removeClass('header__content_visible').hide();
        navState();
        scrollLock.show($("body"));
        flag = true;
      }
    }
  });
}
//scroll
function landingScroll() {
  var $body = $("body"),
      $link = $('.navigation__link')

  function scroll() {
    if($body.hasClass("in-scroll")) {} else {
      $link.each(function () {
        var window_top = $(window).scrollTop(),
            div_1 = $(this).attr('href');
        if ($(div_1).length > 0) {
          var div_top = $(div_1).offset().top,
              blockHeight = $(div_1).height();
          if (window_top >= div_top && window_top < div_top + blockHeight){
            $link.removeClass('navigation__link_active');
            $('a[href="'+div_1+'"]').addClass('navigation__link_active');
          }
          else {
            $('a[href="'+div_1+'"]').removeClass('navigation__link_active');
          };
        } 
      });
    }
  }

  scroll();
  $(window).scroll(function(){
    scroll();
  });

  $link.on('click', function (event) {
    var id  = $(this).attr('href'),
        top = $(id).offset().top + 2;
    
    event.preventDefault();

    $('body,html').animate({scrollTop: top}, 400);
      $body.addClass("in-scroll");
      setTimeout(function() {
        $body.removeClass("in-scroll");
      }, 400)
  })
}
//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    //threshold: '500',
    effect: 'fadeIn',
    effectTime: '300',
    afterLoad: function() {
      cover();
    }
  });
}
function publications() {
  var $slider = $('.publications__slider');
  
  $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    $(this).parents('.slider-section').find('.slide-count__current').text((currentSlide ? currentSlide : 0) + 1);
    $(this).parents('.slider-section').find('.slide-count__all').text(slick.slideCount);
    lazy();
  });

  $slider.slick({
    infinite: false,
    dots: false,
    arrows: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          adaptiveHeight: true
        }
      }
    ]
    
  });
}
//awards
function awards() {
  var $slider = $('.awards__slider');

  $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    $(this).parents('.slider-section').find('.slide-count__current').text((currentSlide ? currentSlide : 0) + 1);
    $(this).parents('.slider-section').find('.slide-count__all').text(slick.slideCount);
    lazy();
  });

  $slider.slick({
    infinite: false,
    dots: false,
    arrows: false,
    variableWidth: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          variableWidth: false,
          slidesToShow: 1
        }
      }
    ] 
  });
}
//popup
function popup() {
  $("[data-fancybox]").fancybox({
    loop: true,
    backFocus : false
  });
  $(".modal").fancybox({
    autoFocus: false,
    smallBtn: true,
    touch: false
  });
  $('body').removeClass('compensate-for-scrollbar');
}
//videos
function videos() {
  var $slider = $('.videos__slider'),
      top = $('.videos-slide__video').height() / 2;
      
  $slider.each(function() {
    $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      $(this).parents('.slider-section').find('.slide-count__current').text((currentSlide ? currentSlide : 0) + 1);
      $(this).parents('.slider-section').find('.slide-count__all').text(slick.slideCount);
      $(this).find('.slick-arrow').css('top', top);
      lazy();
    });
    $(this).slick({
      infinite: true,
      dots: false,
      arrows: true,
      speed: 400,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            adaptiveHeight: true
          }
        }
      ] 
    });
  })
  $(window).resize(function () {
    top = $('.videos-slide__video').height() / 2;
    $slider.find('.slick-arrow').css('top', top);
  });
}
//blocks
function autoBlockHeight() {
  resize();
  $(window).resize(function () {
    resize();
  });

  function resize() {
    var mh = 0,
    $block = $(".project-block__container");

    $block.css('height', 'auto');
    $block.each(function () {
      var h_block = parseInt($(this).height());
      if(h_block > mh) {
        mh = h_block;
      };
    });
    $block.height(mh);
  }
}
//custom pug
function custompug() {
  $('.slick-next').on('click', function() {
    $(this).parents('.slider-section').find('.slick-slider').slick('slickNext');
  })
  $('.slick-prev').on('click', function() {
    $(this).parents('.slider-section').find('.slick-slider').slick('slickPrev');
  })
}
//presentation
function presentation() {
  var $slider = $('.presentation__slider');

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: false,
    speed: 400,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          adaptiveHeight: true
        }
      }
    ]
  });
}
//clients
function clients() {
  var $slider = $('.clients__slider');

  $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    lazy();
  })

  $slider.slick({
    infinite: false,
    dots: false,
    arrows: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });
}