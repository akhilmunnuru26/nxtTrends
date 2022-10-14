import './index.css'

const SimilarProductItem = props => {
  const {similarProducts} = props
  const {imageUrl} = similarProducts

  return (
    <li>
      <img src={imageUrl} alt="1" />
    </li>
  )
}
export default SimilarProductItem
