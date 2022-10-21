import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {productDetails: '', productQuantity: 1}

  componentDidMount() {
    this.getProductItemDetails()
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({
      productQuantity: prevState.productQuantity + 1,
    }))
  }

  onDecrementQuantity = () => {
    const {productQuantity} = this.state
    if (productQuantity > 1) {
      this.setState(prevState => ({
        productQuantity: prevState.productQuantity - 1,
      }))
    }
  }

  renderSimilarProductItem = () => {
    const {productDetails} = this.state
    const {similarProducts} = productDetails
    const formattedSimilarProducts = similarProducts.map(eachItem => ({
      availability: eachItem.availability,
      brand: eachItem.brand,
      description: eachItem.description,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      price: eachItem.price,
      rating: eachItem.rating,
      style: eachItem.style,
      title: eachItem.title,
      totalReviews: eachItem.total_reviews,
    }))
    console.log(formattedSimilarProducts)
    //

    return (
      <div className="similar-product-card">
        <h1 className="similar-product-heading">Similar Products</h1>
        <ul className="similar-product-list-container">
          {formattedSimilarProducts.map(item => (
            <SimilarProductItem>{item}</SimilarProductItem>
          ))}
        </ul>
      </div>
    )
  }

  renderProductItemDetails = () => {
    const {productDetails} = this.state
    const {
      imageUrl,
      title,
      price,
      availability,
      brand,
      description,
      rating,
      totalReviews,
    } = productDetails
    const {productQuantity} = this.state

    return (
      <div className="product-details-section">
        <div>
          <img src={imageUrl} alt="product" className="product-image" />
        </div>
        <div>
          <h1 className="product-title">{title}</h1>
          <h1 className="product-price">Rs {price}/-</h1>
          <div className="rating-reviews-section">
            <div className="rating-section">
              <p className="rating-number">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="stars-image"
              />
            </div>
            <p className="product-reviews">{totalReviews} Reviews</p>
          </div>
          <p className="product-description">{description}</p>
          <p className="product-availability">
            Available: <span className="span-element">{availability}</span>
          </p>
          <p className="product-availability">
            Brand: <span className="span-element">{brand}</span>
          </p>
          <hr className="line" />
          <div className="quantity-section">
            <button
              className="minus-buttons"
              type="button"
              onClick={this.onDecrementQuantity}
            >
              <BsDashSquare className="plus-minus-icons" />
            </button>
            <p className="quality-number">{productQuantity}</p>
            <button
              className="plus-buttons"
              type="button"
              onClick={this.onIncrementQuantity}
            >
              <BsPlusSquare className="plus-minus-icons" />
            </button>
          </div>
          <button type="button" className="add-to-cart-btn">
            ADD TO CART
          </button>
        </div>
        {this.renderSimilarProductItem()}
      </div>
    )
  }

  getProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const productApiUrl = `https://apis.ccbp.in/products/${id}/`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(productApiUrl, options)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const fetchedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        style: data.style,
        price: data.price,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        rating: data.rating,
        similarProducts: data.similar_products,
        totalReviews: data.total_reviews,
      }

      this.setState({productDetails: fetchedData})
    }
  }

  render() {
    return this.renderProductItemDetails()
  }
}

export default ProductItemDetails
