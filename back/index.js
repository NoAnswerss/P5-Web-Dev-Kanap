
//  Display Dynamic Cards
  // Requesting data from the API
  
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
          <a href="./product.html?id=${sofa._id}">
          <article>
          <img src="${sofa.imageUrl}" alt=${sofa.altTxt}>
          <h3 class="productName">${sofa.name}</h3>
          <p class="productDescription">${sofa.description}</p>
          </article>
          </a>
        `; 
      }).join("");
      console.log(html);
      document.querySelector('.items').insertAdjacentHTML("afterbegin", html) // Used after begin and got right result
    }).catch(error => {
      console.log(error);
    });
  }
  
  fetchData();