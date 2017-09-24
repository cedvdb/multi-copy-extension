copies = [];

chrome.storage.sync.get('copies', copiesData => {
		if(copiesData.copies && copiesData.copies.length > 0)
			copies = copiesData.copies;
});
		
chrome.runtime.onMessage
	.addListener((req, sender, sendRes) => {
		if(req.copy)
			onCopy(req.copy);
});

function onCopy(copy){
	if(copy !== copies[0]){
		copies.unshift(copy);
		checkLength(copies);
		saveCopies(copies);
	}
}

// we just save last 100
function checkLength(copies){
	if(copies.length > 100)
		copies.pop();
}

function saveCopies(copies){
	chrome.storage.sync.set({ copies }, _ => {
		console.log('copying', copies);
	});
}

