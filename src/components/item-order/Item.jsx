import './item.scss'

const Item = ({itemName, srcImage, description, price, onClick, deleteAction}) => {

  return (
    <button onClick={onClick} className="item">
        <img src={srcImage}/>
        <section>
          <h3>{itemName}</h3>
          <p>{description}</p>
          <p>R$ {price}</p>
        </section>
        {deleteAction}
    </button>
  )
}

export default Item