import { firstVersion } from "./components/scriptv1.js";
import { secondVersion } from "./components/scriptv2.js";

const storageKey = 'scriptSrc';

const versionBtn = document.querySelector('#version');
const currentLocal = +localStorage.getItem(storageKey);
const funcs = [firstVersion, secondVersion];
const version = Array(funcs.length).fill(0).map((_, i) => '' + (i + 1));

versionBtn.textContent = 'Version ' + (currentLocal && currentLocal === funcs.length ? 1 : currentLocal + 1);

currentLocal ? funcs[+localStorage.getItem(storageKey) - 1]() : firstVersion();

function changeScriptSrc() {
    // currentLocal !== funcs.length ? localStorage.setItem(storageKey, '' + (currentLocal + 1)) : localStorage.setItem(storageKey, '1');

    // versionBtn.textContent = 'Version' + (localStorage.getItem(storageKey));
    // funcs[+localStorage.getItem(storageKey) - 1]();

    if (currentLocal !== funcs.length) {
        localStorage.setItem(storageKey, '' + (currentLocal + 1));
        versionBtn.textContent = 'Version ' + (+localStorage.getItem(storageKey) + 1);
    } else {
        localStorage.setItem(storageKey, '1');
        versionBtn.textContent = 'Version ' + 1;
    }
    funcs[+localStorage.getItem(storageKey) - 1]();
    location.reload(true);

}

versionBtn.addEventListener('click', changeScriptSrc);

/* localStorage.getItem(storageKey) && localStorage.getItem(storageKey) === 'v2' ? secondVersion() : firstVersion();
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

versionBtn.addEventListener('click', changeScriptSrc); */