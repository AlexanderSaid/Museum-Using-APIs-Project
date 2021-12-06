"use strict";

export function createResultsElement(resultsArray) {
  const resultsContainer = document.querySelector("#search-results");
  resultsArray.forEach((artwork) => {
    const artworkContainer = document.createElement("div");
    artworkContainer.classList.add("artwork");
    const imgElement = createImageElement(artwork);
    const artworkInfo = createItemInfoElement(artwork);
    artworkContainer.appendChild(imgElement);
    artworkContainer.appendChild(artworkInfo);
    resultsContainer.appendChild(artworkContainer);
  });
  return resultsContainer;
}
function createImageElement(artwork) {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  const copyRight = document.createElement("span");
  copyRight.classList.add("copy-right");
  copyRight.textContent = "This image is not available because of copyright";
  if (artwork.image) {
    imgContainer.style.backgroundImage = `url(${artwork.image})`;
  } else {
    imgContainer.appendChild(copyRight);
  }
  return imgContainer;
}
function createItemInfoElement(artwork) {
  const artworkInfoContainer = document.createElement("div");
  artworkInfoContainer.classList.add("artwork-info-container");
  const titleContainer = document.createElement("div");
  titleContainer.classList.add('artwork-title');
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
  artworkInfoContainer.appendChild(titleContainer);
  artworkInfoContainer.appendChild(info);
  return artworkInfoContainer;
}
