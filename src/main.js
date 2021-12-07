"use strict";
import { setSearchFocus, setUpInputField } from "./searchForm.js";
import {
  getSearchTerm,
  getRawData,
  retrieveResults,
  leftResultsArray,
} from "./dataFunctions.js";
import {
  clearSearchResults,
  createResultsElement,
  createLoadMoreButton,
  createNoResultsMessage,
} from "./resultsView.js";

async function processTheSearch() {
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const totalResults = await getRawData(searchTerm);
  if (!totalResults) {
    createNoResultsMessage();
    return;
  }
  const resultsArray = await retrieveResults();
  if (resultsArray) {
    createResultsElement(resultsArray);
    createLoadMoreButton();
  }
}

function submitTheSearch(event) {
  event.preventDefault();
  leftResultsArray.length = 0;
  const searchButton = document.getElementById("search-button");
  searchButton.setAttribute("disabled", "disabled");
  clearSearchResults();
  processTheSearch();
}

export async function loadMoreResults() {
  const moreResultsArray = await retrieveResults();
  if (moreResultsArray.length) {
    createResultsElement(moreResultsArray);
  }

  if (!leftResultsArray.length) {
    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.setAttribute("disabled", "disabled");
    loadMoreButton.textContent = 'No more results';
  }
}

function initApp() {
  setSearchFocus();
  const form = document.querySelector("#search-form");
  form.addEventListener("submit", submitTheSearch);
  setUpInputField();
}

window.addEventListener("load", initApp);
