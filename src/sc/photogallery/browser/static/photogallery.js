class PhotoGallery {
  constructor(el) {
    this.$el = $(el);
    this.proportion = 3 / 2;
    this.bind_events();
    this.fix_image_size();
    this.currentSlide = 0
  }
  $(selector) {
    return $(selector, this.$el);
  }
  bind_events() {
    this.$('.cycle-player').on('cycle-next cycle-prev', this.sync_slideshows.bind(this));
    this.$('.cycle-carrossel .thumb-itens').on('click', this.thumbs_click.bind(this));

    $(document).keydown(function(e) {
          if ($('#photogallery').is(":visible")){
            var size_imgs = $('.cycle-player img').size() - 2
            switch(e.which) {
                case 37: // left
                  photogal.currentSlide -= 1
                  if (photogal.currentSlide < 0){
                    photogal.currentSlide = size_imgs
                  }
                  $('.cycle-slideshow').cycle('goto', photogal.currentSlide)
                break;

                case 39: // right
                  photogal.currentSlide += 1
                  if (photogal.currentSlide > size_imgs){
                    photogal.currentSlide = 0
                  }
                  $('.cycle-slideshow').cycle('goto', photogal.currentSlide)
                break;

                case 27: //ESC
                  window.goBack()

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
          }
        })
  }
  fix_image_size() {
    let max_height, max_width, $player, $imgs;

    // Calc max_with and max_height
    $player = this.$('.cycle-player');
    max_width = $player.width();
    max_height = max_width / this.proportion;
    console.log(max_width, max_height)
    // Calc max_with and max_height

    $imgs = this.$('.cycle-player img');
    $imgs.css({
      'max-width': max_width,
      'max-height': max_height
    });
  }
  sync_slideshows(e, opts) {
    let index, $player, $slideshows;
    $slideshows = this.$('.cycle-slideshow');
    $slideshows.cycle('goto', opts.currSlide);
    this.currentSlide = opts.currSlide
  }
  thumbs_click(e) {
    let index, $thumbs, $slideshows;
    e.preventDefault();
    $thumbs = this.$('.cycle-carrossel');
    index = $thumbs.data('cycle.API').getSlideIndex(e.target.parentElement);
    $slideshows = this.$('.cycle-slideshow');
    $slideshows.cycle('goto', index);
    this.currentSlide = index
  }
}

var photogal
$(window).load(() => {
  let i, len, ref, slideshow;
  ref = $('.slideshow-container');
  for (i = 0, len = ref.length; i < len; i++) {
    slideshow = ref[i];
    photogal = new PhotoGallery(slideshow);
  }
});


module.exports = {
  PhotoGallery
}