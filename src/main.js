'use strict';
import { setSearchFocus, setUpInputField } from './searchForm.js';
import {
  fetchData,
  getSearchTerm,
  getArtworkIDs as getArtworkObjectIDs,
  processArtworks,
} from './dataFunctions.js';
import {
  clearSearchResults,
  createResultsElement as renderResults,
  createNoResultsMessage,
  createErrorMessage,
} from './resultsView.js';

const SLICE_SIZE = 10;

function createLoadMoreButton(onClick) {
  const mainElement = document.querySelector('main');
  const loadMoreButton = document.createElement('button');
  loadMoreButton.id = 'load-more';
  loadMoreButton.classList.add('button');
  loadMoreButton.textContent = 'Show More';
  mainElement.appendChild(loadMoreButton);
  loadMoreButton.addEventListener('click', onClick);
}

async function processTheSearch() {
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const { objectIDs } = await getArtworkObjectIDs(searchTerm);
  if (objectIDs.length === 0) {
    createNoResultsMessage();
    return;
  }

  const getArtworksPage = async () => {
    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
      loadMoreButton.remove();
    }

    const currentObjectIDs = objectIDs.splice(0, SLICE_SIZE);

    try {
      const promises = currentObjectIDs.map((id) => {
        const itemURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
        return fetchData(itemURL);
      });

      const artworks = await Promise.all(promises);
      const results = processArtworks(artworks);

      if (results.length > 0) {
        renderResults(results);
      }

      const hasMore = objectIDs.length > 0;
      if (hasMore) {
        createLoadMoreButton(getArtworksPage);
      }
    } catch (error) {
      createErrorMessage(error);
    }
  };

  // Display the first page
  getArtworksPage();
}

function submitTheSearch(event) {
  event.preventDefault();
  const searchButton = document.getElementById('search-button');
  searchButton.setAttribute('disabled', 'disabled');
  clearSearchResults();
  processTheSearch();
}

function initApp() {
  setSearchFocus();
  const form = document.querySelector('#search-form');
  form.addEventListener('submit', submitTheSearch);
  setUpInputField();
}

window.addEventListener('load', initApp);
