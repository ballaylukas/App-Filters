"use strict";

//////////// VALUE CONTROL ////////////
// REMOVE MOVEMENT VALUES WARNING
const removeMovementWarning = function () {
  // Inputs
  inputsMovement.forEach((input) => input.classList.remove("input__warning"));

  // Warning message
  warningMovement.classList.remove("warning__active");
};

// REMOVE FILTERS VALUES WARNING
const removeFiltersWarning = function () {
  // Inputs
  inputsFilter.forEach((input) => input.classList.remove("input__warning"));

  // Warning message
  warningFilter.classList.remove("warning__active");
};

// REMOVE ALL VALUES WARNINGS
const removeAllWarnings = function () {
  // Inputs
  inputsAll.forEach((input) => input.classList.remove("input__warning"));

  // Warning message
  warningMovement.classList.remove("warning__active");
  warningFilter.classList.remove("warning__active");
};

// MOVEMENT VALUES CONTROL
const checkMovement = function (amount, date) {
  if (!amount || !date) {
    // Amount
    !amount
      ? inputMovementAmount.classList.add("input__warning")
      : inputMovementAmount.classList.remove("input__warning");

    // Date
    !date
      ? inputMovementDate.classList.add("input__warning")
      : inputMovementDate.classList.remove("input__warning");

    // Add movement warning, remove filters warning
    warningMovement.classList.add("warning__active");
    removeFiltersWarning();
    return false;
  }

  // Remove all warnings
  removeAllWarnings();
  return true;
};

// FILTERS VALUES CONTROL
const checkFilters = function (filters) {
  if (
    filters.amountFrom < 0 ||
    filters.amountTo < 0 ||
    filters.amountFrom > filters.amountTo ||
    new Date(filters.dateFrom) > new Date(filters.dateTo)
  ) {
    // Amounts
    if (
      filters.amountFrom > filters.amountTo ||
      filters.amountFrom < 0 ||
      filters.amountTo < 0
    ) {
      inputFilterAmountFrom.classList.add("input__warning");
      inputFilterAmountTo.classList.add("input__warning");
    } else {
      inputFilterAmountFrom.classList.remove("input__warning");
      inputFilterAmountTo.classList.remove("input__warning");
    }

    // Dates
    if (new Date(filters.dateFrom) > new Date(filters.dateTo)) {
      inputFilterDateFrom.classList.add("input__warning");
      inputFilterDateTo.classList.add("input__warning");
    } else {
      inputFilterDateFrom.classList.remove("input__warning");
      inputFilterDateTo.classList.remove("input__warning");
    }

    // Add filters warning, remove movement warning
    warningFilter.classList.add("warning__active");
    removeMovementWarning();
    return false;
  }

  // Remove all warnings
  removeAllWarnings();
  return true;
};

//////////// MOVEMENTS ////////////
// DISPLAY MOVEMENTS
const displayMovements = function (movs) {
  // UI
  containerFiltered.innerHTML = "";
  containerFiltered.classList.remove("filtered__active");
  heading.textContent = "Movements";
  noData.style.display = movs.length === 0 ? "block" : "none";

  // Add movements to HTML
  movs.forEach(function ([amount, date]) {
    // Movement type
    const type = amount > 0 ? "income" : "expense";

    // Type symbol
    const symbol = amount > 0 ? "&plus;" : "&minus;";

    // Movement date
    const movDate = date.split("-").reverse().join(".");

    // Movement amount
    const movAmount = amount.toFixed(2).replace(".", ",");

    // HTML
    const html = `<div class="filtered__row">
  <div class="filtered__type filtered__type--${type}">${symbol}</div>
  <div class="filtered__date">${movDate}</div>
  <div class="filtered__amount">${movAmount} CZK</div>
</div>`;

    containerFiltered.insertAdjacentHTML("beforeend", html);
  });
};
// For example movements
displayMovements(movements);

//////////// FILTERS ////////////
// TYPE FILTER
const filterType = function ([amount, _date]) {
  return filters.type === "income"
    ? amount > 0
    : filters.type === "expenses"
    ? amount < 0
    : amount;
};

// AMOUNT FILTER
const filterAmount = function ([amount, _date]) {
  return (
    Math.abs(amount) >= filters.amountFrom &&
    Math.abs(amount) <= filters.amountTo
  );
};

// DATE FILTER
const filterDate = function ([_amount, date]) {
  const dateFrom = new Date(filters.dateFrom);
  const dateTo = new Date(filters.dateTo);
  const dateMov = new Date(date);

  return dateMov >= dateFrom && dateMov <= dateTo;
};

//////////// EVENT LISTENERS ////////////
// ADD MOVEMENT
btnMovementAdd.addEventListener("click", function (e) {
  e.preventDefault();

  // Values
  const amount = +inputMovementAmount.value;
  const date = inputMovementDate.value;

  // Control new movement + add movement
  if (checkMovement(amount, date)) {
    movements.push([amount, date]);

    // UI movements
    displayMovements(movements);
  }
});

// REMOVE MOVEMENT
btnMovementRemove.addEventListener("click", function (e) {
  e.preventDefault();

  // Remove last movement
  if (movements.length !== 0) movements.pop();

  // UI movements
  displayMovements(movements);

  // Remove all warnings
  removeAllWarnings();
});

// RESET MOVEMENTS
btnMovementReset.addEventListener("click", function (e) {
  e.preventDefault();

  // Reset movements
  movements.splice(0, movements.length);

  // UI movements
  displayMovements(movements);

  // Remove all warnings
  removeAllWarnings();

  // Clear input fields
  inputMovementAmount.value = "";
  inputMovementDate.value = "";
});

// SUBMIT FILTERS
btnFiltersSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  // Current filter values
  let currentValues = [];

  inputsFilter.forEach((input) => currentValues.push(input.value));

  // Assign filter values
  Object.keys(filters).forEach((el, i) => {
    filters[el] = currentValues[i] === "" ? defaultValues[i] : currentValues[i];
  });

  filters.amountFrom = +filters.amountFrom;
  filters.amountTo = +filters.amountTo;

  // Filtering
  if (checkFilters(filters) && movements.length !== 0) {
    filtered = movements
      .filter(filterType)
      .filter(filterAmount)
      .filter(filterDate);

    // UI filtered movements
    displayMovements(filtered);
    containerFiltered.classList.add("filtered__active");
    heading.textContent = "Filtered movements";
  }
});

// RESET FILTERS
btnFiltersReset.addEventListener("click", function (e) {
  e.preventDefault();

  // Reset filters
  initFilters();

  // UI movements
  displayMovements(movements);

  // Remove all warnings
  removeAllWarnings();

  // Clear input fields
  inputFilterType.value = filters.type;
  inputFilterAmountFrom.value = "";
  inputFilterAmountTo.value = "";
  inputFilterDateFrom.value = "";
  inputFilterDateTo.value = "";
});
