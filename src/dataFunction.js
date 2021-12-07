"use strict";
import { leftResultsArray } from "./data.js";
let endSlice;
export function getSearchTerm() {
  const searchInput = document.querySelector("#main-term").value.trim();
  return searchInput;
}
async function getRawData(searchInput) {
  const searchURL = getSearchUrl(searchInput);
  const searchResults = await fetchData(searchURL);
  const objectIDsArray = searchResults.objectIDs;
  return objectIDsArray;
}
export async function retrieveSearchResults(searchInput) {
  try {
    const resultsArray = [];
    const objectIDsArray = await getRawData(searchInput);
    if (objectIDsArray.length) {
      const promises = objectIDsArray.splice(0, 12).map(async (id) => {
        const itemURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
        return fetchData(itemURL);
      });
      leftResultsArray.push(...objectIDsArray);
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
    }
    return resultsArray;
  } catch (error) {
    console.error(error.stack);
  }
}

export async function retrieveMoreResults() {
  try {
    const moreResultsArray = [];
    const loadMoreButton = document.getElementById("load-more");
    if (leftResultsArray.length <= 12) {
      loadMoreButton.setAttribute("disabled", "disabled");
    }
    const objectIDsArray = leftResultsArray.splice(0, 12);
    const promises = objectIDsArray.map(async (id) => {
      const itemURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
      return fetchData(itemURL);
    });
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
      moreResultsArray.push(item);
    });
    return moreResultsArray;
  } catch (error) {
    console.error(error.stack);
  }
}
function getSearchUrl(searchInput) {
  const searchString = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchInput}`;
  const searchURL = encodeURI(searchString);
  return searchURL;
}

export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request failed!", response.status, response.statusText);
  }
  return response.json();
}
