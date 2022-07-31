function fetchData() {
    fetch('http://localhost:3000/api/products')
    .then(response => {
        if (!response.ok) {
            throw Error('Error')
        }
        return response.json();
    }).then(data => {
        console.log(data); 
        const html = data.map(sofa => {
            return `
            <div class="item__img">
            <img src="${sofa.imageUrl}" alt=${sofa.altTxt}>
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${sofa.name}</h1>
                <p>Prix : <span id="price">${sofa.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">${sofa.description}:</p>
              </div>
            `; 
        }).join("");
        console.log(html);
        document.querySelector('.item').insertAdjacentHTML("afterbegin", html) // Used after begin and got right result
    }).catch(error => {
        console.log(error);
    });
}

fetchData();

/* <a href="./product.html?${sofa._id}">
<article>
<img src="${sofa.imageUrl}" alt=${sofa.altTxt}>
<h3 class="productName">${sofa.name}</h3>
<p class="productDescription">${sofa.description}</p>
</article>
</a> */