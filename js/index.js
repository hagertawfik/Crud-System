
// decleration
var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDescrption = document.getElementById("ProductDescrption");
var addproductbtn = document.getElementById("addproduct");
var clearformbtn = document.getElementById("clearform");
var ProductNamevailddiv = document.getElementById("ProductNamevaild");
var ProductPricevailddiv = document.getElementById("ProductPricevaild");
var ProductDescrptionvailddiv = document.getElementById("ProductDescrptionvaild");
var addEditbtn = document.getElementById("addEdit");
var searchin = document.getElementById("searchin");
var productList = [] ;
//vailidation

function isvaildname(){
    var vaildname = /^[A-Z][a-z]{2,10}[1-9]?$/
     if (vaildname.test(ProductName.value) == true) {
        ProductName.classList.add("is-valid");
        ProductName.classList.remove("is-invalid");
        ProductNamevailddiv.classList.replace("d-block","d-none");
        return true
     }else{
        ProductName.classList.add("is-invalid");
        ProductName.classList.remove("is-valid");
        ProductNamevailddiv.classList.replace("d-none","d-block");
        return false 
     }
}
function isvaildprice(){
    var vaildprice = /^[1-9][0-9]{2,5}$/
     if (vaildprice.test(ProductPrice.value) == true) {
        ProductPrice.classList.add("is-valid");
        ProductPrice.classList.remove("is-invalid");
        ProductPricevailddiv.classList.replace("d-block","d-none");
        return true
     }else{
        ProductPrice.classList.add("is-invalid");
        ProductPrice.classList.remove("is-valid");
        ProductPricevailddiv.classList.replace("d-none","d-block");
        return false 
     }
}
function isvailddesc(){
    var vaildsdesc = /^(.|\s)*[a-zA-Z]+(.|\s)*$/
     if (vaildsdesc.test(ProductDescrption.value) == true) {
        ProductDescrption.classList.add("is-valid");
        ProductDescrption.classList.remove("is-invalid");
        ProductDescrptionvailddiv.classList.replace("d-block","d-none");
        return true
     }else{
        ProductDescrption.classList.add("is-invalid");
        ProductDescrption.classList.remove("is-valid");
        ProductDescrptionvailddiv.classList.replace("d-none","d-block");
        return false 
     }
}
ProductName.addEventListener("blur",isvaildname);
ProductPrice.addEventListener("blur",isvaildprice);
ProductDescrption.addEventListener("blur",isvailddesc);


// check local storage
if(localStorage.getItem("productList") == null){
    productList = [];

}else{
    productList = JSON.parse(localStorage.getItem("productList")) ;
    displayproduct();
}
function addproductfun() {
    if(isvaildname() == true && isvaildprice() == true && isvailddesc()== true){
        var product = {
            name : ProductName.value,
            price:  ProductPrice.value,
            category : ProductCategory.value,
            desc :  ProductDescrption.value
        }
        productList.push(product);
        console.log(productList);
        localStorage.setItem("productList",JSON.stringify(productList));
        displayproduct();
    }
   
}

addproductbtn.addEventListener("click", function(){
    addproductfun(); 
})

function clearForm() {
    ProductName.value = ""; 
    ProductPrice.value = ""; 
    ProductCategory.value = ""; 
    ProductDescrption.value = ""; 
 
}
clearformbtn.addEventListener("click", function(){
    clearForm()
})

function displayproduct() {
    var temp  = "";
    for (var i = 0; i < productList.length; i++) {
        temp += `
        <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td>
            <button id="updatebtn" type="button" class="btn btn-outline-info " onclick = "updateprodct(${i})">update</button>
        </td>
        <td>
            <button id="deletbtn" type="button" class="btn btn-outline-danger " onclick = "deleterecord(${i})">delete</button>
        </td>
        
                </tr>
        `
        
    }
   
    document.getElementById("tablebody").innerHTML = temp;
}

function deleterecord(index){
    productList.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productList));
    displayproduct();

}
var currentindex ;
function updateprodct(ind) {
    currentindex = ind;
    ProductName.value = productList[ind].name; 
    ProductPrice.value =  productList[ind].price; 
    ProductCategory.value = productList[ind].category; 
    ProductDescrption.value =productList[ind].desc; 
    addEditbtn.classList.replace("d-none","d-inline-block");
    addproductbtn.classList.replace("d-inline-block","d-none");
}
addEditbtn.addEventListener("click",function () {
    addedit();
})
function addedit() {
    console.log(currentindex);
    if(isvaildname() == true && isvaildprice() == true && isvailddesc()== true){
      productList[currentindex].name =ProductName.value; 
      productList[currentindex].price =  ProductPrice.value; 
      productList[currentindex].category = ProductCategory.value; 
    productList[currentindex].desc =  ProductDescrption.value; 
    localStorage.setItem("productList",JSON.stringify(productList));
    displayproduct();
    addEditbtn.classList.replace("d-inline-block","d-none");
    addproductbtn.classList.replace("d-none","d-inline-block");
    clearForm();
}
}
searchin.addEventListener("keyup",function () {
    searchInform()
})
function searchInform() {
    var temp  = "";
    for (var i = 0; i < productList.length; i++) {
        if(productList[i].name.toLowerCase().includes(searchin.value.toLowerCase()) == true){
        temp += `
        <tr>
        <td>${i}</td>
        <td>`+productList[i].name.toLowerCase().replace(searchin.value,"<span class='text-danger'>"+searchin.value+"</span>")+`</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td>
            <button id="updatebtn" type="button" class="btn btn-outline-info " onclick = "updateprodct(${i})">update</button>
        </td>
        <td>
            <button id="deletbtn" type="button" class="btn btn-outline-danger " onclick = "deleterecord(${i})">delete</button>
        </td>
        
                </tr>
        `
        } 
    }
   
    document.getElementById("tablebody").innerHTML = temp;
}