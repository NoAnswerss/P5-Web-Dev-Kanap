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



// Local storage can only read arrays




/* Cheat Sheet

// DOM ELEMENT REFERENCES
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const submitButton = document.getElementById('submit-button');
const sidebar = document.getElementById('sidebar');
const commentForm = document.getElementById('comment-form'); Gets access to the form (From HTML)

submitButton.addEventListener('click', ($event) => {
  $event.preventDefault()   STOPS PAGE REFRESHING 
  sidebar.textContent = 'Hi there, ' + firstNameInput.value + ' ' +     lastNameInput.value;
  commentForm.reset()       RESETS FORM AFTER SUBMIT
});
}); */
