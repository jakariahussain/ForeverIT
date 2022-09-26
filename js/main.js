
/*================= counterUp =================*/
$('.counter').counterUp({
    delay: 10,
    time: 1000
});

/*================= Data-Background =================*/
$("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})

/*================= Sticky Menu =================*/
 $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 1) {
        $(".sticky").removeClass("sticky-header");
    } else {
        $(".sticky").addClass("sticky-header");
    }
});



/******************** mobile menu ********************/
$('#mobile-menu').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "991",
});

/*================= banner-carosel-area-slide =================*/
$('.banner-area .owl-carousel').owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

/*================= student-review =================*/
$('.technology-area .owl-carousel').owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})

/*================= student-review =================*/
$('.student-review .owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

/*================= student-review =================*/
$('#client .owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 4
        }
    }
})

/*================= imgages-gallery =================*/

$('.gallery-item').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    }
});
/*================= video-gallery =================*/

$('.video').magnificPopup({
    type: 'iframe',
});
/*================= niceSelect =================*/
$('select').niceSelect();
/*================= Work file =================*/
var $grid = $('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
});
var $buttonGroup = $('.filters');
$buttonGroup.on('click', 'li', function (event) {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    var $button = $(event.currentTarget);
    $button.addClass('is-checked');
    var filterValue = $button.attr('data-filter');
    $grid.isotope({
        filter: filterValue
    });
});

/*================= file Upload =================*/
var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
isIE = /msie/i.test(navigator.userAgent);

$.fn.customFile = function() {

return this.each(function() {

    var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
        $wrap = $('<div class="file-upload-wrapper">'),
        $input = $('<input type="text" class="file-upload-input" />'),
        // Button that will be used in non-IE browsers
        $button = $('<button type="button" class="file-upload-button">Select a File</button>'),
        // Hack for IE
        $label = $('<label class="file-upload-button" for="' + $file[0].id + '">Select a File</label>');
    // can still trigger events
    $file.css({
        position: 'absolute',
        left: '-9999px'
    });

    $wrap.insertAfter($file)
        .append($file, $input, (isIE ? $label : $button));

    // Prevent focus
    $file.attr('tabIndex', -1);
    $button.attr('tabIndex', -1);

    $button.click(function() {
        $file.focus().click(); // Open dialog
    });

    $file.change(function() {

        var files = [],
            fileArr, filename;
        // all filenames from the file array
        if (multipleSupport) {
            fileArr = $file[0].files;
            for (var i = 0, len = fileArr.length; i < len; i++) {
                files.push(fileArr[i].name);
            }
            filename = files.join(', ');

            // If not supported then just take the value
            // and remove the path to just show the filename
        } else {
            filename = $file.val().split('\\').pop();
        }

        $input.val(filename) // Set the value
            .attr('title', filename) // Show filename in title tootlip
            .focus(); // Regain focus

    });

    $input.on({
        blur: function() {
            $file.trigger('blur');
        },
        keydown: function(e) {
            if (e.which === 13) { // Enter
                if (!isIE) {
                    $file.trigger('click');
                }
            } else if (e.which === 8 || e.which === 46) { // Backspace & Del
                // On some browsers the value is read-only
                // with this trick we remove the old input and add
                // a clean clone with all the original events attached
                $file.replaceWith($file = $file.clone(true));
                $file.trigger('change');
                $input.val('');
            } else if (e.which === 9) { // TAB
                return;
            } else { // All other keys
                return false;
            }
        }
    });

});

};

// Old browser fallback
if (!multipleSupport) {
$(document).on('change', 'input.customfile', function() {

    var $this = $(this),
        // Create a unique ID so we
        // can attach the label to the input
        uniqId = 'customfile_' + (new Date()).getTime(),
        $wrap = $this.parent(),

        // Filter empty input
        $inputs = $wrap.siblings().find('.file-upload-input')
        .filter(function() {
            return !this.value
        }),

        $file = $('<input type="file" placeholder="Upload Resume id="' + uniqId + '" name="' + $this.attr('name') + '"/>');

    // 1ms timeout so it runs after all other events
    // that modify the value have triggered
    setTimeout(function() {
        // Add a new input
        if ($this.val()) {
            // Check for empty fields to prevent
            // creating new inputs when changing files
            if (!$inputs.length) {
                $wrap.after($file);
                $file.customFile();
            }
            // Remove and reorganize inputs
        } else {
            $inputs.parent().remove();
            // Move the input so it's always last on the list
            $wrap.appendTo($wrap.parent());
            $wrap.find('input').focus();
        }
    }, 1);

});
}

$('input[type=file]').customFile();