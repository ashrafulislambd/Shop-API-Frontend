const ratingFromNumber = (ratingText) => {
    let rating = Math.round(parseFloat(ratingText));
    let output = "";
    while(rating >= 1) {
        rating--;
        output += "⭐";
    }
    return output;
}

const loadProducts = () => {
    const param = new URLSearchParams(document.location.search).get("category");
    if(param) {
        fetch(`https://fakestoreapi.com/products/category/${param}`)
            .then(res => res.json())
            .then(data => displayProducts(data));
    } else {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => displayProducts(data));
    }
}

const displayProducts = (products) => {
    console.log(products);
    products.forEach(product => {
        const parent = document.getElementById("product-container");
        const div = document.createElement("div");
        div.classList.add("card");
        div.style.width = "18rem";
        div.innerHTML = `
            <img src="${ product.image }" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${ product.title }</h5>
                <p class="card-text">${ product.description.slice(0, 140) }</p>
                <div data-coreui-toggle="rating" data-coreui-value="3"></div>
                <span>${ ratingFromNumber(product.rating.rate) }</span><br/>
                <div class="d-flex justify-content-between align-items-center">
                    <span><b>$${ product.price }</b></span>
                    <a href="#" class="btn btn-primary mt-2">Details</a>
                </div>
            </div>
        `;
        parent.appendChild(div);
    })
}

const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(data => displayCategories(data));
}

const displayCategories = (categories) => {
    categories.forEach(category => {
        const parent = document.getElementById("category-container");
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `<a class="category-link" href="?category=${category}">${category}</a>`;
        parent.appendChild(li);
    });
}

loadProducts();
loadCategories();