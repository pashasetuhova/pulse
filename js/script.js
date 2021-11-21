/* $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000, */
        /* adaptiveHeight: true, */
        /* prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/prev.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/next.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ] 
      });
  }); */
    const slider = tns({
      container: '.carousel__inner',
      items: 1,
      slideBy: 'page',
      autoplay: false,
      controls: false,
      nav: false,
      /* responsive: {
          640: {
            edgePadding: 20,
            gutter: 20,
            items: 2
          },
          700: {
            gutter: 30
          },
          900: {
            items: 3
          }
        } */
   });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

/*     $('.catalog-item__link').each(function(i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });

    $('.catalog-item__back').each(function(i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    }); */

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function (e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__list__back');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanx, #order').fadeOut('slow')
    });

    /* $('.button_mini').on('click', function() {
      $('.overlay, #order').fadeIn('slow');
    }); */

    $('.button_mini').each(function(i) {
      $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });

    /* $('#consultation form').validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, ввведите своё имя",
          minlength: jQuery.validator.format("Введите не меньше {0} символов!")
        },
        phone: "Пожалуйста, ввведите свой телефон",
        email: {
          required: "Пожалуйста, ввведите свой e-mail",
          email: "e-mail должен соответствовать формату name@domain.com"
        }
      }
    });
    $('#order form').validate();
    $('#consultation-form form').validate(); */

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, ввведите своё имя",
            minlength: jQuery.validator.format("Введите не меньше {0} символов!")
          },
          phone: "Пожалуйста, ввведите свой телефон",
          email: {
            required: "Пожалуйста, ввведите свой e-mail",
            email: "e-mail должен соответствовать формату name@domain.com"
          }
        }
      });
    }

    validateForms('#consultation form');
    validateForms('#order form');
    validateForms('#consultation-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $("#consultation, #order").fadeOut();
        $('.overlay, #thanx').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    //smooth scoll and page up

    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    new WOW().init();