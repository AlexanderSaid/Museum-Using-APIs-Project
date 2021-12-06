"use strict";
import { setSearchFocus } from "./searchForm.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunction.js";
import { createResultsElement } from "./resultsView.js";
const SEARCH_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
const GET_OBJECT_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const GET_DEPARTMENTS_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";

function submitTheSearch(event) {
  event.preventDefault();
  processTheSearch();
  setSearchFocus();
}

function initApp() {
  setSearchFocus();
  const form = document.querySelector("#query-form");
  form.addEventListener("submit", submitTheSearch);
}

async function processTheSearch() {
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const resultsArray = await retrieveSearchResults(searchTerm);
  if (resultsArray.length) {
    createResultsElement(resultsArray);
  }
}
window.addEventListener("load", initApp);
