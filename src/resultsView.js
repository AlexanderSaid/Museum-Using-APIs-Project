"use strict";

export function createResultsElement(resultsArray) {
  const resultsContainer = document.querySelector("#search-results");
  resultsArray.forEach((artwork) => {
    const artworkContainer = document.createElement("div");
    artworkContainer.classList.add("artwork");
    if (artwork.image) {
      artworkContainer.style.backgroundImage = `url(${artwork.image})`;
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
  title.href = artwork.objectURL;
  title.textContent = artwork.title;
  title.target = "_blank";
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
  const nameOrCulture = document.createElement("p");
  nameOrCulture.classList.add("name-or-culture");
  nameOrCulture.textContent = artwork.culture
    ? `${artwork.objectName} - ${artwork.culture}`
    : `${artwork.objectName}`;
  info.appendChild(date);
  info.appendChild(artist);
  info.appendChild(nameOrCulture);
  artworkInfo.appendChild(titleContainer);
  artworkInfo.appendChild(info);
  return artworkInfo;
}
