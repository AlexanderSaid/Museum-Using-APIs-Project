'use strict';

export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed!', response.status, response.statusText);
  }
  return response.json();
}

export function getSearchTerm() {
  const searchInput = document.querySelector('#main-term').value.trim();
  return searchInput;
}

function getSearchUrl(searchInput) {
  const searchString = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchInput}`;
  const searchURL = encodeURI(searchString);
  return searchURL;
}

export function getArtworkIDs(searchInput) {
  const searchURL = getSearchUrl(searchInput);
  return fetchData(searchURL);
}

export function processArtworks(artworks) {
  return artworks.map((artwork) => {
    const id = artwork.objectID;
    const objectName = artwork.objectName.length ? artwork.objectName : '';
    const title = artwork.title;
    const date = artwork.objectDate.length ? artwork.objectDate : '';
    const artist = artwork.artistDisplayName.length
      ? artwork.artistDisplayName
      : '';
    const culture = artwork.culture.length ? artwork.culture : '';
    const imageSrc = artwork.primaryImageSmall.length
      ? artwork.primaryImageSmall
      : '';
    const objectURL = artwork.objectURL;
    return {
      id: id,
      objectName: objectName,
      title: title,
      date: date,
      artist: artist,
      culture: culture,
      image: imageSrc,
      objectURL: objectURL,
    };
  });
}
