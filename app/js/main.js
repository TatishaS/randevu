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

/* Открыть инпут поиска на планшете */
function showSearchInput() {
  const searchInput = document.querySelector('.search__input');
  const searchBtn = document.querySelector('.search__button');

  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    searchInput.classList.toggle('active');
    searchBtn.classList.toggle('active');
  });
}

/* Окно сообщения об успешной отправке */
function openConfirmModal() {
  const modalConfirm = document.querySelector('.modal__confirm');
  const overlay = document.querySelector('.overlay');
  const cancelBtn = document.querySelector('.cancel');
  const sidebar = document.querySelector('.sidebar');
  const modalConfirmCloseBtn = document.querySelector('.modal__confirm-close');

  if (!modalConfirm) return;

  cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    modalConfirm.classList.add('active');
    overlay.classList.add('overlay--show');
    sidebar.style.zIndex = '40';
  });

  modalConfirmCloseBtn.addEventListener('click', e => {
    e.preventDefault();
    modalConfirm.classList.remove('active');
    overlay.classList.remove('overlay--show');
    sidebar.style.zIndex = '70';
  });
}

/* const categorySelect = () => {
  const element = document.querySelector('.js-single-category');
  const choices = new Choices(element, {
    allowHTML: true,
    searchEnabled: false,
    itemSelectText: '',
    appendValue: 'Category:',
  });
};
 */
const multiServiceSelect = () => {
  const elements = document.querySelectorAll('.choices-form-select');
  console.log(elements);

  elements.forEach(el => {
    const choices = new Choices(el, {
      allowHTML: true,
      searchEnabled: false,
      itemSelectText: '',
    });
  });
};

const multiDropdown = () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(el => {
    el.addEventListener('click', () => {
      const dropdownBtn = el.querySelector('.dropdown__button');
      const dropdownListWrapper = el.querySelector('.dropdown__list-wrapper');
      dropdownBtn.classList.toggle('active');
      dropdownListWrapper.classList.toggle('active');
    });
  });
};
const multiServiceDropdown = () => {
  const dropdowns = document.querySelectorAll('.service-dropdown');

  dropdowns.forEach(el => {
    el.addEventListener('click', () => {
      const dropdownBtn = el.querySelector('.service-dropdown__button');
      const dropdownListWrapper = el.querySelector(
        '.service-dropdown__list-wrapper'
      );
      dropdownBtn.classList.toggle('active');
      dropdownListWrapper.classList.toggle('active');
    });
  });
};

const multiLanguageDropdown = () => {
  const dropdowns = document.querySelectorAll('.language-select');

  dropdowns.forEach(el => {
    el.addEventListener('click', () => {
      const dropdownBtn = el.querySelector('.language-select__button');
      const dropdownListWrapper = el.querySelector(
        '.language-select__list-wrapper'
      );
      dropdownBtn.classList.toggle('active');
      dropdownListWrapper.classList.toggle('active');
    });
  });
};

const datePicker = () => {
  const element = document.querySelector('.edit-form__input-date');

  const datepicker = new Datepicker(element, {
    datesDisabled: [1684443600000, 1684875600000],
    format: 'dd/mm/yyyy',
    prevArrow: `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.29294 0.292969L0.585938 5.99997L6.29294 11.707L7.70694 10.293L3.41394 5.99997L7.70694 1.70697L6.29294 0.292969Z" fill="#AFACAC"/>
    </svg>`,
    nextArrow: `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.70697 11.707L7.41397 5.99997L1.70697 0.292969L0.292969 1.70697L4.58597 5.99997L0.292969 10.293L1.70697 11.707Z" fill="#201C1D"/></svg>`,
  });
};

const datePickerLegend = () => {
  const calendar = document.querySelector('.datepicker-main');
  const legend = document.createElement('div');
  const html = `
  <div class="legend-wrapper" style="display: flex">
  <div class="legend-button busy">
  <span class="legend-color busy"></span>
  Busy
  </div>
  <div class="legend-button free">
  <span class="legend-color free"></span>
  Free
  </div>
  </div>
  `;

  legend.innerHTML = html;
  calendar.insertAdjacentHTML('beforeend', html);
};

rightsideMenu();
openConfirmModal();
showSearchInput();
multiServiceSelect();
multiDropdown();
multiServiceDropdown();
multiLanguageDropdown();
datePicker();
datePickerLegend();
//categorySelect();
