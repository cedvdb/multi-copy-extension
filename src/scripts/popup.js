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
			<textarea class="txt" readonly> ${copyTxt}</textarea>
		</li>`
		list.innerHTML = list.innerHTML + innerHtml;
	});
}

list.addEventListener('click', e => {
	/* css pointer event is making sure that we are only retrieving li elems 
	and not a child */
	console.log(e.target, e.target.querySelector('.txt'))
	const txtElem = e.target.querySelector('.txt');
	txtElem.select();
  document.execCommand('copy'); 
})