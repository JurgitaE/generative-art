import { firstVersion } from "./components/scriptv1.js";
import { secondVersion } from "./components/scriptv2.js";
import { thirdVersion } from "./components/scriptv3.js";


const versionBtn = document.querySelector('#version');
const funcs = [firstVersion, secondVersion, thirdVersion];
const storageKey = 'scriptSrc';
const currentLocal = +localStorage.getItem(storageKey);

versionBtn.textContent = 'Version ' + (currentLocal && currentLocal === funcs.length ? 1 : currentLocal + 1);
currentLocal ? funcs[+localStorage.getItem(storageKey) - 1]() : firstVersion();

function changeScriptSrc() {
    currentLocal !== funcs.length ? localStorage.setItem(storageKey, '' + (currentLocal + 1)) : localStorage.setItem(storageKey, '1');
    funcs[+localStorage.getItem(storageKey) - 1]();
    location.reload(true);
}

versionBtn.addEventListener('click', changeScriptSrc);
