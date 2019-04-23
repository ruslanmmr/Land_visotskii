$(document).ready(function () {
  lazy();
  nav();
  modalMagnificBasket();
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

//nav
function nav() {
  var $navButton = $('.mobile-button'),
    $nav = $('.header__content'),
    flag;

  $navButton.on('click', function (e) {
    e.preventDefault();
    $nav.toggleClass('header__content_visible');
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
        flag = false;
      }
    } else {
      if(!flag) {
        $nav.removeClass('header__content_visible').hide();
        navState();
        flag = true;
      }
    }
  });
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

//tooltips
function tooltip() {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-light',
    trigger:'custom',
    animationDuration: 100,
    trackerInterval: 100,
    triggerOpen: {
      click: true,  // For mouse
      touchstart: true, // For touch device
      mouseenter: true    // For touch device
    },
    triggerClose: {
      click: true,  // For mouse
      touchleave: true, // For touch device
      mouseleave: true // For mouse
    }
  });
}
function slider() {
  var slider = $('.slider');

  slider.on('init', function () {
    $(this).addClass('slider_visible')
  });
  
  slider.each(function() {
    var slideCount = 1,
        slideCount1200 = 1,
        slideCount992 = 1,
        slideCount768 = 1,
        slideCount576 = 1,
        slideCount420 = 1,
        arrows = false,
        dots = false;

    if($(this).hasClass('slider_dots')) {
      dots = true;
    }
    if($(this).hasClass('slider_arrows')) {
      arrows = true;
    }
    if($(this).hasClass('recommendations-slider')) {
      slideCount = 6;
      slideCount1200 = 5;
      slideCount992 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 1;
    }
    if($(this).hasClass('barbers__slider')) {
      slideCount = 4;
      slideCount1200 = 4;
      slideCount992 = 3;
      slideCount768 = 2;
      slideCount576 = 1;
      slideCount420 = 1;
    }

    $(this).slick({
      infinite: true,
      dots: dots,
      arrows: arrows,
      speed: 600,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: slideCount1200,
            slidesToScroll: slideCount1200
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: slideCount992,
            slidesToScroll: slideCount992
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: slideCount768,
            slidesToScroll: slideCount768
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: slideCount576,
            slidesToScroll: slideCount576
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: slideCount420,
            slidesToScroll: slideCount420
          }
        }
      ]
    });
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
function modalMagnificBasket() {
  $('.popup_link').magnificPopup({
    closeBtnInside: false,
    showCloseBtn: false,
    fixedContentPos: true,
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });
  $('.popup-close').click(function() {
    $.magnificPopup.close();
});
}