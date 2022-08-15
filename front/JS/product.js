// Getting query string
const search = window.location.search;

// Creating searchparams to work on query string
const searchParams = new URLSearchParams(search);

// Using get() method we get the id assigned to the product

let productId = searchParams.get('id');

// Get product info from its id and display it
// 'async' before a function makes the function return a promise, always
async function getProduct(id) {

    try {
        let product = await loadAPI(`${urlAPI}${id}`);
        showProductDetails(product);

    } catch (err) {
        alert("Problem with the API");
        console.log(err);
    }

}

// Displaying the products in the DOM

const showProductDetails = product => {
    const image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);
    document.querySelector('.item__img').appendChild(image);

    document.getElementById('title').innerText = product.name;
    document.getElementById('price').innerText = product.price;
    document.getElementById('description').innerText = product.description;

    const colors = document.getElementById('colors');
    product.colors.forEach(color => {
        const option = document.createElement('option');
        option.setAttribute('value', color);
        option.innerText = color;
        colors.appendChild(option);
    });

};

getProduct(productId);

// Creating the click event listener on cart button

document.getElementById('btn').addEventListener('click', () => {
    // Passing what information to display 
    const productToAdd = {
        id: productId,
        color: document.getElementById('colors').value,
        quantity: parseInt(document.getElementById('quantity').value)
    }
    // validating product quantity and color
    if (isQuantityValid(productToAdd.quantity) && isColorValid(productToAdd.color)) {
        addItemToCart(productToAdd);
        alert(JSON.stringify(productToAdd.quantity) + " Sofa(s) added to basket");
    } else {
        if(!isQuantityValid(productToAdd.quantity)) {
            alert("Enter a number between 1 and 100"); // Displays error if number is not between 1 and 100
        }
        if(!isColorValid(productToAdd.color)) { 
            alert('Select a color'); // Displays error if color not selected.
        }
    }
});

// Adding the product to the cart

const addItemToCart = productToAdd => {
    
    let listOfProducts = getProductsFromLocalStorage();
    updateCart(listOfProducts, productToAdd);
}

// Updates the cart product list with the added product

const updateCart = (listOfProducts, productToAdd) => {
    
    // Check cart for duplicate (id, color)

    const index = listOfProducts.findIndex(product => productToAdd.id === product.id && productToAdd.color === product.color);
    
    if(index < 0) {
        // If no duplicate found then push item to cart
        listOfProducts.push(productToAdd);
    } else {
        // If duplicate found, increase the number of products. 
        listOfProducts[index].quantity += productToAdd.quantity;
    }

    // Updating the list of products in the localStorage
    setProductsInLocalStorage(listOfProducts);
    
}

