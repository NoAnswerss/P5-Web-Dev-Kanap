
/*  Display Dynamic Cards
var titlearray =["Beestay","Future lime","Powder","Charcoal diamonds","Carbone","El fuego","Candy dream"];
var descriptionarray =["kanap","kanap","kanap","kanap","kanap","kanap","kanap"];
var imageArray = ["kanap02","kanap03","kanap04","kanap05","kanap06","kanap07","kanap08"]
var dynamic = document.querySelector('.items');  
for (var i = 0; i < titlearray.length; i++) {
  var fetch = document.querySelector('.items').innerHTML;  
  dynamic.innerHTML = `<a href="./product.html?id=42">
  <article>
  <img src="/back/images/${imageArray[i]}.jpeg" alt="Sofa"> 
  <h3 class="productName">${titlearray[i]}</h3>
  <p class="productDescription">${descriptionarray[i]}</p>
  </article>
  </a>` + fetch ; }
  // End of Dynamic Cards Display
  // So you should put all your fetch calls together for easier access.
  // Research URLSearchParam
  
  const params = new URLSearchParams({
    query: 'kanap',
    language: 'en'
  })
  const url = 'index.html?${ params.toString() }'
  fetch(url)
  .then(response => response.text())
  .then(console.log)
  console.log(url); */
  function fetchData() {
    fetch('http://localhost:3000/api/products')
    .then(response => {
      if (!response.ok) {
        throw Error('Error')
      }
      return response.json();
    }).then(data => {
      console.log(data); // check later
      const html = data.map(sofa => {

        return `<h2>Name: ${sofa.name}</h2>
          <a>
          <article>
          <img src="/back/images/kanap01.jpeg" alt="Blue Sofa">
          <h3 class="productName"></h3>
          <p class="productDescription"></p>
          </article>
          </a>
        `; 
      }).join("");
      console.log(html);
      document.querySelector('.items').insertAdjacentHTML("beforebegin", html)
    }).catch(error => {
      console.log(error);
    });
  }
  
  fetchData();