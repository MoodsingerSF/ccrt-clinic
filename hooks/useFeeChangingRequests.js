import { useEffect, useState } from "react";
import { retrieveFeeChangingRequests } from "../controllers/UserController";

const useFeeChangingRequests = (page, limit, status) => {
  const [feeChangingRequests, setFeeChangingRequests] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieve = async (page, date, status) => {
    try {
      setLoading(true);
      // if (page === 0) {
      //   setFeeChangingRequests([]);
      // }
      const data = await retrieveFeeChangingRequests(page, limit, status);
      // console.log(data);
      if (data.length <= limit || data.length === 0) {
        setHasMore(false);
      }
      if (page === 0) setFeeChangingRequests(data);
      else setFeeChangingRequests((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieve(page, limit, status);
  }, [page, limit, status]);
  return { feeChangingRequests, loading, hasMore, error };
};

export default useFeeChangingRequests;
