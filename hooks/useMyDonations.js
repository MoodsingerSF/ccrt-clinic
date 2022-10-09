import { useEffect, useState } from "react";
import { retrieveMyDonations } from "../controllers/DonationController";

const useMyDonations = (page, limit) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const myDonations = async (page, limit) => {
    try {
      setLoading(true);
      const data = await retrieveMyDonations(page, limit);
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
    myDonations(page, limit);
  }, [page, limit]);
  return { data, loading, hasMore, error };
};

export default useMyDonations;
