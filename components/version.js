const scriptTag = document.querySelector('script');
const storageKey = 'scriptSrc';

if (localStorage.getItem(storageKey)) {
    scriptTag.src = localStorage.getItem(storageKey);
}

function changeScriptSrc() {
    const versionBtn = document.querySelector('#version');
    scriptTag.src = `./${scriptTag.src.slice(scriptTag.src.lastIndexOf('/') + 1)}` === "./script.js" ? "./script-initial.js" : "./script.js";

    localStorage.setItem(storageKey, `./${scriptTag.src.slice(scriptTag.src.lastIndexOf('/') + 1)}`);
    // location.reload();
    versionBtn.textContent = versionBtn.textContent === 'Version 2' ? 'Version 1' : 'Version 2';
}
export { changeScriptSrc };