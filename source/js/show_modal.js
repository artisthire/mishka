(function() {

  //отработка открытия модального окна
  //здесь задаются переменные для каждого конктетного модального окна и кнопок его открытия
  var modal_basket_window = document.querySelector('.js-modal-basket');
  var modal_basket_open_btns = document.querySelectorAll('.js-modal-basket-btn');

  //здесь задаются общие переменные, которые используются в функциях открытия/закрытия модальных окон
  //предполагается что затенение страницы modal_backdrop одно общее для всех модальных окон
  var modal_backdrop = document.querySelector('.js-modal-backdrop');
  var modal_window = null;
  var after_modal_element = null;
  var last_focus = null;
  var modal_open = false;
  var class_backdrop_show = 'modal-backdrop--show';
  var class_modal_show = '';


  if (modal_basket_window && modal_basket_open_btns) {

    for (var i = 0; i < modal_basket_open_btns.length; i++) {

      modal_basket_open_btns[i].addEventListener('click', function (event) {

        event.preventDefault();

        modal_window = modal_basket_window;
        class_modal_show = 'modal-basket--show';
        after_modal_element = modal_basket_window.nextElementSibling;
        modal_show();

      });

      modal_basket_open_btns[i].addEventListener('keydown', function () {

        if (!event.keyCode || event.keyCode === 32) {

          event.preventDefault();
          modal_window = modal_basket_window;
          class_modal_show = 'modal-basket--show';
          after_modal_element = modal_basket_window.nextElementSibling;
          modal_show();
        }

      });
    }
  }

  //закрытие модального окна при клике по затенении страницы под модальным окном

  if (modal_backdrop)
    modal_backdrop.addEventListener('click', function (event) {

      event.preventDefault();
      modal_hide();

    });


  function modal_show () {

    modal_open = true;

    //запоминаем для перемещения фокуса на активный элемент после закрытия окна
    last_focus = document.activeElement;

    //вставляем модальное окно в начало body, чтобы запретить переход с клавиатуры внутрь body, когда мод. окно открыто
    document.body.insertBefore(modal_window, document.body.firstElementChild);

    modal_window.classList.add(class_modal_show);
    modal_window.setAttribute('tabindex', '0');
    modal_window.focus();

    if (modal_backdrop)
      modal_backdrop.classList.add(class_backdrop_show);


    document.addEventListener('focus', modal_refocus, true);

    document.addEventListener('keydown', modal_close_esc);
  }

  function modal_hide() {

    modal_open = false;

    modal_window.classList.remove(class_modal_show);
    modal_window.removeAttribute('tabindex');

    if (modal_backdrop)
      modal_backdrop.classList.remove(class_backdrop_show);

    document.removeEventListener('focus', modal_refocus, true);
    document.removeEventListener('keydown', modal_close_esc);

    //возвращаем модальное окно на то место в DOM, где оно было перед открытием
    document.body.insertBefore(modal_window, after_modal_element);

    last_focus.focus();
  }

  //возвращаем фокус на модальное окно при переходе по клавише "TAB" на внутренность body, когда мод. окно открыто
  function modal_refocus(event) {

    if (modal_open && !modal_window.contains(event.target)) {
      event.stopPropagation();
      modal_window.focus();
    }
  }


  //закрытие модального окна при нажатии клавиши ESC
  function modal_close_esc (event) {

   if (!event.keyCode || event.keyCode === 27) {

    event.preventDefault();
    modal_hide();

   }
  }

}());
