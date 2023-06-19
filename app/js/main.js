'use strict';

/* Select2 jQuery */
window.addEventListener('DOMContentLoaded', function () {
  /* Hide selected values from multiple dropdown */
  function hideSelected(value) {
    if (value && !value.selected) {
      return $('<span>' + value.text + '</span>');
    }
  }
  /* Time select (class 'time-select') */
  $('.select2-time-select').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'time-select__dropdown',
  });

  /* Form select (class 'service-select') */

  $('.select2-form-select').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'form-select__dropdown',
  });
  /* Form select (class 'dashboardform-select') */

  $('.select2-dashboard-select').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'dashboard-select__dropdown',
  });

  /* Form select (class 'listservices-select') */

  $('.select2-list-select').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'list-select__dropdown',
  });

  /* Multiple service-select */
  $('.select2-form-multipleselect').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'form-multiselect__dropdown',
    placeholder: 'Employee Services',
    maximumSelectionLength: 3,
    //templateResult: hideSelected,
  });

  /* Disable search field inside multiple select input */
  $('.select2-form-multipleselect').on(
    'select2:opening select2:closing',
    function (event) {
      const $searchfield = $(this).parent().find('.select2-search__field');
      $searchfield.prop('disabled', true);
    }
  );

  /* Prevent dropdown opening after removing option */
  $('.select2-form-multipleselect').on('select2:unselect', function (event) {
    if (!event.params.originalEvent) {
      return;
    }
    console.log('remove choice');
    event.params.originalEvent.stopPropagation();
  });

  /* Disable opening virtual keyboard on iOS*/
  $('.select2-form-multipleselect').on('select2:opening', () => {
    $('.select2-search__field').attr('readonly', true);
    $('.select2-search__field').attr('inputmode', 'none');
  });

  /*   $('.select2-form-multipleselect').on(
    'select2:opening select2:closing',
    function (event) {
      var $searchfield = $(this).parent().find('.select2-search__field');
      $searchfield.prop('disabled', true);
    }
  ); */
});

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
    rightsideMenu.classList.toggle('rightside-menu--close');
    overlay.classList.toggle('overlay--show');
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

/* Open search input at  tablet screen */
function showSearchInput() {
  const searchInput = document.querySelector('.search__input');
  const searchBtn = document.querySelector('.search__button');

  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    searchInput.classList.toggle('active');
    searchBtn.classList.toggle('active');
  });
}

/* Make red border for input date while choosing date */
function highlightDateInput() {
  const inputDate = document.querySelector('.edit-form__input-date');
  //let dropdown;
  let dropdownIsActive = false;

  if (!inputDate) return;

  inputDate.addEventListener('click', () => {
    let dropdownIsActive = true;

    if (dropdownIsActive) {
      inputDate.classList.add('active');
      const dropdown = document.querySelector(
        '.datepicker.datepicker-dropdown'
      );

      const datePicker = dropdown.querySelector('.datepicker-grid');

      datePicker.addEventListener('click', () => {
        console.log('Клик');
        inputDate.classList.remove('active');
      });
    }
  });
}

/* Cropperjs for photo */

let cropper;

function getRoundedCanvas(sourceCanvas) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}

function applyCropToImg() {
  const image = document.getElementById('avatar');
  const button = document.getElementById('crop-button');
  let croppable = false;
  cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    autoCropArea: 1,
    minConteinerWidth: 234,
    scalable: false,
    ready: function () {
      croppable = true;
    },
  });
  console.log('Cropper instance created');

  button.addEventListener('click', () => {
    let croppedCanvas;
    let roundedCanvas;
    console.log('Crop click');

    if (!croppable) {
      return;
    }

    // Crop
    croppedCanvas = cropper.getCroppedCanvas();

    // Round
    roundedCanvas = getRoundedCanvas(croppedCanvas);
  });
}

