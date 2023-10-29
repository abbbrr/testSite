// Массив данных о продуктах
const products = [
    {
        id: 1,
        name: 'Шугаринг',
        imageSrc: 'assets/Photo.jpg',
        description: 'A wide range of vibrant lipstick colors.',
        price: '$10.99',
    },
    {
        id: 2,
        name: 'Педикюр',
        imageSrc: 'assets/Photo2.jpg',
        description: 'A wide range of vibrant lipstick colors.',
        price: '$12.99',
    },
    {
        id: 3,
        name: 'Стрижка',
        imageSrc: 'assets/Photo3.jpg',
        description: 'A wide range of vibrant lipstick colors.',
        price: '$20.99',
    },
    {
        id: 4,
        name: 'Детская стрижка',
        imageSrc: 'assets/Photo2.jpg',
        description: 'A wide range of vibrant lipstick colors.',
        price: '$50.99',
    },
    // Добавьте другие продукты, если необходимо
];

// Функция для создания карточки товара на основе данных
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product';

    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;

    const h2 = document.createElement('h2');
    h2.textContent = product.name;

    const p1 = document.createElement('p');
    p1.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = product.price;

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';

    button.addEventListener('click', () => {
        addToCart(product);
    });

    productCard.appendChild(img);
    productCard.appendChild(h2);
    productCard.appendChild(p1);
    productCard.appendChild(price);
    productCard.appendChild(button);

    return productCard;
}

const productList = document.querySelector('.product-list');

// Создаем карточки товаров на основе данных из массива
products.forEach(product => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
});



const cart = [];

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartElement = document.querySelector('.cart'); // Элемент, отображающий товары в корзине
    const lengthCart = document.getElementById('emptyCartMessage');
    const checkoutButton = document.querySelector('.checkout-button');

    cartElement.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
               <div class="cart-item-details">
                <h4 class="cart-item-name">${product.name}</h4>
                <p class="cart-item-price">${product.price}</p>
                <button class="remove-from-cart" data-index="${index}">Удалить</button>
              </div>
            `;

            cartElement.appendChild(cartItem);

            // Добавьте обработчик событий для кнопки "Удалить"
            const removeButton = cartItem.querySelector('.remove-from-cart');
            removeButton.addEventListener('click', (event) => {
                const indexToRemove = event.target.getAttribute('data-index');
                removeFromCart(indexToRemove);
            });


        });
        lengthCart.style.display = "none";
        checkoutButton.style.display = "block";
    } else {
        lengthCart.style.display = "block";
        checkoutButton.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function (){
    const checkoutButton = document.querySelector('.checkout-button');
    const cartElement = document.querySelector('.cart');
    const successAnimation = document.getElementById('successAnimation');


     checkoutButton.addEventListener('click', () => {
     cart.forEach((product, index) => {

         console.log(`Товар #${index + 1}: ${product.name}, Цена: ${product.price}`);

         cart.length = 0
         updateCart()

         popup.style.display = "none"
         overlay.style.display = "none"
     });

 });
})

function searchProducts(){
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product');

    productCards.forEach(productCard => {
         const productName = productCard.querySelector('h2').textContent.toLowerCase();

          if (searchText === '' || productName.includes(searchText)) {
            productCard.style.display = 'block'; // Показываем товар, если инпут пустой или его имя соответствует поиску
          } else {
                productCard.style.display = 'none'; // Скрываем товар, если его имя не соответствует поиску
            }
    })
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchProducts);
searchProducts();


function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCart();
    }
}


function addToCart(product) {
    // Проверяем, есть ли продукт с таким же ID в корзине
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex === -1) {
        cart.push(product);
    } else {
        cart[existingProductIndex].quantity += 1;
    }

    updateCart();
}




const cartOpen = document.querySelector('.cartOpen')
const closeOpen = document.querySelector(".close")
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

cartOpen.addEventListener('click', () =>{
    popup.style.display = "block";
    overlay.style.display = "block";
})

closeOpen.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
});


