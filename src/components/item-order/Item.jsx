import {BiCartAdd} from 'react-icons/bi'

import { useState } from 'react'

import './item.scss'

const Item = ({itemName, srcImage, description, price, onClick, deleteAction, amount, addFunction, subtractFunction}) => {

  const [quantity, setQuantity] = useState(1)

  function addQuantity(){
    setQuantity(quantity + 1)
  }

  function subtractQuantity(){
    if(quantity == 1){
      return
    }

    setQuantity(quantity - 1)
  }

  return (
    <div className="item">
        <div className="img" style={{backgroundImage: `url(${srcImage})` }}></div>
        
        <section>
          <h3 className='title'>{itemName}</h3>
          <p className='icon'>{deleteAction}</p>
          <p className='description'>{description}</p>
          <p className="price">R$ {price}</p>

          <section className="amount-container">
            <p>Quantidade:</p>
            <div className='amount-buttons'>
              <button onClick={subtractFunction ? subtractFunction : subtractQuantity}>-</button>
              <div className="amount">{amount ? amount : quantity}</div>
              <button onClick={addFunction ? addFunction : addQuantity}>+</button>
            </div>
          </section>
            <div className="add-container"><button onClick={() => onClick(itemName, price, quantity)}><BiCartAdd/>Adicionar ao carrinho</button></div>
        </section>

    </div>
  )
}

export default Item