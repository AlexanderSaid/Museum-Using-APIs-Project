"use strict";
import { createErrorMessage } from "./resultsView.js";
export let leftResultsArray = []; // This array will store the raw results
const endSlice = 12;

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request failed!", response.status, response.statusText);
  }
  return response.json();
}

export function getSearchTerm() {
  const searchInput = document.querySelector("#main-term").value.trim();
  return searchInput;
}

function getSearchUrl(searchInput) {
  const searchString = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchInput}`;
  const searchURL = encodeURI(searchString);
  return searchURL;
}

export async function getRawData(searchInput) {
  const searchURL = getSearchUrl(searchInput);
  const searchResults = await fetchData(searchURL);
  if (searchResults.objectIDs !== null) {
    leftResultsArray.push(...searchResults.objectIDs);
    const total = searchResults.total;
    return total;
  }
}

function setPromises() {
  const objectIDsArray = leftResultsArray.splice(0, endSlice);
  const promises = objectIDsArray.map((id) => {
    const itemURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    return fetchData(itemURL);
  });
  return promises;
}

async function fillResultsArray(promises) {
  const resultsArray = [];
  const artworks = await Promise.all(promises);
  artworks.forEach((artwork) => {
    const id = artwork.objectID;
    const objectName = artwork.objectName.length ? artwork.objectName : "";
    const title = artwork.title;
    const date = artwork.objectDate.length ? artwork.objectDate : "";
    const artist = artwork.artistDisplayName.length
      ? artwork.artistDisplayName
      : "";
    const culture = artwork.culture.length ? artwork.culture : "";
    const imageSrc = artwork.primaryImageSmall.length
      ? artwork.primaryImageSmall
      : "";
    const objectURL = artwork.objectURL;
    const item = {
      id: id,
      objectName: objectName,
      title: title,
      date: date,
      artist: artist,
      culture: culture,
      image: imageSrc,
      objectURL: objectURL,
    };
    resultsArray.push(item);
  });
  return resultsArray;
}

export async function retrieveResults() {
  try {
    const promises = setPromises();
    const resultsArray = await fillResultsArray(promises);
    return resultsArray;
  } catch (error) {
    createErrorMessage(error.message);
  }
}
