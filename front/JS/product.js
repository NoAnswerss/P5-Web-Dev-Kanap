// get the id from uRL 
let searchparams =  new URLSearchParams(window.location.search) 
let id = searchparams.get('id') 
let api = 'http://localhost:3000/api/products/'
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

// Create add to cart function

// Getting HTML Access

const btn = document.getElementById('btn');
const title = document.getElementById('title');
const quantity = document.getElementById('quantity');
const color = document.getElementById('colors');
const price = document.getElementById('price');
const description = document.getElementById('description');

// Add click event 

btn.addEventListener('click', ($event) => {
  $event.preventDefault(); // Prevents default behaviour
  let cart = [];
   // Create object to be added to cart
   let myObj = {
    title: title.textContent,
    quantity: quantity.value,
    color: color.value,
    price: price.textContent,
    description: description.textContent,
    id: id
  };
  // Adding cart to local storage 
  if( localStorage.getItem('sofa') != null){
    // Takes cart back to sto
    cart = JSON.parse( localStorage.getItem('sofa') )
    cart.push(myObj)
    localStorage.setItem('sofa',JSON.stringify(cart)) 
  // Stringify transforms JS Object into JSON string
  }else{
   cart.push(myObj);
   localStorage.setItem('sofa', JSON.stringify(cart));
   console.log(localStorage);
  
   // Informs how many items have been added to cart
   alert (quantity.value + ' Products' + ' added to cart');
  }
});


/* JS OBJECT 

{
  name: 'Jeje',
  age: 58,
  occupation: lotteryWinner
} 


function ---> JSON.stringify() ----> JSON.parse() reverse effect

JSON String 

"{
  name: 'Jeje',
  age: 58,
  occupation: lotteryWinner
} " 

*/