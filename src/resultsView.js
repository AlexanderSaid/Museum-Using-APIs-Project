export function createResultsElement(resultsArray) {
  const resultsContainer = document.querySelector("#search-results");
  resultsArray.forEach((artwork) => {
    const artworkContainer = document.createElement("div");
    artworkContainer.classList.add("artwork");
    if (artwork.image) {
      artworkContainer.style.backgroundImage = `url(${artwork.image})`;
      artworkContainer.style.width = '200px';
    }
    const artworkInfo = createItemInfoElement(artwork);
    artworkContainer.appendChild(artworkInfo);
    resultsContainer.appendChild(artworkContainer);
  });
  return resultsContainer;
}

function createItemInfoElement(artwork) {
  const artworkInfo = document.createElement("div");
  artworkInfo.classList.add("artwork-info");
  const titleContainer = document.createElement("div");
  const title = document.createElement("a");
  titleContainer.appendChild(title);
  a.href = artwork.objectURL;
  a.textContent = artwork.title;
  const info = document.createElement("div");
  info.classList.add("info");
  const date = document.createElement("p");
  date.classList.add("artwork-date");
  if (artwork.date) {
    date.textContent = artwork.date;
  }
  const artist = document.createElement("h3");
  artist.classList.add("artist-name");
  if (artwork.artist) {
    artist.textContent = `By: ${artwork.artist}`;
  }
  const nameAndCulture = document.createElement("p");
  nameAndCulture.classList.add("name-culture");
  nameAndCulture.textContent = `${artwork.objectName}, ${artwork.culture}`;
  info.appendChild(date);
  info.appendChild(artist);
  info.appendChild(nameAndCulture);
  artworkInfo.appendChild(titleContainer);
  artworkInfo.appendChild(info);
  return artworkInfo;
}
