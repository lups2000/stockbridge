const Ratings = (rating: number, onClick?: (rating: number) => void) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={onClick ? () => onClick(star) : () => {}}
          style={{ cursor: 'pointer', color: star <= rating ? 'red' : 'gray' }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export { Ratings };
