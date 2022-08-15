// Creating API script for convenient access

var urlAPI = 'http://localhost:3000/api/products/';

// perform Get request from API

async function loadAPI(url) {

    let res = await fetch(url);

    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Error HTTP ! status : ${res.status}`);
    }
}

// perform POST request from API

async function postAPI(url, data) {

    // Using POST request 
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // Making body a string
        body: JSON.stringify(data)
        
    }
    
    let res = await fetch(url, options);

    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Error HTTP ! status : ${res.status}`);
    }

}