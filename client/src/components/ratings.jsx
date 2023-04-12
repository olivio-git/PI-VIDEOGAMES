const RatingsStarts = (props) => {
    const rating = props.rating; //4.6   :5 1=si 2=si 3=si 4=si
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star-empty">★</span>);
      }
    }
    return <div>{stars}</div>;
}
 
export default RatingsStarts;