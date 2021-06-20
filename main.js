// new the drinkPos Instance
const drinkPos = new DrinkPos()

const addDrinkBtn = document.querySelector('[data-drink-pos="add-drink"]')
const orderList = document.querySelector('[data-order-lists]')

addDrinkBtn.addEventListener('click', function addTheDrinkToList(e) {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = drinkPos.getCheckedValue('drink')
  const sugar = drinkPos.getCheckedValue('sugar')
  const ice = drinkPos.getCheckedValue('ice')
  // console.log(`${drinkName}, ${sugar}, ${ice}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)

  // 4. 將飲料實例產生成左側訂單區的畫面
  drinkPos.addDrink(drink)
})

orderList.addEventListener('click', function deleteOrderList(event) {
  const isDeleteBtn = event.target.matches('[data-drink-pos="delete-drink"]')
  if (!isDeleteBtn) {
    return
  }
  drinkPos.removeList(event.target.parentElement.parentElement.parentElement)
})

function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

function DrinkPos() { }
DrinkPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(option => {
    if (option.checked) {
      selectedOption = option.value
    }
  })
  return selectedOption
}


DrinkPos.prototype.addDrink = function (drink) {
  let orderCardHTML = `
    <div class="card mb-3">
      <div class="card-body pt-3 pr-3">
        <div class="text-right">
          <span data-drink-pos="delete-drink">×</span>
        </div>
        <h6 class="card-title mb-1">${drink.name}</h6>
        <div class="card-text">${drink.ice}</div>
        <div class="card-text">${drink.sugar}</div>
      </div>
      <div class="card-footer text-right py-2">
        <div class="card-text text-muted">
          $ <span data-drink-price>${drink.price()}</span>
        </div>
      </div>
    </div>
  `
  orderList.insertAdjacentHTML('afterbegin', orderCardHTML)
}

DrinkPos.prototype.removeList = function (target) {
  target.remove()
}