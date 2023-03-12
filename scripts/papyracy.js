let functionToExecute,
  isActive = false;

const papyrifyPage = () => {
	let styleTag = document.querySelector("#papyracy");
	if (!styleTag) {
		styleTag = document.createElement("style");
		styleTag.type = "text/css";
		styleTag.setAttribute("id", "papyracy");
	}
	styleTag.innerHTML = "* { font-family: papyrus !important;}";
	document.querySelector("head").appendChild(styleTag);
}

const unpapyrifyPage = () => {	
	document.querySelector("#papyracy").innerHTML = "";
}

// Get state from storage
chrome.storage.local.get(["papyracy"], ({active}) => {
  isActive = active ?? false;
});

// Add listener for browser action
chrome.action.onClicked.addListener(function (tab) {
  isActive = !isActive;
	// Save state to storage
	chrome.storage.local.set({papyracy: {active: isActive}});
  if (isActive) {		
    chrome.action.setIcon({
      path: "../icons/Papyracy48_active.png",
      tabId: tab.id,
    });
    functionToExecute = papyrifyPage;
    console.log(`%cPapyrusifying:  `, `font-size:1.5em;color:goldenrod;font-family:Papyrus;`, `${tab.url}...`);
  } else {		
    chrome.action.setIcon({ path: "../icons/Papyracy48.png", tabId: tab.id });
    functionToExecute = unpapyrifyPage;
    console.log(`un-Papyrusifying ${tab.url}...`);
  }
	return chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: functionToExecute
	});
});
