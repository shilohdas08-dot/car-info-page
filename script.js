// 1. CAR DATA STRUCTURE
// You can add more cars here. Make sure each car has a 'brand' that exactly matches the brand in the list.
const carData = [
    { brand: 'Toyota', model: 'Camry', image: 'https://placehold.co/300x200/007bff/white?text=Toyota+Camry', info: 'The reliable mid-size sedan. Known for excellent resale value and longevity.' },
    { brand: 'Toyota', model: 'Corolla', image: 'https://placehold.co/300x200/007bff/white?text=Toyota+Corolla', info: 'A popular compact car, great for fuel economy and daily commuting.' },
    
    { brand: 'Honda', model: 'Civic', image: 'https://placehold.co/300x200/dc3545/white?text=Honda+Civic', info: 'Sporty and reliable compact car. Offers great handling and features.' },
    { brand: 'Honda', model: 'Accord', image: 'https://placehold.co/300x200/dc3545/white?text=Honda+Accord', info: 'A spacious and well-rounded family sedan.' },

    { brand: 'Ford', model: 'F-150', image: 'https://placehold.co/300x200/28a745/white?text=Ford+F-150', info: 'America\'s best-selling full-size pickup truck. Used for work and personal use.' },
    { brand: 'Ford', model: 'Mustang', image: 'https://placehold.co/300x200/28a745/white?text=Ford+Mustang', info: 'An iconic American muscle car with powerful engine options.' },
    
    // Add more brands and models here!
];

// List of brands to display on the page
const brands = ['Toyota', 'Honda', 'Ford'];

// 2. CORE FUNCTIONS
let currentBrand = null; // Tracks the currently selected brand

// Function to display the list of car brands
function displayBrands() {
    const brandList = document.getElementById('brand-list');
    brandList.innerHTML = ''; // Clear existing content

    brands.forEach(brand => {
        const li = document.createElement('li');
        li.textContent = brand;
        li.onclick = () => filterByBrand(brand);
        brandList.appendChild(li);
    });
}

// Function to filter cars when a brand is clicked
function filterByBrand(brand) {
    currentBrand = brand;
    document.getElementById('brand-title').textContent = `${brand} Models`;
    document.getElementById('search-input').value = ''; // Clear search
    document.getElementById('search-input').placeholder = `Search within ${brand}...`;
    filterAndDisplayCars();
}

// Function to filter and display cars based on the current brand and search text
function filterAndDisplayCars() {
    const carListDiv = document.getElementById('car-list');
    carListDiv.innerHTML = '';
    const searchText = document.getElementById('search-input').value.toLowerCase();
    
    // 1. Filter by current brand
    let filteredCars = carData.filter(car => car.brand === currentBrand);

    // 2. Filter by search text (model name)
    if (searchText) {
        filteredCars = filteredCars.filter(car => 
            car.model.toLowerCase().includes(searchText)
        );
    }
    
    if (filteredCars.length === 0) {
        carListDiv.innerHTML = `<p class="no-results">No ${currentBrand} models found matching "${searchText}".</p>`;
        return;
    }

    // 3. Display the results
    filteredCars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <h3>${car.model}</h3>
            <img src="${car.image}" alt="${car.model} image">
            <p>${car.info}</p>
        `;
        carListDiv.appendChild(carCard);
    });
}

// 3. INITIALIZATION
window.onload = () => {
    displayBrands();
    // Set a default brand to display cars immediately
    if (brands.length > 0) {
        filterByBrand(brands[0]);
    }
    // Attach the search function to the input field
    document.getElementById('search-input').onkeyup = filterAndDisplayCars;
};
