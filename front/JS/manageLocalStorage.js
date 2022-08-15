// Get list of products from localStorage

const getProductsFromLocalStorage = () => {
    
    let result = [];
    
    // Check if cart is empty or returns an array of objects
    /* To check if a key exists or not in localStorage, we can use the localStorage.
        getItem() method. The localStorage. getItem() method takes the key
        as an argument and returns the key's value */

    if(isKeyInLocalStorage('cart')) {
        result = JSON.parse(localStorage.getItem('cart'));
    }
    
    return result;
}

// creating and updating data in local storage

const setProductsInLocalStorage = data => {
    localStorage.setItem('cart', JSON.stringify(data));
}

// Look if key is in local storage

// hasOwnProperty() The hasOwnProperty() method returns a boolean indicating whether the object 
// has the specified property as its own property (as opposed to inheriting it)

const isKeyInLocalStorage = key => {
    return localStorage.hasOwnProperty(key);
}

// removing local storage list

const deleteProductsInLocalStorage = () => {
    localStorage.removeItem('cart');
}




