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
// Geting HTML Access
const submitButton = document.getElementById('btn');
const title = document.getElementById('title');
const quantity = document.getElementById('quantity');
const color = document.getElementById('colors')

// Add Click event 

submitButton.addEventListener('click', ($event) => {
  $event.preventDefault(); // Stops default behaviour
  const cart = [];
  // Create new object 
  const myObj = {
    title: title.textContent,
    quantity: quantity.value,
    color: color.value
  };
  cart.push(myObj);
  localStorage.setItem('session', JSON.stringify(cart))
  submitFormData(myObj); // Calling the async function 
  console.log(localStorage)
});


// Creating Async Function

async function submitFormData(post) {
  try {
    const requestPromise = makeRequest(myObj);
    const response = await requestPromise;
    quantity.textContent = response.quantity;
  } catch (errorResponse) {
    quantity.textContent = errorResponse.error;
  }
};