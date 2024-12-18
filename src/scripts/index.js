import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";

import { getAllMusics } from "./api.js";
import {
  generateMusicItemUsingTemplate,
  showLoading,
  hideLoading,
} from "./utils.js";

const drawerButton = document.querySelector("#drawer-button");
const drawerNavigation = document.querySelector("#navList");
const musicListContainer = document.getElementById("musicList");

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

function stopOtherAudio(currentAudio) {
  const listOfAudioElement = document.querySelectorAll("audio");

  listOfAudioElement.forEach((audioElement) => {
    // Others audio will be paused
    if (currentAudio !== audioElement) {
      audioElement.pause();
    }
  });
}

function setupOnlyOneAudioIsPlaying() {
  const listOfAudioElement = document.querySelectorAll("audio");

  listOfAudioElement.forEach((audioElement) => {
    /**
     * See: HTMLMediaElement: play event
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event
     */
    audioElement.addEventListener("play", (event) => {
      const currentAudio = event.currentTarget;
      stopOtherAudio(currentAudio);
    });
  });
}

function populateWithTemplate(musics) {
  const elements = musics.map((music) => generateMusicItemUsingTemplate(music));
  musicListContainer.append(...elements);
}

async function usingAsyncAwait() {
  showLoading();

  try {
    const musics = await getAllMusics();
    populateWithTemplate(musics);
  } catch (error) {
    console.error("Something went error:", error);
  } finally {
    hideLoading();
  }
}

(async function () {
  setupDrawer();

  await usingAsyncAwait();
  setupOnlyOneAudioIsPlaying();
})();
