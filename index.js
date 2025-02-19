import {menuArray} from '/data.js'

const cardDetailsForm = document.getElementById('card-details-form')
const thankYouMessage = document.getElementById('thank-you-message')
let amountOrdered = 0
let totalPrice = 0

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        handleAddButton(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        handleRemoveButton(e.target.dataset.remove)
    }
    else if (e.target.id === 'complete-order-btn') {
        handleCompleteOrderBtn()
    }
})

cardDetailsForm.addEventListener('submit', function(e) {
    e.preventDefault()
    handlePayBtn()
})


function handleAddButton(menuId) {
    thankYouMessage.style.display = 'none'
    const matchedItem = menuArray.filter(function(menu) {
        return menu.id == menuId
    })[0]
    matchedItem.amount++
    amountOrdered++
    totalPrice += matchedItem.price
    renderSummary(menuArray)
}

function handleRemoveButton(menuId) {
    const matchedItem = menuArray.filter(function(menu) {
        return menu.id == menuId
    })[0]
    matchedItem.amount--
    amountOrdered--
    totalPrice -= matchedItem.price
    renderSummary(menuArray)
}

function handleCompleteOrderBtn() {
    const paymentModal = document.getElementById('payment-modal')
    paymentModal.style.display = 'flex'
}

function handlePayBtn() {
    const paymentModal = document.getElementById('payment-modal')
    const cardDetailsFormData = new FormData(cardDetailsForm)
    const fullName = cardDetailsFormData.get('cardName')
    document.getElementById('card-name').value = ''
    document.getElementById('card-number').value = ''
    document.getElementById('card-cvv').value = ''

    paymentModal.style.display = 'none'

    resetOrder(menuArray)
    renderSummary(menuArray)

    thankYouMessage.style.display = 'flex'
    thankYouMessage.innerHTML = `Thank you, ${fullName}! Your order is on its way!`
}

function renderMenu(array) {
    const menuContainer = document.getElementById('menu-container')
    const HtmlString = array.map(function(menuItem) {
        return `<div class="menu-item-container">
                <p class="item-emoji">${menuItem.emoji}</p>
                <div class="item-column">
                    <h3 class="item-title">${menuItem.name}</h3>
                    <p class="item-ingredients">${menuItem.ingredients}</p>
                    <p class="item-price">$${menuItem.price}</p>
                </div>
                <button id="add-pizza-btn" class="add-item-btn" data-add="${menuItem.id}">
                    +
                </button>
                </div>
                `
    }).join('')
    menuContainer.innerHTML = HtmlString
}

function renderSummary(array) {
    const orderSummary = document.getElementById('order-summary')
    const orderSummaryItemsContainer = document.getElementById('order-summary-items-container')
    if (amountOrdered > 0) {
        orderSummary.style.display = 'flex'
        const HtmlString = array.map(function(menuItem) {
            if (menuItem.amount > 0) {
                return  `<div class="order-summary-item">
                            <h3>${menuItem.name}</h3>
                            <button class="removeBtn" data-remove="${menuItem.id}">remove</button>
                            <p class="order-summary-price">$${menuItem.amount * menuItem.price}</p>
                        </div>
                        `
            }
            
        })
        HtmlString.push(
            `<div class="total-price-container">
                <h2>Total price:</h2>
                <p>$${totalPrice}</p>
            </div>`
        )
        orderSummaryItemsContainer.innerHTML = HtmlString.join('')
    } else {
        orderSummary.style.display = 'none'
        orderSummaryItemsContainer.innerHTML = ''
    }
    
    
    
}

function resetOrder (menuArray) {
    menuArray.forEach(function(menu) {
        menu.amount = 0
    })
    amountOrdered = 0
    totalPrice = 0
}

renderMenu(menuArray)