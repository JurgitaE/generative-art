import { secondVersion } from "./components/scriptv2.js";
import { firstVersion } from "./components/scriptv1.js";

const storageKey = 'scriptSrc';
const versionBtn = document.querySelector('#version');

localStorage.getItem(storageKey) && localStorage.getItem(storageKey) === 'v2' ? secondVersion() : firstVersion();
versionBtn.textContent = localStorage.getItem(storageKey) === 'v2' ? 'Version 1' : 'Version 2';


function changeScriptSrc() {
    localStorage.getItem(storageKey) === 'v2' ? localStorage.setItem(storageKey, 'v1') : localStorage.setItem(storageKey, 'v2');
    if (localStorage.getItem(storageKey) === 'v2') {
        versionBtn.textContent = 'Version 1';
        secondVersion();
    } else {
        versionBtn.textContent = 'Version 2';
        firstVersion();
    }
    location.reload(true);

}

versionBtn.addEventListener('click', changeScriptSrc);