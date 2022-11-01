"use strict";

//////////// ELEMENTS ////////////
// BUTTONS
const btnMovementAdd = document.querySelector(".btn__movement--add");
const btnMovementRemove = document.querySelector(".btn__movement--remove");
const btnMovementReset = document.querySelector(".btn__movement--reset");
const btnFiltersSubmit = document.querySelector(".btn__filter--submit");
const btnFiltersReset = document.querySelector(".btn__filter--reset");

// INPUTS
const inputMovementAmount = document.querySelector(".movement__input--amount");
const inputMovementDate = document.querySelector(".movement__input--date");
const inputFilterType = document.querySelector(".filter__input--type");
const inputFilterAmountFrom = document.querySelector(
  ".filter__input--amount-from"
);
const inputFilterAmountTo = document.querySelector(".filter__input--amount-to");
const inputFilterDateFrom = document.querySelector(".filter__input--date-from");
const inputFilterDateTo = document.querySelector(".filter__input--date-to");
const inputsAll = document.querySelectorAll("input");
const inputsMovement = document.querySelectorAll(".movement__input");
const inputsFilter = document.querySelectorAll(".filter__input");

// MOVEMENT CONTAINER
const containerFiltered = document.querySelector(".filtered");
const noData = document.querySelector(".filtered__nodata");
const heading = document.querySelector(".heading__movements");

// WARNINGS
const warningMovement = document.querySelector(".warning__movement");
const warningFilter = document.querySelector(".warning__filter");

// YEAR
const currentYear = document.querySelector(".current-year");
