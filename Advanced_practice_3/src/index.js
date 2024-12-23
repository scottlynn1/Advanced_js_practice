import {homeLoad} from "./home.js"
import {projectsLoad} from "./projects.js"
import {contactLoad} from "./contact.js"

const page = document.querySelector('#content');

const home = document.querySelector('#home');
const projects = document.querySelector('#projects');
const contact = document.querySelector('#contact');

home.addEventListener('click', () => {
  page.replaceChildren();
  homeLoad(page);
});

projects.addEventListener('click', () => {
  page.replaceChildren();
  projectsLoad(page);
});

contact.addEventListener('click', () => {
  page.replaceChildren();
  contactLoad(page);
});

homeLoad(page);

console.log('Hello, Scott');