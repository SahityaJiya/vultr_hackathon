//++++++++++++++++++++++++++++++ sort by select begin+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const sortBySelect = document.querySelector(".sort-by-select > select");

async function fetchData() {
    const response = await fetch(`./real1.json`);
    const Data = await response.json();

    // Insert options after data has been fetched
    Data.list.forEach(item => {
        let categoryTitle = `<option value="">${item.key}</option>`;
        sortBySelect.insertAdjacentHTML('beforeend', categoryTitle);
    });

    //Insert filter after data has been fetched
    Data.filter.forEach(item => {
        let categoryTitle = `<hr/><div class="filter-by"><h3>${item.key}</h3>
        <button id="${item.key}clearButton" class="clearButton">Clear</button>
        <img src="./svg/arrow_forward_ios_28dp_BLACK_FILL0_wght400_GRAD0_opsz24.svg" alt="arrow"></div>
        <div id="${item.key}-subContainer" class="sub-categories-container"></div>`
        document.querySelector(".filter").insertAdjacentHTML('beforeend', categoryTitle);


        item.key2.forEach(item2 => {
            let categoryTitle2 = `<div class="sub-categories ${item.key}"><input type="checkbox" name="${item.key}" value="${item2.key}" id="">${item2.key} (15)</div>`
            document.querySelector(`#${item.key}-subContainer`).insertAdjacentHTML('beforeend', categoryTitle2);

        })


        //clear button event listener add
        document.querySelector(`#${item.key}clearButton`).addEventListener("click", () => {
            //-------------checkbox uncheck----------------
            document.querySelectorAll(`.${item.key} > input`).forEach(item => {
                item.checked = false;
            })
            //--------------------------------div remove-------------------------------------

            document.querySelectorAll(".category-choices-left div").forEach(item3 =>{
                var a = item3.querySelector("h5")
                  if (a.innerHTML==`${item.key}`){
                a.parentNode.remove();
                }
                
                
                })
                

        });


    });

    //checkbox event listener add

    document.querySelectorAll(".sub-categories > input").forEach(item => {
        item.addEventListener("click", () => {
            let names = item.getAttribute("name");
            let value = item.getAttribute("value");


            let html = `<div><h5>${names}</h5> :<span>${value}</span> <img src="./svg/close_24dp_BLACK_FILL0_wght400_GRAD0_opsz24.svg" alt="cross"></div>`;
            if (item.checked) {
                document.querySelector(".category-choices-left").insertAdjacentHTML(`beforeend`, html); //created element in div

                //adding newly created element with event listeners
                document.querySelectorAll(".category-choices-left div img").forEach(item4 => {
                    item4.addEventListener("click", () => {
                        let checkboxName = item4.parentNode.querySelector("h5").innerText; 
                        let checkboxValue = item4.parentNode.querySelector("span").innerText;
                
                      
                        document.querySelectorAll(`.${checkboxName} input[type='checkbox']`).forEach(item5 => {  
                            
                            
                
                            if (item5.value == checkboxValue) { 
                                item5.checked = false;
                                alert("Checkbox unchecked");
                            }
                        });
                
                        item4.parentNode.remove(); // Remove the parent element of the image
                    });
                });
                
               
            }
            else {
                document.querySelector(".category-choices-left").innerHTML =
                    document.querySelector(".category-choices-left").innerHTML.replaceAll(html, "");
            }
        });
    })

    
}

// Call fetchData to initiate the fetch and rendering
fetchData();


//-------------------------------sort by select finished---------------------------------------------------------
//++++++++++++++++++++++++++++++ pincode data fetch begin+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function pinCodeFetch() {
    let pinCode = document.querySelector(".pin-verify-input > input").value;
    const response = await fetch(`./pinCode.json`);
    let data = await response.json();

    let found = false;
    data.Sheet1.forEach(item => {
        if (item.Pincode == pinCode) {
            document.querySelector(".pin-verify").style.display = "none";
            document.querySelector(".pin-verified").style.display = "block";

            let pinVerifiedHTML = `<span>DELIVER TO PINCODE ${pinCode}</span>
             <img src="./svg/edit_28dp_BLACK_FILL0_wght400_GRAD0_opsz24.svg" alt="edit-icon" title="Edit">
            
            <p>Locality : ${item.PostOfficeName} </p> 
            <p>District : ${item.City} </p> 
          
            <p>State : ${item.State}</p>
           `
            document.querySelector(".pin-verified").innerHTML = pinVerifiedHTML;
            found = true;

            document.querySelector(".pin-verified > img").addEventListener("click", () => {
                document.querySelector(".pin-verify").style.display = "block";
                document.querySelector(".pin-verified").style.display = "none";
            })
        }
    });

    if (!found) {
        document.querySelector(".pin-rejected").style.display = "flex";
    }
}

// clicking CHECK or Pressing Enter key will trigger the function
document.querySelector(".checkPinCode").addEventListener("click", pinCodeFetch);
document.querySelector(".pin-verify-input > input").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        pinCodeFetch();
    }
});
//end of clicking CHECK or Pressing Enter key will trigger the function


//-------------------------------pincode data fetch finished---------------------------------------------------------


// div clear button task here is being performed
document.querySelector(".category-choices-right button").addEventListener("click",()=>{
document.querySelector(".category-choices-left").innerHTML = `<div>
<h5>SUBCATEGORIES</h5> :Baby Diapers <img src="./svg/close_24dp_BLACK_FILL0_wght400_GRAD0_opsz24.svg"
  alt="cross">
</div>`;





})













//--------------carousel job-----------------


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
const smallCarousel = `<section class="product-grid" style="background-color:#0cf7d7"></section>`

//-------------------constants  made------------------------------------------------

for(i=0; i<2;i++){
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