/* Окно сообщения об успешной отправке */
function openConfirmModal() {
  const modalConfirm = document.querySelector('.modal__confirm');
  const overlay = document.querySelector('.overlay');
  const cancelBtn = document.querySelector('.cancel');
  const deleteBtn = document.querySelector('.delete');
  const sidebar = document.querySelector('.sidebar');
  const modalConfirmCloseBtn = document.querySelector('.modal__confirm-close');

  if (!modalConfirm) return;

  if (cancelBtn) {
    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
      modalConfirm.classList.add('active');
      overlay.classList.add('overlay--show');
      sidebar.style.zIndex = '40';
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', e => {
      e.preventDefault();
      modalConfirm.classList.add('active');
      overlay.classList.add('overlay--show');
      sidebar.style.zIndex = '40';
    });
  }

  modalConfirmCloseBtn.addEventListener('click', e => {
    e.preventDefault();
    modalConfirm.classList.remove('active');
    overlay.classList.remove('overlay--show');
    sidebar.style.zIndex = '70';
  });
}
function openCropPhotoModal() {
  const modalCrop = document.querySelector('.modal__crop');
  const overlay = document.querySelector('.overlay');
  const save = document.querySelector('.save');
  const sidebar = document.querySelector('.sidebar');
  const modalConfirmCloseBtns = document.querySelectorAll(
    '.modal__confirm-close'
  );

  if (!modalCrop) return;

  if (save) {
    save.addEventListener('click', e => {
      e.preventDefault();

      modalCrop.classList.add('active');
      overlay.classList.add('overlay--show');
      sidebar.style.zIndex = '40';
      applyCropToImg();
    });
  }

  modalConfirmCloseBtns.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      modalCrop.classList.remove('active');
      overlay.classList.remove('overlay--show');
      sidebar.style.zIndex = '70';
      if (!cropper) return;

      cropper.destroy();
      console.log('Cropper instance destroyed');
    });
  });

  /*   el.addEventListener('click', e => {
    e.preventDefault();
    modalCrop.classList.remove('active');
    overlay.classList.remove('overlay--show');
    sidebar.style.zIndex = '70';
  }); */
}

/* Modal confirm creating service */
function handleCreateServiceModal() {
  const modal = document.querySelector('.modal__service');
  const overlay = document.querySelector('.overlay');
  const saveBtn = document.querySelector('.save');
  const sidebar = document.querySelector('.sidebar');
  const modalConfirmCloseBtn = document.querySelector('.modal__confirm-close');

  if (!modal) return;

  saveBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('active');
    overlay.classList.add('overlay--show');
    sidebar.style.zIndex = '40';
  });

  modalConfirmCloseBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.remove('active');
    overlay.classList.remove('overlay--show');
    sidebar.style.zIndex = '70';
  });
}

/* Popup with full services list */

function handleServicesPopup() {
  const popup = document.querySelector('.popup');
  const overlay = document.querySelector('.overlay');
  const moreBtns = document.querySelectorAll('.services__more-btn');
  const sidebar = document.querySelector('.sidebar');
  const popupConfirmCloseBtns = document.querySelectorAll(
    '.popup__confirm-close'
  );

  if (!popup) return;

  moreBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      popup.classList.add('active');
      overlay.classList.add('overlay--show');
      sidebar.style.zIndex = '40';
    });
  });

  popupConfirmCloseBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      popup.classList.remove('active');
      overlay.classList.remove('overlay--show');
      sidebar.style.zIndex = '70';
    });
  });
}

/* Choices selects */
/* const multiServiceSelect = () => {
  const elements = document.querySelectorAll('.choices-form-select');

  elements.forEach(el => {
    const choices = new Choices(el, {
      allowHTML: true,
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',
    });
  });
}; */

const multiTimeSelect = () => {
  const elements = document.querySelectorAll('.choices-time-select');

  elements.forEach(el => {
    const choices = new Choices(el, {
      allowHTML: true,
      searchEnabled: true,
      itemSelectText: '',
      position: 'bottom',
      renderChoiceLimit: 3,
      searchResultLimit: 3,
    });
  });
};

