
// Getting the cart to display

const displayCart = savedProducts => {
    
    getProductsFromAPI()
    .then(productsFromAPI => {
        
        let html = ''; // creating HTML string
        let items = []; // Creating items array
        
        savedProducts.forEach(storedProduct => {
            // Getting product data from API 
            let productData = productsFromAPI.find(productfromAPI => productfromAPI._id ===  storedProduct.id);
            
            // Creating the item to display 
            
            const item = {
                id: storedProduct.id,
                color: storedProduct.color,
                quantity: storedProduct.quantity,
                name: productData.name,
                price: productData.price,
                imageUrl: productData.imageUrl,
                altTxt: productData.altTxt
            }
            
            // Adding / pushing the item to the cart array
            
            items.push(item);
            
            // creating item in html string
            
            html += createCartItem(item);
            
            // adding the html string to the DOM
            
            document.getElementById('cart__items').innerHTML = html;
            
        });
        
        getTotal(items);
        
        // Dealing with any modifications or removals of products on the cart page
        
        
        document.querySelectorAll('.itemQuantity').forEach(input => {
            
            let oldValue = parseInt(input.value);
            // Adding change event listener for <input> as per documentation Recommendation
            input.addEventListener('change', e => {
                //  This method starts at the element itself, then the anchestors (parent, grandparent, ...) until a match is found
                let article = e.target.closest('article');
                // retrieve elements field value
                let quantity = parseInt(e.target.value);
                
                if (isQuantityValid(quantity)) {
                    
                    // Search for the index of the article for which the quantity is modified
                    let id = article.dataset.id;
                    let color = article.dataset.color;
                    let indexItem = items.findIndex(item => item.id === id && item.color === color);
                    
                    // Changing quantity of products
                    items[indexItem].quantity = quantity;
                    
                    // Updated price after quantity modification
                    getTotal(items);                    
                    
                    // Updating the local storage cart array
                    savedProducts[indexItem].quantity = quantity;
                    setProductsInLocalStorage(savedProducts);
                    
                    oldValue = parseInt(input.value);
                    alert("Cart updated");
                    
                } else {
                    input.value = oldValue;
                    alert("Please choose a number of item(s) between 1 and 100");
                }
                
                
            })
        });
        
        // Creating delete option on click
        
        document.querySelectorAll('.deleteItem').forEach(btn => {
            btn.addEventListener('click', e => {
                
                let article = e.target.closest('article');
                
                deleteArticle(article, items, savedProducts);
                
                alert("Product removed");
                
            })
        });
        
    })
    .catch(err => console.log(err));
    
    
    
}

// Accessing local storage products and getting them from the api 


displayCart(getProductsFromLocalStorage());

async function getProductsFromAPI() {
    return await loadAPI(urlAPI);
}


// Creting the DOM element response 

const createCartItem = item => {
    return `
    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
    <div class="cart__item__img">
    <img src="${item.imageUrl}" alt="${item.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${item.name}</h2>
    <p>${item.color}</p>
    <p>${item.price}€</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté :</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">delete</p>
    </div>
    </div>
    </div>
    </article>
    `;
}

// Get the total price in basket 

const getTotal = items => {
    
    // setting default values to 0
    
    let totalQuantity = 0;
    let totalPrice = 0;
    
    items.forEach(item => {
        totalQuantity += item.quantity; // Getting values from DOM
        totalPrice += item.quantity * item.price; // Getting values from DOM
    });
    
    document.getElementById('totalQuantity').textContent = totalQuantity; // Updating the DOM with new values
    document.getElementById('totalPrice').textContent = totalPrice; // Updating the DOM with new values
}

// Delete item from cart and local storage

const deleteArticle = (article, items, savedProducts) => {
    
    article.remove(); // Deleting from the DOM
    
    // Delete product by index
    
    let id = article.dataset.id;
    let color = article.dataset.color;
    let indexItem = items.findIndex(item => item.id === id && item.color === color);
    
    // Removing the product from the items array at the corresponding index
    
    items.splice(indexItem, 1); // Splice lets us change the content of our array by removing or replacing existing elements with new ones
    
    // Updating the total price after item removal
    
    getTotal(items);
    
    // Deletes the product in the LocalStorage
    savedProducts.splice(indexItem, 1);
    setProductsInLocalStorage(savedProducts);
}

// Submitting order , validating the form and resetting local storage and cart

const form = document.querySelector('form.cart__order__form');

form.firstName.addEventListener('change', () => {
    isNameValid(form.lastName);
})

// Submiting form

form.addEventListener('submit', e => {
    
    e.preventDefault();
    
    // Check if cart is valid
    
    if(isCartValid()) {
        
        // If the card is validated, we create a contact object from the data
        
        if(isNameValid(form.firstName) && isNameValid(form.lastName) && isNameValid(form.city) && isAddressValid(form.address) && isEmailValid(form.email)) {
            
            // //Create new object
            
            const contact = getContact();
            
            const products = getProductsFromLocalStorage().map(product => product.id);
            
            // Getting the order by calling getOrderId function
            
            getOrderId(contact, products)
            .then(orderId => {
                
                // Deletes cart from local storage
                
                deleteProductsInLocalStorage();
                
                // Redirecting to the Confirmation page and getting confirmation id
                
                goToConfirmation(orderId);
            })
            
        } else {
            console.log('formulaire pas valide');
        }
        
        
    } else {
        console.log('cart not valid');
    }
    
});


// returning data added to the form

const getContact = () => {
    // Using trim to remove whitespace 
    return {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        address: form.address.value.trim(),
        city: form.city.value.trim(),
        email: form.email.value.trim()
    }
}

// Creating AJAX function to get order data

async function getOrderId(contact, products) {
    
    try {
        const orderData = {contact, products};
        let respData = await postAPI(`${urlAPI}order`, orderData); // Sending POST Request to collect order ID
        const orderId = respData.orderId;
        return orderId;
        
    } catch (err) {
        alert("API Problem");
        console.log(err);
    }
    
}

const goToConfirmation = orderId => {
    window.location = `./confirmation.html?orderId=${orderId}`;  // Redirect to the confirmation page based on the url's id 
}
