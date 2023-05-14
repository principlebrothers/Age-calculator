const form = document.getElementsByTagName('form')[0];
const allInputs = document.querySelectorAll('input');
const allLabels = document.querySelectorAll('label');
const allSmall = document.querySelectorAll('small');
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const dayError = document.querySelector('.day__error');
const monthError = document.querySelector('.month__error');
const yearError = document.querySelector('.year__error');
const yearResult = document.querySelector('[data-birth-year]');
const monthResult = document.querySelector('[data-birth-month]');
const dayResult = document.querySelector('[data-birth-day]');

const date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth() + 1;
let current_day = date.getDate();

// Submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const dayValue = inputDay.value;
  const monthValue = inputMonth.value;
  const yearValue = inputYear.value;
  const isValid = validateDate(dayValue, monthValue, yearValue);
  if (isValid) {
    calculateAge(yearValue, monthValue, dayValue);
  }
});

// Validate form
function validateDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  const isLeapYear = leapYear(date.getFullYear());

  if (day === '' || month === '' || year === '') {
    allInputs.forEach((input) => {
      input.classList.add('error_border');
    });
    allLabels.forEach((label) => {
      label.classList.add('error_color');
    });
    allSmall.forEach((small) => {
      small.classList.add('error');
      small.textContent = 'This field is required';
    });
    removeErrors();
  }
  validateDay(day, date.getMonth(), isLeapYear);
  validateMonth(month);
  validateYear(year);

  const isValidDate =
    date.getFullYear() == year &&
    date.getMonth() + 1 == month &&
    date.getDate() == day;
  return isValidDate;
}

// Validate leap year
function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Remove errors
function removeErrors() {
  setTimeout(() => {
    allInputs.forEach((input) => {
      input.classList.remove('error_border');
    });
    allLabels.forEach((label) => {
      label.classList.remove('error_color');
    });
    allSmall.forEach((small) => {
      small.classList.remove('error');
      small.textContent = '';
    });
  }, 4000);
}

// Day Error Output
function dayErrorOutput() {
  dayError.classList.add('error');
  dayError.textContent = 'Must be a valid day';
  inputDay.classList.add('error_border');
  if (allLabels[0].dataset.label === 'day') {
    allLabels[0].classList.add('error_color');
  }
}

// Validate day
function validateDay(day, createdMonth, leapYear) {
  if (day != '') {
    if (day < 1 || day > 31) {
      dayErrorOutput();
    } else if (
      day > 30 &&
      (createdMonth === 9 ||
        createdMonth === 4 ||
        createdMonth === 6 ||
        createdMonth === 11)
    ) {
      dayErrorOutput();
    } else if (day > 29 && createdMonth === 2 && leapYear) {
      dayErrorOutput();
    } else if (day > 28 && createdMonth === 2) {
      dayErrorOutput();
    }
    removeErrors();
  }
}

// Validate year
function validateYear(year) {
  if (year != '') {
    if (year > current_year) {
      yearError.classList.add('error');
      yearError.textContent = 'Must be in the past';
      if (allLabels[2].dataset.label === 'year') {
        allLabels[2].classList.add('error_color');
      }
      inputYear.classList.add('error_border');
    }
    removeErrors();
  }
}

// Validate month
function validateMonth(month) {
  if (month != '') {
    if (month < 1 || month > 12) {
      monthError.classList.add('error');
      monthError.textContent = 'Must be a valid month';
      if (allLabels[1].dataset.label === 'month') {
        allLabels[1].classList.add('error_color');
      }
      inputMonth.classList.add('error_border');
    }
    removeErrors();
  }
}

// Calculate age in years, months and days and display it
function calculateAge(yearValue, monthValue, dayValue) {
  yearResult.textContent = (current_year - yearValue);
  monthResult.textContent = Math.abs(current_month - monthValue);
  dayResult.textContent = Math.abs(current_day - dayValue);
}
