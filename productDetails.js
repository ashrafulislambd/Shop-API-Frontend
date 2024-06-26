const ratingFromNumber = (ratingText) => {
    let rating = Math.round(parseFloat(ratingText));
    let output = "";
    while(rating >= 1) {
        rating--;
        output += "⭐";
    }
    return output;
}

const loadProduct = () => {
    const param = new URLSearchParams(document.location.search).get("id");
    fetch(`https://fakestoreapi.com/products/${ param }`)
            .then(res=>res.json())
            .then(json=>displayProduct(json));
}

const displayProduct = (product) => {
    const parent = document.getElementById("product");
    parent.innerHTML = `
        <div class="d-flex mt-5 gap-5">
            <img width="350px" src="${ product.image }" alt="" />
            <div>
                <h1>${ product.title }</h1>
                <p>${ product.description }</p>
                <span class="badge text-bg-secondary p-2"><b>${ product.category }</b></span>
                <h5><span>${ ratingFromNumber(product.rating.rate) }</span></h5>
                <span>Reviewed by ${ product.rating.count } users</span><br/>
                <h4 class="mt-5">Price: $${ product.price }</h4>
                <button class="btn btn-primary">Buy Now</button>
            <div>
        </div>
    `
}

loadProduct();