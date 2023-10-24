import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './item.scss'

import { } from '../../variables/Itens'

const Item = ({itemName, srcImage, description, price, onClick, deleteAction}) => {
  
  const [quantity, setQuantity] = useState(1)

  const {currentQuantity} = useSelector(rootReducer => rootReducer.quantityReducer)
  const dispatch = useDispatch()

  function addQuantity(){
    setQuantity(quantity+1)
  }

  function subtractQuantity(){
    if(quantity == 1){
      return
    }

    setQuantity(quantity - 1)
  }

  return (
    <div className="item">
        <img src={srcImage}/>
        <section>
          <section className="header">
            <h3>{itemName}</h3>
            {deleteAction}
          </section>
          <p>{description}</p>

          <section className="amount-container">
            <p>R$ {price}</p>
          
            <aside className='amount-buttons'>
              <p>Quantidade: </p>
              <button onClick={subtractQuantity}>-</button>
              <div className='amount'>{quantity}</div>
              <button onClick={addQuantity}>+</button>
            </aside>
          </section>

          <div className="add-container"><button onClick={() => onClick(itemName, price, quantity)}>Adicionar ao carrinho</button></div>
        </section>
    </div>
  )
}

export default Item