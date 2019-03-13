(function(document) {

var toggle_btn = document.querySelector('.js-menu-toggle-btn');

//обрабатываем только если кнопка видна (высота больше нуля)
if (toggle_btn && toggle_btn.offsetHeight != 0) {

  var screen_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var screen_md = 768;

  //установка исходного состояния главного меню (закрыто)
  toggle_btn.classList.remove('menu-toggle-btn--open');
  toggle_btn.classList.add('menu-toggle-btn--close');

  if (toggle_btn.hasAttribute('aria-label'))
    toggle_btn.setAttribute('aria-label', 'Открыть меню');


  //обработка отрытия меню

  toggle_btn.addEventListener('click', function() {

    if(this.classList.contains('menu-toggle-btn--open')) {
      this.classList.remove('menu-toggle-btn--open');
      this.classList.add('menu-toggle-btn--close');

      if (toggle_btn.hasAttribute('aria-label'))
        toggle_btn.setAttribute('aria-label', 'Открыть меню');
    }
    else {
      this.classList.add('menu-toggle-btn--open');
      this.classList.remove('menu-toggle-btn--close');

      if (toggle_btn.hasAttribute('aria-label'))
        toggle_btn.setAttribute('aria-label', 'Закрыть меню');
    }
  });

}

//отработка открытия модального окна

var modal_basket_window = document.querySelector('.js-modal-basket');
var modal_backdrop = document.querySelector('.js-modal-backdrop');
var modal_basket_open_btns = document.querySelectorAll('.js-modal-basket-btn');
var last_focus = null;

if (modal_basket_window && modal_basket_open_btns) {

  last_focus = document.activeElement;

  for (var i = 0; i < modal_basket_open_btns.length; i++) {

    modal_basket_open_btns[i].addEventListener('click', function() {

      modal_basket_window.classList.add('modal-basket--show');
      modal_basket_window.setAttribute('tabindex', '0');
      modal_basket_window.focus();

      if (modal_backdrop)
        modal_backdrop.classList.add('modal-backdrop--show');
    });

  }

  document.addEventListener('keydown', function(event) {

    if (!event.keyCode || event.keyCode === 27) {

      modal_basket_window.classList.remove('modal-basket--show');
      modal_basket_window.removeAttribute('tabindex');
      modal_backdrop.classList.remove('modal-backdrop--show');
      last_focus.focus();
    }
  });

  modal_backdrop.addEventListener('click', function() {

    if (this.classList.contains('modal-backdrop--show')) {
      modal_basket_window.classList.remove('modal-basket--show');
      modal_basket_window.removeAttribute('tabindex');
      modal_backdrop.classList.remove('modal-backdrop--show');
      last_focus.focus();
    }
  });
}

}(document));
