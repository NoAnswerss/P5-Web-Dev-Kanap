
// Display Dynamic Cards
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