/* const multiChoicesSelect = () => {
  const elements = document.querySelectorAll('.choices-form-multipleselect');

  elements.forEach(el => {
    const choices = new Choices(el, {
      allowHTML: true,
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',
      removeItemButton: true,
    });

    el.addEventListener(
      'change',
      function (event) {
        choices.hideDropdown();
      },
      false
    );
  });
}; */

const multiNameSelect = () => {
  const elements = document.querySelectorAll('.choices-dashboardform-select');

  elements.forEach(el => {
    const choices = new Choices(el, {
      allowHTML: true,
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',
    });
  });
};

/* Dropdowns */

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

/* Datepicker */
const datePicker = () => {
  const element = document.querySelector('.edit-form__input-date');

  if (!element) return;

  const datepicker = new Datepicker(element, {
    autohide: true,
    datesDisabled: [1686898698000, 1686898711000, 1684875600000],
    format: 'dd/mm/yyyy',
    prevArrow: `<svg width="8" class="edit-form__datepicker-arrow edit-form__datepicker-arrow--prev disabled" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.29294 0.292969L0.585938 5.99997L6.29294 11.707L7.70694 10.293L3.41394 5.99997L7.70694 1.70697L6.29294 0.292969Z"/>
    </svg>`,
    nextArrow: `<svg class="edit-form__datepicker-arrow edit-form__datepicker-arrow--next" width="8" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg"><path d="M1.70697 11.707L7.41397 5.99997L1.70697 0.292969L0.292969 1.70697L4.58597 5.99997L0.292969 10.293L1.70697 11.707Z" /></svg>`,
  });
};

const datePickerLegend = () => {
  const calendar = document.querySelector('.datepicker-main');
  const legend = document.createElement('div');
  const html = `
  <div class="legend-wrapper">
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
  //console.log(calendar);
  if (!calendar) return;

  legend.innerHTML = html;
  calendar.insertAdjacentHTML('beforeend', html);
};

/* InlineDatepicker */
const inlineDatePicker = () => {
  const element = document.getElementById('inline-datepicker');

  if (!element) return;

  const datepicker = new Datepicker(element, {
    autohide: true,
    datesDisabled: [1686898709000, 1686898711000, 1684875600000],
    format: 'dd/mm/yyyy',
    prevArrow: `<svg width="8" class="edit-form__datepicker-arrow edit-form__datepicker-arrow--prev disabled" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.29294 0.292969L0.585938 5.99997L6.29294 11.707L7.70694 10.293L3.41394 5.99997L7.70694 1.70697L6.29294 0.292969Z"/>
    </svg>`,
    nextArrow: `<svg class="edit-form__datepicker-arrow edit-form__datepicker-arrow--next" width="8" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg"><path d="M1.70697 11.707L7.41397 5.99997L1.70697 0.292969L0.292969 1.70697L4.58597 5.99997L0.292969 10.293L1.70697 11.707Z" /></svg>`,
  });

  datePickerLegend();
  element.addEventListener(
    'changeDate',
    function (event) {
      const accordionItem = event.target.closest('.accordion__item');

      if (!accordionItem) return;
      if (accordionItem.classList.contains('accordion__item-active')) {
        accordionItem.classList.remove('accordion__item-active');
      }
    },
    false
  );
};

/* Time picker */

const picker = new AppointmentPicker(document.getElementById('time'), {
  interval: 30,
  mode: '24h',
  minTime: 10,
  maxTime: 21,
  startTime: 8,
  endTime: 23,
  disabled: ['8:00', '12:30', '14:30'],
});

/* Inline time picker */

const inlinePicker = document.getElementById('inline-timepicker');
const timePicker = new AppointmentPicker(inlinePicker, {
  interval: 30,
  mode: '24h',
  minTime: 8,
  maxTime: 21,
  startTime: 8,
  endTime: 16,
  disabled: ['8:00', '12:30', '14:30'],
});

