import { secondVersion } from "./scriptv2.js";
import { firsVersion } from "./scriptv1.js";

const storageKey = 'scriptSrc';
const versionBtn = document.querySelector('#version');
const scriptTag = document.querySelector('script');

localStorage.getItem(storageKey) && localStorage.getItem(storageKey) === 'v2' ? secondVersion() : firsVersion();


function changeScriptSrc() {
    localStorage.getItem(storageKey) === 'v2' ? localStorage.setItem(storageKey, 'v1') : localStorage.setItem(storageKey, 'v2');
    if (localStorage.getItem(storageKey) === 'v2') {
        versionBtn.textContent = 'Version 1';
        secondVersion();
    } else {
        versionBtn.textContent = 'Version 2';
        firsVersion();
    }
    location.reload(true);
}

versionBtn.addEventListener('click', changeScriptSrc);