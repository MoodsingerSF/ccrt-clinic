import { useEffect, useState } from "react";
import { retrieveAllDonation } from "../controllers/DonationRequestController";

const useDonations = (page, limit) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const allDonation = async (page, limit) => {
    try {
      setLoading(true);
      const data = await retrieveAllDonation(page, limit);
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
    allDonation(page, limit);
  }, [page, limit]);
  return { data, loading, hasMore, error };
};

export default useDonations;
