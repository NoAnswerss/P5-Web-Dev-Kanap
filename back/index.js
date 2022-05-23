
// Display Dynamic Cards
var titlearray =["kanap","js","python","java","android","jquery","ruby"];
var descriptionarray =["css style","js program","python code","java objects","android program","jquery objects","ruby code"];
var imageArray = ["kanap01.jpeg","kanap02.jpeg","kanap03.jpeg","kanap04.jpeg","kanap05.jpeg","kanap06.jpeg","kanap07.jpeg","kanap08.jpeg"]
var dynamic = document.querySelector('.items');  
for (var i = 0; i < titlearray.length; i++) {
  var fetch = document.querySelector('.items').innerHTML;  
  dynamic.innerHTML = `<a href="./product.html?id=42">
  <article>
  <img src="imageArray[i]" alt="Sofa">
  <h3 class="productName">${titlearray[i]}</h3>
  <p class="productDescription">${descriptionarray[i]}</p>
</article>
</a>` + fetch ; 
   // var bgimg = document.getElementById(`cards${i}`);
   // bgimg.style.backgroundImage = `url('img/${titlearray[i]}.jpg')`;
} 