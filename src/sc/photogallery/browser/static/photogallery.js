var PhotoGallery = {
    proportion: 3 / 2,
    currentSlide: 0,
    constructor: function(el) {
        this.$el = $(el);
        // this.proportion = 3 / 2;
        this.bind_events();
        this.fix_image_size();
        // this.currentSlide = 0
    },
    $: function(selector) {
        return $(selector, this.$el);
    },
    bind_events: function() {
        this.$('.cycle-player').on('cycle-next cycle-prev', this.sync_slideshows.bind(this));
        this.$('.cycle-carrossel .thumb-itens').on('click', this.thumbs_click.bind(this));

        $(document).keydown(function (e) {
            if ($('#photogallery').is(":visible")) {
                var size_imgs = $('.cycle-player img').size() - 2;
                switch (e.which) {
                    case 37: // left
                        PhotoGallery.currentSlide -= 1;
                        if (PhotoGallery.currentSlide < 0) {
                            PhotoGallery.currentSlide = size_imgs;
                        }
                        $('.cycle-slideshow').cycle('goto', PhotoGallery.currentSlide);
                        setHeightAndWidth();
                        break;

                    case 39: // right
                        PhotoGallery.currentSlide += 1;
                        if (PhotoGallery.currentSlide > size_imgs) {
                            PhotoGallery.currentSlide = 0;
                        }
                        $('.cycle-slideshow').cycle('goto', PhotoGallery.currentSlide);
                        setHeightAndWidth();
                        break;

                    case 27: //ESC
                    	window.goBack();
                    	break;

                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            }
        });
    },
    fix_image_size: function() {
        var max_height, max_width, $player, $imgs;

        // Calc max_with and max_height
        $player = this.$('.cycle-player');
        max_width = $player.width();
        max_height = max_width / this.proportion;
        console.log(max_width, max_height);
        // Calc max_with and max_height

        $imgs = this.$('.cycle-player img');
        $imgs.css({
            'max-width': max_width,
            'max-height': max_height
        });
    },
    sync_slideshows: function(e, opts) {
        var index, $player, $slideshows;
        $slideshows = this.$('.cycle-slideshow');
        $slideshows.cycle('goto', opts.currSlide);
        setHeightAndWidth();
        this.currentSlide = opts.currSlide;
    },
    thumbs_click: function(e) {
        var index, $thumbs, $slideshows;
        e.preventDefault();
        $thumbs = this.$('.cycle-carrossel');
        index = $thumbs.data('cycle.API').getSlideIndex(e.target.parentElement);
        $slideshows = this.$('.cycle-slideshow');
        $slideshows.cycle('goto', index);
        setHeightAndWidth();
        this.currentSlide = index;
    }
};

// Global variables
var photogal, backd, cc, photg, width_img, width_zoom_wrap;
var width_car, width_zoom_marc, width_car_out, width_zoom_marc_out;
var zoomON = false;
var once = true;
var once_b = true;

$(window).load(
    function () {
        var i, len, ref, slideshow;
        ref = $('.slideshow-container');
        //debugger;
        for (i = 0, len = ref.length; i < len; i++) {
            slideshow = ref[i];
            photogal = PhotoGallery.constructor(slideshow);
        }
        // PT TO JS
        cc = document.getElementById('content-core');
        photg = document.getElementById('photogallery');

        if (photg != undefined) {
            width_img = $('.slideshow-carrossel img').css('width').replace('px', '');
            width_zoom_wrap = parseInt(width_img) + 10;
        }
    }
);

// PT TO JS
function onClick(num) {
    $("#gal_tn").hide();
    //check which number of thumbnail is and do cycle('goto', num)
    $("#photogallery").show();
    $('.cycle-slideshow').cycle('goto', num);
    PhotoGallery.currentSlide = num;
    setHeightAndWidth();
}

function setHeightAndWidth() {
    var he = $('.cycle-slide-active').css('height');
    var wi = $('.cycle-slide-active').css('width');
    $('.cycle-sentinel').css('height', he);
    $('.cycle-sentinel').css('width', wi);

    $('.slideshow-player .cycle-slide-active').css('position', 'relative');
    $('.slideshow-player .cycle-sentinel').css('display', 'none');
    $('.slideshow-player .cycle-slide').css('display', 'none');
    $('.slideshow-player .cycle-slide-active').css('display', 'block');
}

function goBack() {
    if (zoomON) {
        zoomOutScene();
    }
    $("#photogallery").hide();
    $("#gal_tn").show();
}

function zoomScene() {
    if (!zoomON) {
        if (document.body.lastElementChild.id != "dark-back") {
            backd = document.createElement('div');
            backd.className = 'dark-background';
            backd.id = "dark-back";
            backd.style.cssText = 'position:fixed;width:100%;height:100%;top:0;left:0;z-index:10000;background:rgba(0,0,0,0.8);align-items: center;justify-content: center;display: flex;';
            document.body.appendChild(backd);

        }
        zoomInScene();
    }
    else {
        zoomOutScene();
    }
}

function zoomInScene() {
    backd.appendChild(photg);
    addStylesZoom();
    zoomON = true;
    $('.dark-background').show();

}
function zoomOutScene() {
    cc.appendChild(photg);
    removeStylesZoom();
    zoomON = false;
    $('.dark-background').hide();
}

function addStylesZoom() {
    $('.slideshow-container').addClass('slideshow-container-zoom');
    $('.cycle-player').addClass('cycle-player-zoom');
    $('.cycle-player').addClass('cycle-slideshow-zoom');
    $('.cycle-carrossel').addClass('slideshow-carrossel-zoom');
    $('.slide-pagination').addClass('slide-pagination-zoom');
    $('.slideshow-download').addClass('slideshow-download-zoom');
    $('.marc-selected').addClass('marc-selected-zoom');
    $('.slideshow-pager').addClass('slideshow-pager-zoom');
    $('.close-sl').addClass('close-sl-zoom');
    $('.cycle-carousel-wrap').css('left', '+=' + String(width_zoom_wrap) + 'px');
    if (once) {
        width_car = $('.slideshow-carrossel').css('width').replace('px', '');
        width_zoom_marc = parseInt(width_car) / 2 + 53;
        once = false;
    }
    $('.marc-selected').css('right', String(width_zoom_marc) + 'px');

    $('.iconszoom').removeClass('glyphicon-resize-full');
    $('.iconszoom').addClass('glyphicon-resize-small');
    $('.slideshow-description').addClass('slideshow-description-zoom');
}


function removeStylesZoom() {
    $('.slideshow-container').removeClass('slideshow-container-zoom');
    $('.cycle-player').removeClass('cycle-player-zoom');
    $('.cycle-player').removeClass('cycle-slideshow-zoom');
    $('.cycle-carrossel').removeClass('slideshow-carrossel-zoom');
    $('.slide-pagination').removeClass('slide-pagination-zoom');
    $('.slideshow-download').removeClass('slideshow-download-zoom');
    $('.marc-selected').removeClass('marc-selected-zoom');
    $('.slideshow-pager').removeClass('slideshow-pager-zoom');
    $('.close-sl').removeClass('close-sl-zoom');
    $('.cycle-carousel-wrap').css('left', '-=' + String(width_zoom_wrap) + 'px');

    if (once_b) {
        width_car_out = $('.slideshow-carrossel').css('width').replace('px', '');
        width_zoom_marc_out = parseInt(width_car_out) / 2 + 55;
        once_b = false;
    }
    $('.marc-selected').css('right', String(width_zoom_marc_out) + 'px');

    $('.iconszoom').removeClass('glyphicon-resize-small');
    $('.iconszoom').addClass('glyphicon-resize-full');
    $('.slideshow-description').removeClass('slideshow-description-zoom');
}

module.exports = {
    PhotoGallery: PhotoGallery
};
