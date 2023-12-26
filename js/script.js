let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec => {

      let top = window.scrollY;
      let height = sec.offsetHeight;
      let offset = sec.offsetTop - 150;
      let id = sec.getAttribute('id');

      if(top >= offset && top < offset + height){
        navLinks.forEach(links =>{
          links.classList.remove('active');
          document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
        });
      };

    })
}

document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
  });

  var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });

  function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }

  function fadeOut(){
    setInterval(loader, 3000);
  }

  let iconCart = document.querySelector('.icon-cart');
  let body = document.querySelector('body');
  let container = document.querySelector('.container');
  let closeCart = document.querySelector('.close');
  let listProductHTML = document.querySelector('.listProduct');
  let listCartHTML = document.querySelector('.listCart');
  let iconCartSpan = document.querySelector('.icon-cart span');

  let listProducts = [];
  let carts = [];

  iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
    container.style.width = "900px";
    container.style.maxWidth = "900vw";
    container.style.margin = "auto";
    container.style.textAlign = "center";
    container.style.paddingTop = "10px";
  })

  closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
    container.style.width = null;
    container.style.maxWidth = null;
    container.style.margin = null;
    container.style.textAlign = null;
    container.style.paddingTop = null;
  })

  const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
      listProducts.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button class="addCart">
              Add to Cart
            </button>  
            `;
            listProductHTML.appendChild(newProduct);
      })
    }
  }

  listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
      let product_id = positionClick.parentElement.dataset.id;
      addToCart(product_id);
    }
  })

  const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
      carts = [{
        product_id: product_id,
        quantity: 1
      }]
    }else if(positionThisProductInCart < 0){
      carts.push({
        product_id: product_id,
        quantity: 1
      });
    }else{
      carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
  }

  const addCartToHTML = () =>{
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
      carts.forEach(cart => {
        totalQuantity = totalQuantity + cart.quantity;
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
        let info = listProducts[positionProduct];
        newCart.innerHTML = `
        <div class="image">
          <img src="${info.image}" alt="">
          </div>
          <div class="name">
          ${info.name}
          </div>
          <div class="totalPrice">
          ${info.price * cart.quantity}
          </div>
          <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>`;
          listCartHTML.appendChild(newCart);
      })
    }
    iconCartHTML.appendChild(newCart);
  }

  const initApp = () => {
    //get data from json
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
      listProducts = data;
      addDataToHTML();
    })
  }

  initApp();

  window.onload = fadeOut;