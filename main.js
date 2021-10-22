const $ = document.querySelector.bind(document);

function showImage(){
    var breed = this.innerText;
    var priorSelected = $('.selected');
    if(priorSelected){
        priorSelected.className = '';
    }
    this.classList.add('selected');
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then( r=>r.json() )
    .then( data => {
        // console.log( data.message )
        $('#dog').src = data.message;
    });
}



function createButton( txt ){
    var btn = document.createElement('button');
    btn.innerText = txt;
    $('#buttons').appendChild(btn);
    btn.onclick = showImage;
}

window.onload = function(){
    // $('.buttons').innerHTML = 'hey now'
    this.fetch('https://dog.ceo/api/breeds/list/all')
    .then(r=>r.json())
    .then(data => {
        // console.log ( data )
        Object.keys( data.message )
            .forEach( createButton );
    })
}