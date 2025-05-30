const form = document.getElementById("form");
const productsContainer = document.getElementById("products");
const messageBox = document.getElementById("form-message");

const BASE_URL = "https://btl-products-api.onrender.com/products";

const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL, { method: "GET" });
    const data = await response.json();

    localStorage.setItem("products", JSON.stringify(data));
        displayProducts(data)

  } catch (error) {
    console.log("Error fetching data", error);
  }
};

getProducts();

// let products = JSON.parse(localStorage.getItem("products"));
// console.log(products);

const displayProducts = (products) => {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
    <img src=${product.image} />
    <p>${product.title}</p>
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <button id="deleteBtn">Delete</button>
    `;
    productsContainer.appendChild(productCard);

    const deleteBtn = productCard.querySelector("deleteBtn");
    deleteBtn.addEventListener("click",()=>{
productCard.remove();
 });
  });
};

// displayProducts(products);

// const addProduct = (product) => {
//   const getProducts = localStorage.getItem("products");

//   if (getProducts) {
//     // products = getProducts;
//     localStorage.removeItem("products");
//   }
//   products.push(product);

//   localStorage.setItem("products", JSON.stringify(products));

//   displayProducts(products);
// };

// addProduct({ title: "Bag", description: "sfddffdf" });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const category = document.getElementById("category").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("img-url").value.trim();
  const price = document.getElementById("price").value.trim();

  if (!title || !description || !image || !price) {
    messageBox.innerHTML = "All fields are required";
    messageBox.style.color = "red";
    return;
  }

  const newProduct = {
    id: id,
    title: title,
    description: description,
    image: image,
    price: price,
    category: category,
  };
 displayProducts([newProduct]);


  //   addProduct(newProduct);
  messageBox.innerHTML = "Product successfully added";
  messageBox.style.color = "green";
  form.reset();
});
displayProducts();
