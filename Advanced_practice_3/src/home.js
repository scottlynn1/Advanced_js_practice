function homeLoad(div) {
  let heading = document.createElement('h1');
  heading.textContent = "home page";
  div.appendChild(heading);
}

export {homeLoad};