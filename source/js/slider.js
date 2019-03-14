(function() {

  var btn_prev_slide = document.querySelector('.reviews-slider__btn--prev');
  var btn_next_slide = document.querySelector('.reviews-slider__btn--next');
  var curent_slide = document.querySelector('.reviews-slider__item--current');

  btn_prev_slide.addEventListener('click', function() {

    if (curent_slide.previousElementSibling) {

      curent_slide = curent_slide.previousElementSibling;

      curent_slide.classList.remove('reviews-slider__item--prev');
      curent_slide.classList.add('reviews-slider__item--current');

      curent_slide.nextElementSibling.classList.remove('reviews-slider__item--current');
      curent_slide.nextElementSibling.classList.add('reviews-slider__item--next');

      btn_next_slide.removeAttribute('disabled');
      btn_next_slide.removeAttribute('aria-hidden');

      if (!curent_slide.previousElementSibling) {
        btn_prev_slide.setAttribute('disabled', true);
        btn_prev_slide.setAttribute('aria-hidden', true);
      }
    }
  });


  btn_next_slide.addEventListener('click', function() {

    if (curent_slide.nextElementSibling) {

      curent_slide = curent_slide.nextElementSibling;

      curent_slide.classList.remove('reviews-slider__item--next');
      curent_slide.classList.add('reviews-slider__item--current');

      curent_slide.previousElementSibling.classList.remove('reviews-slider__item--current');
      curent_slide.previousElementSibling.classList.add('reviews-slider__item--prev');

      btn_prev_slide.removeAttribute('disabled');
      btn_prev_slide.removeAttribute('aria-hidden');

      if (!curent_slide.nextElementSibling) {
        btn_next_slide.setAttribute('disabled', true);
        btn_next_slide.setAttribute('aria-hidden', true);
      }
    }
  });

}());
