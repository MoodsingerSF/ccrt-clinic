import { useEffect, useState } from "react";
import { retrieveDonationRequests } from "../controllers/DonationRequestController";

const useDonationRequests = (page, limit, requestStatus, completionStatus) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieve = async (page, limit, requestStatus, completionStatus) => {
    try {
      setLoading(true);
      const data = await retrieveDonationRequests(
        page,
        limit,
        requestStatus,
        completionStatus
      );
      if (data.length < limit || data.length === 0) {
        setHasMore(false);
      }
      if (page === 0) setData(data);
      else setData((prev) => [...prev, ...data]);

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 0) setData([]);
    retrieve(page, limit, requestStatus, completionStatus);
  }, [page, limit, requestStatus, completionStatus]);
  return { data, loading, hasMore, error };
};

export default useDonationRequests;
