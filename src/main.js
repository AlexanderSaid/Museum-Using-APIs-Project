"use strict";
import { setSearchFocus } from "./searchForm.js";
import {
  getSearchTerm,
  fetchData,
  retrieveSearchResults,
} from "./dataFunction.js";
import { createResultsElement } from "./resultsView.js";
const SEARCH_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
const GET_OBJECT_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const GET_DEPARTMENTS_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";

async function fetchDepartmentSelect(url) {
  const departmentsSelect = document.querySelector(".departments-list");
  try {
    const queryObjects = await fetchData(url);
    const departments = queryObjects.departments;
    console.log(departments);
    departments.forEach((department) => {
      const optionElement = document.createElement("option");
      optionElement.value = department.departmentIds;
      optionElement.textContent = department.displayName;
      departmentsSelect.appendChild(optionElement);
    });
  } catch (error) {
    console.log(error.stack);
  }
}

function submitTheSearch(event) {
  event.preventDefault();
  processTheSearch();
  // setSearchFocus();
}

function initApp() {
  // fetchDepartmentSelect(GET_DEPARTMENTS_URL);
  setSearchFocus();
  const form = document.querySelector("#query-form");
  form.addEventListener("submit", submitTheSearch);
}

async function processTheSearch() {
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const resultsArray = await retrieveSearchResults(searchTerm);
  console.log(resultsArray);
  console.log(resultsArray.length)
  console.log(resultsArray[0])
  if(resultsArray.length) {
  createResultsElement(resultsArray);
  }
}
window.addEventListener("load", initApp);
