let injectedCode, toggleIcon = false;
let activationCode = `styleTag = document.querySelector("#papyracy");
	if (!styleTag) {
		styleTag = document.createElement("style");
		styleTag.type = "text/css";
		styleTag.setAttribute("id", "papyracy");
	}
	styleTag.innerHTML = "* { font-family: papyrus !important;}";
	document.querySelector("head").appendChild(styleTag);`;

let deactivationCode = `document.querySelector("#papyracy").innerHTML = ""`;

chrome.browserAction.onClicked.addListener(function(tab) {
	toggleIcon = !toggleIcon;
	if (toggleIcon) {
		chrome.browserAction.setIcon(
			{path: "Papyracy48_active.png", tabId: tab.id}
		);
		injectedCode = activationCode;
		console.log(`Papyrusifying ${tab.url}...`);
	} else {
		chrome.browserAction.setIcon(
			{path: "Papyracy48.png", tabId: tab.id}
		);
		injectedCode = deactivationCode;
		console.log(`un-Papyrusifying ${tab.url}...`);
	}
  	 return chrome.tabs.executeScript({
		code: injectedCode
  	});
});
