
import products from "./data/products.json";

// Number of products displayed on each page
const productsPerPage = 5;

// Start on the first page
let currentPage = 1;

// Calculate the total number of pages
const totalPages = Math.ceil(products.length / productsPerPage);

// Find the HTML containers
const productContainer = document.getElementById("product-container");
const paginationContainer = document.getElementById("pagination");

// Only run the store functionality on the Store Page
if (productContainer && paginationContainer) {
    renderProducts();
    renderPagination();
}

// Display the products for the current page
function renderProducts() {
    // Calculate which products belong on the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Get only the products for the current page
    const currentProducts = products.slice(startIndex, endIndex);

    // Clear the previous products
    productContainer.innerHTML = "";

    // Create a card for each product
    currentProducts.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <span class="category-badge">${product.category}</span>
            <p>${product.description}</p>
        `;

        productContainer.appendChild(card);
    });
}

// Display the pagination controls
function renderPagination() {
    // Clear the previous controls
    paginationContainer.innerHTML = "";

    // Previous button
    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
    previousButton.disabled = currentPage === 1;

    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });

    // Page indicator
    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    // Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    });

    // Add controls to the page
    paginationContainer.appendChild(previousButton);
    paginationContainer.appendChild(pageIndicator);
    paginationContainer.appendChild(nextButton);
}

// Refresh the products and pagination controls
function updatePage() {
    renderProducts();
    renderPagination();
}
