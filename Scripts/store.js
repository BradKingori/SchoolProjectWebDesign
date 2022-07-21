if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded',ready)
}
	else{
		ready()
	}
function ready(){
	var removecaritembutton = document.getElementsByClassName("btn-danger")
	console.log(removecaritembutton)
	for (var i = 0; i<removecaritembutton; i++ ){
		var button= removecaritembutton[i]
		button.addEventListener('click',removeCartItem)
	}
	
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for (var i = 0; i<quantityInputs.length; i++ ){
		var input = quantityInputs[i]
		input.addEventListener('change',quantityChanged)
		
	}
	
	var addtocartbuttons= document.getElementsByClassName('shop-item-button')
	for (var i = 0; i<addtocartbuttons.length; i++ ){
	var button = addtocartbuttons[i]
	button.addEventListener('click',addToCartClicked)
		
	}
	
	
	document.getElementsByClassName('button-purchase').addEventListener('click',purchaseClicked)
		
	
}
function purchaseClicked(event){
	alert("Thank you for your purchase")
	var cartItems = document.getElementsByClassName('cart-items')[0]
	
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
	}
	
	updateCartTotal()
}

function addToCartClicked(event){
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText	
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
	console.log(title,price,imageSrc)
	addItemToCart(title,price,imageSrc)
	updateCartTotal()
}


function addItemToCar(title,price,imageSrc){
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	
	for (i=0; i<cartItemNames.length; i++){
		if(cartItems[i].innerText == title){
			alert("This iem is alreeady added to the cart")
			return
		}
	}
	var cartRowContents =`
	<div class="cart-item cart-column">
			<img class="cart-item-image" src="${imageSrc}" "width="100"
					height ="100">
			<span class="cart-item-title">${title}</span>
	</div>
	<span class="cart-price cart-column">${price}</span>
	<div class="cart-quantity cart-column">
		<input class="cart-quantity-input" type="number" "value="1">
		<button class="btn btn-danger" type="button">remove</button>
	</div>`
	cartRow.innerHTML= cartRowContents	
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}


function quantityChanged(event){
	var input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value =1
	}
	updateCartTotal()
}
function removeCartItem(event){
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}
function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName('cart-items'[0])	
	var cartRows =	cartItemContainer.getElementsByClassName('cart-row')
	
	var total = 0
	for (var i = 0; i<cartRows; i++ ){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quatityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace("$",''))
		var quantity= quatityElement.value
		total = total + (price*quantity)
	}
	total = Math.round(total*100)/100
	document.getElementsByClassName('cart-total-price')[0].innerText = "$" + total
}
