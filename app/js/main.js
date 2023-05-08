'use strict';

/* Rightside menu */
function rightsideMenu() {
  const moreButton = document.querySelector('.sidebar-button--more');
  const rightsideMenu = document.querySelector('.rightside-menu');
  const rightsideMenuBtnClose = document.querySelector(
    '.rightside-menu__btn-close'
  );
  const overlay = document.querySelector('.overlay');

  moreButton.addEventListener('click', event => {
    event.preventDefault();
    console.log('открыть');
    rightsideMenu.classList.remove('rightside-menu--close');
    overlay.classList.add('overlay--show');
  });
  rightsideMenuBtnClose.addEventListener('click', event => {
    event.preventDefault();
    console.log('закрыть');
    rightsideMenu.classList.add('rightside-menu--close');
    overlay.classList.remove('overlay--show');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
      moreButton.style.display = 'none';
    }
  });
}

/* Окно сообщения об успешной отправке */
function openConfirmModal() {
  const modalConfirm = document.querySelector('.modal__confirm');
  const overlay = document.querySelector('.overlay');
  const cancelBtn = document.querySelector('.cancel');
  const modalConfirmCloseBtn = document.querySelector('.modal__confirm-close');

  cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    modalConfirm.classList.add('active');
    overlay.classList.add('overlay--show');
  });

  modalConfirmCloseBtn.addEventListener('click', e => {
    e.preventDefault();
    modalConfirm.classList.remove('active');
    overlay.classList.remove('overlay--show');
  });
}

rightsideMenu();
openConfirmModal();
