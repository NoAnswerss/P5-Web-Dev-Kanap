// Getting the id of the order

let displayOrderId = () => {
    let search = window.location.search;
    let searchParams = new URLSearchParams(search);
    let orderId = searchParams.get('orderId');

    // Displays the orderId on the HTML page
    
    document.getElementById('orderId').textContent = orderId;

}