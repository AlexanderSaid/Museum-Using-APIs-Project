export function getSearchTerm() {
  const searchInput = document.querySelector("#main-search").value.trim();
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
      objectIDsArray.forEach(async (id) => {
        const itemURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
        const artworkData = await fetchData(itemURL);
        const objectName = artworkData.objectName.length
          ? artworkData.objectName
          : "";
        const title = artworkData.title;
        const date = artworkData.objectDate.length
          ? artworkData.objectDate
          : "";
        const artist = artworkData.artistDisplayName.length
          ? artworkData.artistDisplayName
          : "";
        const culture = artworkData.culture.length ? artworkData.culture : "";
        const imageSrc = artworkData.primaryImageSmall.length
          ? artworkData.primaryImageSmall
          : "";
        const objectURL = artworkData.objectURL;
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

function getSearchUrl(searchInput) {
  const searchString = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchInput}`;
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

