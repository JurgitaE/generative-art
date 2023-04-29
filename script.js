import { firstVersion } from "./components/scriptv1.js";
import { secondVersion } from "./components/scriptv2.js";
import { thirdVersion } from "./components/scriptv3.js";


const versionBtn = document.querySelector('#version');
const funcs = [firstVersion, secondVersion, thirdVersion];
const storageKey = 'scriptSrc';
const currentLocal = isFinite(+localStorage.getItem(storageKey)) ? +localStorage.getItem(storageKey) : localStorage.getItem(storageKey);

console.log(currentLocal);

versionBtn.textContent = 'Version ' + (currentLocal && currentLocal === funcs.length ? 1
    : !currentLocal || !(typeof currentLocal === 'number') || currentLocal > funcs.length ? 2
        : currentLocal + 1);
currentLocal && typeof currentLocal === 'number' && currentLocal <= funcs.length ? funcs[+localStorage.getItem(storageKey) - 1]() : firstVersion();

function changeScriptSrc() {
    currentLocal && typeof currentLocal === 'number' && currentLocal < funcs.length ? localStorage.setItem(storageKey, '' + (currentLocal + 1))
        : !currentLocal || !(typeof currentLocal === 'number') || currentLocal > funcs.length ? localStorage.setItem(storageKey, '2')
            : localStorage.setItem(storageKey, '1');

    funcs[+localStorage.getItem(storageKey) - 1]();
    location.reload(true);
}

versionBtn.addEventListener('click', changeScriptSrc);
