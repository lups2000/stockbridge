const Ratings = (rating: number) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width: "60%",
    }}>
      {
        stars.map((star) => (
          <div style={{ color: star <= rating ? "red" : "gray" }}>&#9733;</div>
        ))}
    </div>
  );
};

export { Ratings };
