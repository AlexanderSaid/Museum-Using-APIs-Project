"use strict";
import { setSearchFocus, handleInputField } from "./searchForm.js";
import {
  getSearchTerm,
  retrieveSearchResults,
  retrieveMoreResults,
} from "./dataFunction.js";
import {
  clearSearchResults,
  createResultsElement,
  createLoadMoreButton,
} from "./resultsView.js";
import { leftResultsArray } from "./data.js";
const SEARCH_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
const GET_OBJECT_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const GET_DEPARTMENTS_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";

function submitTheSearch(event) {
  event.preventDefault();
  leftResultsArray.length = 0;
  const searchButton = document.getElementById("search-button");
  searchButton.setAttribute("disabled", "disabled");
  clearSearchResults();
  processTheSearch();
}
export async function loadMoreResults(event) {
  // event.preventDefault();
  const moreResultsArray = await retrieveMoreResults();
  if (moreResultsArray.length) {
    createResultsElement(moreResultsArray);
  }
}
function initApp() {
  setSearchFocus();
  const form = document.querySelector("#query-form");
  form.addEventListener("submit", submitTheSearch);
  handleInputField();
}

async function processTheSearch() {
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const resultsArray = await retrieveSearchResults(searchTerm);
  if (resultsArray.length) {
    createResultsElement(resultsArray);
  }
  createLoadMoreButton();
}

window.addEventListener("load", initApp);
