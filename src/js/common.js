$(document).ready(function () {
  lazy();
  nav();
  popup();
  autoBlockHeight();
  landingScroll();
  checkboxes();
  publications();
  presentation();
  $(".input_phone").mask("+7 (999) 999-99-99");
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
    //scroll-styling
    cursorcolorVar = "#fff",
    cursorwidthVar = "7px",
    cursorborderVar = "0",
    cursorborderradiusVar = "0",
    zindexVar = [100],
    bouncescrollVar = false;
    //

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
        top = $(id).offset().top;
    
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
    visibleOnly: false,
    threshold: '500',
    effect: 'fadeIn',
    effectTime: '300'
  });
}
function publications() {
  var $slider = $('.publications__slider');
  
  $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    $(this).siblings().find('.slide-count__current').text((currentSlide ? currentSlide : 0) + 1);
    $(this).siblings().find('.slide-count__all').text(slick.slideCount);
    console.log(slick.slideCount)
  });

  $slider.slick({
    infinite: false,
    dots: false,
    arrows: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '.publications__prev',
    nextArrow: '.publications__next'
    
  });
}
//gallery
function gallery() {
  var row = $('.gallery__row:not(:first-child)'),
      block = $('.gallery-block'),
      title = $('.gallery-block_title'),
      margin;

  if(innerWidth>576) {
    block.css('margin-top', '0');
    row.each(function() {
        margin = -($(this).height() / 2);
        $(this).css('margin-top', margin);
    }) 
  } else {
    row.css('margin-top', '0');
    block.each(function() {
      margin = -($(this).height() / 2);
      $(this).css('margin-top', margin);
    })
  }
}
//popup
function popup() {
  $("[data-fancybox]").fancybox({
    loop: true
  });
  $("[data-fancybox='modal']").fancybox({
    autoFocus: false,
    smallBtn: true,
    touch: false,
    arrows: false
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

//presentation
function presentation() {
  var $slider = $('.presentation__slider');

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    speed: 400,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '.presentation__prev',
    nextArrow: '.presentation__next',
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