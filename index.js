import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-a1ebb-default-rtdb.firebaseio.com/",
};

let app = initializeApp(appSettings);
let database = getDatabase(app);
let championCommentsInDb = ref(database, "/champion-commnets");

// Elements
let commentEl = document.getElementById("comment-el");
let publishhBtnEl = document.getElementById("publish-btn");
let commentContainerEl = document.getElementById("comments-container");

onValue(championCommentsInDb, (snapshot) => {
  if (snapshot.exists()) {
    let commentsArray = Object.entries(snapshot.val());

    // Clear div to render updated data
    clearElement(commentContainerEl);

    for (let commentItem of commentsArray) {
      appendComment(commentItem);
    }
  } else {
    commentContainerEl.innerHTML = "No commets here... yet";
  }
});

publishhBtnEl.addEventListener("click", () => {
  let comment = commentEl.value.trim();
  push(championCommentsInDb, comment);
  commentEl.value = "";
});

const clearElement = (element) => {
  element.innerHTML = "";
};

const appendComment = ([id, text]) => {
  let commentDiv = document.createElement("div");
  commentDiv.textContent = text;
  commentDiv.classList.add("comment");
  commentContainerEl.append(commentDiv);
};
