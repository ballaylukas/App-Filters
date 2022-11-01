"use strict";

//////////// DEFAULT VALUES ////////////
// FORMAT DATE
const dateFormat = function (date1, date2 = 0) {
  const date = new Date(Math.abs(date1 - date2));
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

// DATE RANGE SETTINGS
const dateToday = dateFormat(new Date());
const dateFilterStart = dateFormat(new Date(2020, 0, 1));
const year = new Date().getFullYear();

inputMovementDate.setAttribute("min", dateFilterStart);
inputMovementDate.setAttribute("max", dateToday);
inputFilterDateFrom.setAttribute("min", dateFilterStart);
inputFilterDateFrom.setAttribute("max", dateToday);
inputFilterDateTo.setAttribute("min", dateFilterStart);
inputFilterDateTo.setAttribute("max", dateToday);
currentYear.textContent = year;

// INIT DATA
let filters,
  defaultValues,
  movements = [
    // Example
    [200.57, "2022-10-18"],
    [-53.25, "2022-07-13"],
  ],
  filtered;

// INIT FILTERS
const initFilters = function () {
  filters = {
    type: "both",
    amountFrom: 0,
    amountTo: Infinity,
    dateFrom: dateFilterStart,
    dateTo: dateToday,
  };

  defaultValues = Object.values(filters);
};
initFilters();
