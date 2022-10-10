import { useEffect, useState } from "react";
import { retrieveAllDonor } from "../controllers/DonationRequestController";

const useAllDonors = (page, limit, requestId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const allDonation = async (page, limit, requestId) => {
    try {
      setLoading(true);
      const data = await retrieveAllDonor(page, limit, requestId);
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
    allDonation(page, limit, requestId);
  }, [page, limit, requestId]);
  return { data, loading, hasMore, error };
};

export default useAllDonors;
