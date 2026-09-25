import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRandomQuote } from "../slices/quoteslice";
import QuoteCard from "../components/quotecard";
import LoadingSpinner from "../components/loadingspinner";
import ErrorMessage from "../components/errormessage";

const Quotes = () => {
  const dispatch = useDispatch();
  const { currentQuote, loading, error } = useSelector((state) => state.quotes);

  useEffect(() => {
    dispatch(getRandomQuote());
  }, [dispatch]);

  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <h2>Quote</h2>

      <div className="card">
        {loading && <LoadingSpinner />}
        <ErrorMessage message={error} />
        {!loading && !error && <QuoteCard quote={currentQuote} />}
      </div>

      <button className="btn" onClick={() => dispatch(getRandomQuote())} disabled={loading}>
        {loading ? "Loading..." : "New Quote"}
      </button>
    </div>
  );
};

export default Quotes;