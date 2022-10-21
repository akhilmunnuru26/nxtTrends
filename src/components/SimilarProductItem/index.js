import './index.css'

const SimilarProductItem = props => {
  const {children} = props
  console.log(children)

  return (
    <li key={children.id} className="similar-product-item">
      <img
        className="similar-products-img"
        src={children.imageUrl}
        alt={children.title}
      />
      <p className="similar-product-title">{children.title}</p>
      <p className="similar-product-brand">by {children.brand}</p>
      <div className="similar-product-price-rating-container">
        <p className="similar-product-price">Rs {children.price}/-</p>
        <div className="similar-product-rating-section">
          <p className="similar-product-rating-number">{children.rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/reacchildrent-js/star-img.png"
            alt="star"
            className="stars-image"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