const inlineTimePicker = () => {
  if (!timePicker) return;
  timePicker.open();

  document.body.addEventListener(
    'close.appo.picker',
    function (e) {
      timePicker.open();
    },
    false
  );

  /* Close accordion item after selection */
  document.body.addEventListener(
    'change.appo.picker',
    function (event) {
      const accordionItem = event.target.closest('.accordion__item');

      if (!accordionItem) return;
      if (accordionItem.classList.contains('accordion__item-active')) {
        accordionItem.classList.remove('accordion__item-active');
      }
    },
    false
  );
};

/* Handling categories */

const handleSelectCategory = () => {
  document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', event => {
      event.preventDefault();
      const selectedCategory = document.querySelector('.selected-category');
      if (selectedCategory) {
        selectedCategory.classList.remove('selected-category');
        selectedCategory.querySelector('.edit-icon').style.display = 'none';
      }

      const clickedCategory = event.currentTarget;
      clickedCategory.classList.add('selected-category');
      clickedCategory.querySelector('.edit-icon').style.display = 'flex';
    });
  });

  document.querySelectorAll('.edit-icon').forEach(editIcon => {
    editIcon.addEventListener('click', event => {
      const categoryId = event.currentTarget.dataset.categoryId;
      window.location.href = `/categories/${categoryId}/edit`;
    });
  });
};

/* New appointment left accordion */
function handleAccordion() {
  /*   const items = document.querySelectorAll('.accordion__item-trigger');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;
      if (parent.classList.contains('accordion__item-active')) {
        parent.classList.remove('accordion__item-active');
      } else {
        document
          .querySelectorAll('.accordion__item')
          .forEach(child => child.classList.remove('accordion__item-active'));
        parent.classList.add('accordion__item-active');
        inlineTimePicker();
      }
    });
  }); */
  const optionInputs = document.querySelectorAll('.accordion__option-input');
  const triggers = document.querySelectorAll('.accordion__item-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      // const parent = item.parentNode;
      // if (parent.classList.contains("accordion__item-active")) {
      //   parent.classList.remove("accordion__item-active");
      // } else {
      //   document
      //     .querySelectorAll(".accordion__item")
      //     .forEach((child) => child.classList.remove("accordion__item-active"));
      //   parent.classList.add("accordion__item-active");
      //   inlineTimePicker();
      // }

      const accordionItem = event.currentTarget.closest('.accordion__item');
      if (!accordionItem) return;
      if (accordionItem.classList.contains('accordion__item-active')) {
        accordionItem.classList.remove('accordion__item-active');
      } else {
        const accordionItemActive = document.querySelector(
          '.accordion__item-active'
        );
        accordionItemActive &&
          accordionItemActive.classList.remove('accordion__item-active');
        accordionItem.classList.add('accordion__item-active');
        inlineTimePicker();
      }
    });
  });
  optionInputs.forEach(radioInput => {
    radioInput.addEventListener('change', event => {
      // const parent = item.parentNode;
      // if (parent.classList.contains("accordion__item-active")) {
      //   parent.classList.remove("accordion__item-active");
      // } else {
      //   document
      //     .querySelectorAll(".accordion__item")
      //     .forEach((child) => child.classList.remove("accordion__item-active"));
      //   parent.classList.add("accordion__item-active");
      //   inlineTimePicker();
      // }

      const accordionItem = event.target.closest('.accordion__item');
      if (!accordionItem) return;
      if (accordionItem.classList.contains('accordion__item-active')) {
        accordionItem.classList.remove('accordion__item-active');
      }
    });
  });
}

rightsideMenu();
openConfirmModal();
openCropPhotoModal();
showSearchInput();
highlightDateInput();
multiTimeSelect();
multiDropdown();
multiServiceDropdown();
multiLanguageDropdown();
datePicker();
datePickerLegend();
handleSelectCategory();
multiNameSelect();
handleCreateServiceModal();
handleServicesPopup();
handleAccordion();
inlineDatePicker();

//multiChoicesSelect();
//multiServiceSelect();
//applyCropToImg();
//categorySelect();
