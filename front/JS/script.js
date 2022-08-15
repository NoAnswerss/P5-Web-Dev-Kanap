// Making the card template

const createProductCard = product => {
    return `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt=${product.altTxt}>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>
    `;
}

const displayProducts = products => {

    let html = '';
    products.forEach(product => {
        html += createProductCard(product);
    });

    document.getElementById('items').innerHTML = html;
}

// 

async function getAllProducts() {
    try {
        let products = await loadAPI(urlAPI);
        displayProducts(products);
    } catch (err) {
        alert("Api Error");
        console.log(err);
    }
}
// Calling all the products
getAllProducts();



