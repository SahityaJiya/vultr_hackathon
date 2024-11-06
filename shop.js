let cartCount = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        document.querySelector('.cart a').textContent = `Cart (${cartCount})`;
    });
});



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const card = `<!-- =========================card===============================
-->

  <div class="product-card">
    <div class="category">Baby Products</div>
    <img src="./image/b1.jpg" alt="Product 1" />
    <div>
      <h2>Teddy Bear</h3>
        <div class="rating">
          <img src="./svg/star.svg" alt="">
          <img src="./svg/star.svg" alt="">
          <img src="./svg/star.svg" alt="">
          <img src="./svg/star.svg" alt="">
          <img src="./svg/star-half.svg" alt="">
        </div>

        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, placeat?</div>


        <p class="price">₹ 190.99 <span class="strike-rate">₹ 990.99</span></p>
        <p>Total Stocks Available: <span class="stocks">20</span></p>
        <p class="selected-quantity">Quantity(Pieces) <span class="plus">+</span><span>1</span><span
            class="minus">-</span>
        </p>


        <button class="add-to-cart">
          <img src="./svg/add_shopping_cart_28dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="logo" />
          <span> Add to Cart</span>
        </button>
    </div>

  </div>

  <!-- ++++++++++++++++++++++++++++++++++++++++++++++card finished++++++++++++++++++++++++ -->
`;
const carousel = ` <div class="carousel">
    <img src="./svg/arrow_back_ios_48dp_BLACK_FILL0_wght400_GRAD0_opsz48.svg" class="prev"alt="">
    <img src="./svg/arrow_forward_ios_48dp_BLACK_FILL0_wght400_GRAD0_opsz48.svg" class="next" alt="">
</div>`

//------------------------------small carousel story begins here------------------------------------------------

const smallCard = `  <div class="product-card">
      <img src="./image/b1.jpg" alt="Product 1" />
      <h3>Product 1</h3>
      <p>$19.99</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
    <div class="product-card">
      <img src="./image/b2.jpg" alt="Product 2" />
      <h3>Product 2</h3>
      <p>$29.99</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>`;
const smallCarousel = `<section class="product-grid" style="background-color:#813232"></section>`

//-------------------constants  made------------------------------------------------

for(i=0; i<3;i++){
    document.querySelector(".carousel-parent").insertAdjacentHTML("beforeend",smallCarousel); //small ones
    document.querySelector(".carousel-parent").insertAdjacentHTML("beforeend",smallCarousel); //small ones
    document.querySelector(".carousel-parent").insertAdjacentHTML("beforeend",smallCarousel); //small ones
document.querySelector(".carousel-parent").insertAdjacentHTML("beforeend",carousel);  //large ones
}

document.querySelectorAll(".carousel").forEach(item=>{
    for(i=0; i<12;i++){
        item.insertAdjacentHTML("beforeend",card); //large cards
    }
})


//------------------------------carousel story ends here------------------------------------------------


document.querySelectorAll("section").forEach(item=>{
            for(i=0; i<12;i++){
            item.insertAdjacentHTML("beforeend",smallCard);    //small cards
            }
        })

//------------------------------carousel story ends here------------------------------------------------