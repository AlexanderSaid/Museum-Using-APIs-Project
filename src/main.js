"use strict";
import { setSearchFocus, handleInputField } from "./searchForm.js";
import {
  getSearchTerm,
  getRawData,
  retrieveResults,
  leftResultsArray,
} from "./dataFunction.js";
import {
  clearSearchResults,
  createResultsElement,
  createLoadMoreButton,
  createNoResultsMessage,
} from "./resultsView.js";

function submitTheSearch(event) {
  event.preventDefault();
  leftResultsArray.length = 0;
  const searchButton = document.getElementById("search-button");
  searchButton.setAttribute("disabled", "disabled");
  clearSearchResults();
  processTheSearch();
}

async function processTheSearch() {
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const rawResults = await getRawData(searchTerm);
  if (!rawResults) {
    createNoResultsMessage();
    return;
  }
  const resultsArray = await retrieveResults();
  if (resultsArray.length) {
    createResultsElement(resultsArray);
  }
  createLoadMoreButton();
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
  const form = document.querySelector("#query-form");
  form.addEventListener("submit", submitTheSearch);
  handleInputField();
}



window.addEventListener("load", initApp);
