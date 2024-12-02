import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";

import { getAllResto } from "./data.js";
import { generateRestoItemUsingTemplate } from "./utils.js";

const drawerButton = document.querySelector("#drawer-button");
const drawerNavigation = document.querySelector("#navList");
const restoListContainer = document.getElementById("restoList");

function setupDrawer() {
  drawerButton.addEventListener("click", () => {
    drawerNavigation.classList.toggle("open");
  });

  document.body.addEventListener("click", (event) => {
    if (
      !drawerNavigation.contains(event.target) &&
      !drawerButton.contains(event.target)
    ) {
      drawerNavigation.classList.remove("open");
    }
  });
}

function populateWithTemplate(restos) {
  const elements = restos.map((resto) => generateRestoItemUsingTemplate(resto));
  restoListContainer.append(...elements);
}

async function usingAsyncAwait() {
  try {
    const restos = await getAllResto();
    populateWithTemplate(restos);
  } catch (error) {
    console.error("Something went error:", error);
  }
}

(async function () {
  setupDrawer();

  await usingAsyncAwait();
})();
