document.addEventListener('copy', function(e){
	const selection = window.getSelection().toString();
	chrome.runtime.sendMessage({ copy : selection });
});