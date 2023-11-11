import '../styles/cart.scss'

import {useState, useEffect} from 'react'
import {BiCartAdd, BiTrash} from 'react-icons/bi'

import Item from '../components/item-order/Item'

import { itens } from '../variables/Itens'
const Cart = () => {

  const [cartData, setCartData] = useState([])
  const [cart, setCart] = useState([])
  const [cost, setCost] = useState()
  const items = []

  useEffect(() => {
    fetch('http://localhost:5000/carts/1', {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCartData(data)
      setCart(data.items)
      setCost(data.totalCost)

    })
    .catch((err) => console.log(err))
  },[])

  for(var i = 0; i <= cart.length -1; i++){
    items.push(cart[i].item)
  }

  function getImage(itemName) {

    var imgSrc = ''

    itens.batatas.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.tábuas.forEach((el) => {
      if(el.name === itemName){
        imgSrc = el.img
      }
    })

    itens.hamburgueres.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.drinks.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.bebidas.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.sucos.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    itens.sobremesas.forEach((el, i) => {
      if(el.name === itemName ){
        imgSrc = el.img
      }
    })

    return imgSrc
  }

  function getPrice(itemName){
    var price = 0

    itens.batatas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.tábuas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.hamburgueres.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.drinks.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.bebidas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.sucos.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    itens.sobremesas.forEach((el) => {
      if(el.name === itemName){
        price = el.price
      }
    })

    return price
  }

  function getDescription(itemName){
    var description = ''

    itens.batatas.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })

    itens.tábuas.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })
    
    itens.hamburgueres.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })

    itens.drinks.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })

    itens.bebidas.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })

    itens.sucos.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })

    itens.sobremesas.forEach((el) => {
      if(el.name === itemName){
        description = el.description
      }
    })

    return description
  }

  function deleteItem(item, price){
    cartData.items.forEach((e) => {
      if(e.item == item){
        let index = cartData.items.findIndex(i => i === e)
        let quantity = cartData.items[index].quantity

        cartData.items.splice(index, 1)
        cartData.totalCost -= quantity * price
      }
    })
    
    fetch('http://localhost:5000/carts/1', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(cartData)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCartData(data)
      setCart(data.items)
      setCost(data.totalCost)
    })
    .catch((err) => console.log(err))
  }

  function setAmount(iten){
    var amount = 10
    cartData.items.forEach((e) => {
      if(e.item === iten){
        amount = e.quantity
      }
    })

    return amount
  }

  function addItem(item, price){
    cartData.items.forEach((e) => {
      if(e.item == item){
        let index = cartData.items.findIndex(i => i === e)

        cartData.items[index].quantity += 1
        cartData.totalCost += price
      }

      fetch('http://localhost:5000/carts/1', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(cartData)
      })
      .then((resp) => resp.json())
      .then((data) => {
        setCartData(data)
        setCart(data.items)
        setCost(data.totalCost)
      })
    })
  }

  function subtractItem(item, price){
    cartData.items.forEach((e) => {
      if(e.item == item){
        let index = cartData.items.findIndex(i => i === e)
        if(cartData.items[index].quantity == 1){
          return
        }
        cartData.items[index].quantity -= 1
        cartData.totalCost -= price
      }

      fetch('http://localhost:5000/carts/1', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(cartData)
      })
      .then((resp) => resp.json())
      .then((data) => {
        setCartData(data)
        setCart(data.items)
        setCost(data.totalCost)
      })
    })
  }

  return (
    <div className='cart'>
      <section className="items-container">
        {items.length > 0 ? items.map((iten) => <Item itemName={iten}
        srcImage={getImage(iten)}
        description={getDescription(iten)}
        price={getPrice(iten)}
        amount={setAmount(iten)}
        addFunction={() => addItem(iten, getPrice(iten))}
        subtractFunction={() => subtractItem(iten, getPrice(iten))}
        deleteAction={<BiTrash onClick={() => deleteItem(iten, getPrice(iten))}/>}
        />) : <h1>Carrinho Vazio</h1>}
        </section>

        <section className='actions'>
        <a href="/">
          <BiCartAdd className='add'/>
        </a>
        </section>

      <section className='cart-footer'>
        <h3>Total do pedido: R$ {cost}</h3>
        <button>Realizar Pedido</button>
      </section>
    </div>
  )
}

export default Cart