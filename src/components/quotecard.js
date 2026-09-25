import React from "react";

const QuoteCard = ({ quote }) => {
  if (!quote) return null;

  return (
    <div style={{ fontSize: "18px", margin: 0 }}>
      "{quote.content}"
      <footer style={{ marginTop: "10px", fontWeight: "bold"}}>
        — {quote.author}
      </footer>
    </div>
  );
};

export default QuoteCard;