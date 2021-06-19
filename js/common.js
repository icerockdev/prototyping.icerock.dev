// svg icons support ie11
(function () {
    svg4everybody();
})();

// check if touch device
function isTouchDevice() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function mq(query) {
        return window.matchMedia(query).matches;
    };
    if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

if (isTouchDevice()) {
    $('body').addClass('touch-device');
}

// header
(function () {
    var header = $('.js-header'),
        burger = header.find('.js-header-burger'),
        wrap = header.find('.js-header-wrap'),
        bg = header.find('.js-header-bg'),
        items = header.find('.js-header-item'),
        search = header.find('.js-header-search'),
        open = header.find('.js-header-open');

    // header search
    open.on('click', function () {
        search.toggleClass('active');
    });

    // header menu mobile
    burger.on('click', function () {
        burger.toggleClass('active');
        wrap.toggleClass('visible');
        bg.toggleClass('show');
    });
    bg.on('click', function () {
        burger.removeClass('active');
        wrap.removeClass('visible');
        bg.removeClass('show');
    });

    // header dropdown
    if (isTouchDevice()) {
        items.each(function () {
            var item = $(this),
                head = item.find('.js-header-head'),
                body = item.find('.js-header-body');
            if (window.matchMedia("(min-width: 768px)").matches) {
                head.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!item.hasClass('active')) {
                        items.removeClass('active');
                        item.addClass('active');
                    } else {
                        items.removeClass('active');
                    }
                });

                body.on('click', function (e) {
                    e.stopPropagation();
                });
            }
        });

        $('body').on('click', function () {
            items.removeClass('active');
        });
    }
})();

// global variables
var prevArrow = '<button type="button" class="slick-prev"><svg class="icon icon-arrow-prev"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use></svg></button>',
    nextArrow = '<button type="button" class="slick-next"><svg class="icon icon-arrow-next"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use></svg></button>';

$(document).ready(function () {

    // features
    (function () {
        var features = $('.js-features'),
            slider = features.find('.js-features-slider'),
            status = features.find('.js-features-status');

        slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            status.html('<span class="status__number">0' + i + '</span><span class="status__all">0' + slick.slideCount + '</span>');
        });

        slider.slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: prevArrow,
            nextArrow: nextArrow,
            dots: false,
            infinite: false,
            speed: 600,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    })();

    $('.js-details-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 2000
    });

    // teams slider
    $('.js-teams-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        speed: 700,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    // design slider
    $('.js-design-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        speed: 700,
        infinite: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    // package
    (function () {
        var packages = $('.js-package'),
            sliderPackage = packages.find('.js-package-slider');
        sliderPackage.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            prevArrow: sliderPackage.closest('.js-package').find('.js-package-prev'),
            nextArrow: sliderPackage.closest('.js-package').find('.js-package-next'),
            speed: 700,
            fade: true,
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }]
        });
    })();
});

// accord
(function () {
    var accord = $('.js-accord'),
        items = accord.find('.js-accord-item');
    items.each(function () {
        var item = $(this),
            head = item.find('.js-accord-head'),
            body = item.find('.js-accord-body');

        head.on('click', function () {
            item.toggleClass('active');
            body.slideToggle();
        });
    });
})();

// plan
(function () {
    var plan = $('.js-plan'),
        select = plan.find('.js-plan-select'),
        item = plan.find('.js-plan-item');
    select.change(function () {
        var indexOption = select.find('option:selected').index();
        item.hide();
        item.eq(indexOption).show();
    });
})();

// footer
(function () {
    var footer = $('.js-footer'),
        items = footer.find('.js-footer-col');
    items.each(function () {
        var item = $(this),
            category = item.find('.js-footer-category'),
            menu = item.find('.js-footer-menu');

        category.on('click', function () {
            if (!category.hasClass('active')) {
                items.removeClass('active');
                items.find('.js-footer-menu').slideUp();
                item.addClass('active');
                menu.slideDown();
            } else {
                items.removeClass('active');
                items.find('.js-footer-menu').slideUp();
            }
        });
    });
})();

// scroll to section
(function () {
    var link = $('.js-link-scroll');
    link.click(function () {
        $("html, body").animate({
            scrollTop: $(link.attr("href")).offset().top + "px"
        }, {
            duration: 1000
        });
        return false;
    });
})();

// magnificPopup
(function () {
    var link = $('.js-popup-open');
    link.magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        removalDelay: 200,
        callbacks: {
            beforeOpen: function beforeOpen() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });
})();

// aos animation
AOS.init();

// parallax effect
(function () {
    var parallax = $('.js-parallax');
    if (parallax.length) {
        parallax.each(function () {
            var _this = $(this),
                scale = _this.data('scale'),
                orientation = _this.data('orientation');

            new simpleParallax(_this[0], {
                scale: scale,
                orientation: orientation,
                overflow: true,
                transition: 'cubic-bezier(0,0,0,1)'
            });
        });
    }
})();

var rellax = new Rellax('.js-rellax', {
    center: true,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
});