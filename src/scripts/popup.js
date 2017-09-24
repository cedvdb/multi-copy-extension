let copies = [];
const list = document.getElementById('list');

chrome.storage.sync
	.get('copies', c => {
		console.log('copies', c)
		if(c.copies && c.copies.length > 0){
			addCopies(c.copies);
		}
});

function addCopies(copies){
	copies.forEach(copyTxt => {
		const innerHtml = `	
		<li class="button li">
			<i class="fa fa-clone"></i>			
			<div class="txt">${copyTxt}</div>
		</li>`
		list.innerHTML = list.innerHTML + innerHtml;
	})
}

list.addEventListener('click', e => {
	console.log(e.target)
	const txtElem = e.target.querySelector('.txt');
	txt = txtElem.innerText;
	console.log(txt);
})