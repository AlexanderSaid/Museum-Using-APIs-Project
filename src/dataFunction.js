"use strict";

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
      endSlice =
        objectIDsArray.length > 20 ? (endSlice = 20) : objectIDsArray.length;
      const promises = objectIDsArray.slice(0, endSlice).map(async (id) => {
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
        resultsArray.push(item);
      });
    }
    console.log(resultsArray);
    return resultsArray;
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
