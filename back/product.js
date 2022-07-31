
// get the id from uRL 
let searchparams =  new URLSearchParams(window.location.search) 
let id = searchparams.get('id') 
console.log('id',id)

function fetchData() {
  
  // Inserting a single product and its details into the product page

    fetch('http://localhost:3000/api/products/' + id) 
    .then(response => {
        if (!response.ok) {
            throw Error('Error')
        }
        return response.json();
    }).then(data => { 
        document.getElementById('title').innerText = data.name
        document.getElementById('price').innerText = data.price
        document.getElementById('description').innerText = data.description 
        document.getElementById('sofa_image').src = data.imageUrl // Images need src instead of innerText or innerHTML
        // Created map to display array of colors 
        let colors = document.getElementById('colors')
        data.colors.map(color=>{
          colors.insertAdjacentHTML('beforeend', `<option value=${color}>${color}</option>`) 
        })
        // document.getElementById('title').innerText = data.name
        // document.getElementById('title').innerText = data.name
    }).catch(error => {
        console.log(error);
    });
}

fetchData();

// Cart array 

let cart = [];


// Add to Cart

function addToCart(id) {
 const item = products.find((product) => product.id === id)
 console.log(item);
} // 