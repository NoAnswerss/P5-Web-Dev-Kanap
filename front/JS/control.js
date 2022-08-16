// Creating script that looks for errors and adding it to right html files

// Check if quantity is has valid entry

const isQuantityValid = quantity => {
    
    // Boolean that checks if state is true or false
    
    console.log(quantity);
    
    // NaN = not a number 
    
    if(isNaN(quantity)) return false;
    
    // || Won't allow to choose number over 100 && will let choose number over 100
    
    return quantity < 1 || quantity > 100 ? false : true;
    
}

// Check if color has been selected

const isColorValid = color => {
    
    return color === "" ? false : true;
    
}

// Check if cart is empty

const cartState = () => {
    
    let result = true;
    
    const totalQuantity = parseInt(document.getElementById('totalQuantity').textContent);
    
    // If basket is empty 
    if(totalQuantity === 0) {
        // Return alert 
        alert('Your basket is empty !');
        result = false;
    }
    
    return result;
    
}

const isNameValid = inputName => {
    // Checking to see if name has valid Characters
    if (/^[a-z\éèàêâîiïù\-' ]{1,30}$/i.test(inputName.value)) {
        inputName.nextElementSibling.innerText = "";
        return true;
    } else {
        
        if (inputName.name === "firstName") {
            inputName.nextElementSibling.innerText = "please enter a first name in the correct format";
        } else if (inputName.name === "lastName") {
            inputName.nextElementSibling.innerText = "please enter a name in the correct format";
        } else if (inputName.name === "city") {
            inputName.nextElementSibling.innerText = "please enter a city in the correct format";
        }
        return false;
    }
}

// Check address for special characters 

const isAddressValid = inputAddress => {
    
    if (/^[a-z\éèàêâîiïù\d\-' ]{5,50}$/i.test(inputAddress.value)) {
        inputAddress.nextElementSibling.innerText = "";
        return true;
    } else {
        inputAddress.nextElementSibling.innerText = "please enter an address in the correct format";
        return false;
    }
}


const isEmailValid = inputEmail => {
    
    // Checking email address formatting
    
    if (/^([a-z\d\._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i.test(inputEmail.value)) {
        inputEmail.nextElementSibling.innerText = "";
        return true;
    } else {
        inputEmail.nextElementSibling.innerText = "add email address in correct format";
        return false;
    }
}

// Created cart checking 

const isCartValid = () => {

    let result = true;
    
    const totalQuantity = parseInt(document.getElementById('totalQuantity').textContent);

    if(totalQuantity === 0) {
        alert('Cart is empty !');
        result = false;
    }

    return result;

}