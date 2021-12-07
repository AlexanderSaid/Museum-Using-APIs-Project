"use strict";
export function setSearchFocus() {
  document.getElementById("main-term").focus();
}

export function handleInputField() {
  const inputField = document.getElementById("main-term");
  const searchButton = document.getElementById("search-button");
  inputField.addEventListener("mousedown", () => {
    inputField.value = "";
    searchButton.removeAttribute("disabled");
    if (document.body.contains(document.getElementById("load-more"))) {
      document.getElementById("load-more").remove();
    }
  });
}

