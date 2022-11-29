import { useEffect, useState } from "react";
import {
  getAcceptedBlogs,
  getPendingBlogs,
} from "../controllers/BlogController";
import { VerificationStatus } from "../enums/VerificationStatus";

const useBlogs = (page, limit, verificationStatus) => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieveBlogs = async (page) => {
    try {
      setLoading(true);
      let responseData = [];
      if (verificationStatus === VerificationStatus.PENDING) {
        responseData = await getPendingBlogs(page, limit);
      } else if (verificationStatus === VerificationStatus.ACCEPTED) {
        responseData = await getAcceptedBlogs(page, limit);
      }
      setTotalBlogs(responseData.totalBlogs);
      if (responseData.blogs.length < limit) {
        setHasMore(false);
      }
      if (page === 0) setBlogs(responseData.blogs);
      else setBlogs((prev) => [...prev, ...responseData.blogs]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveBlogs(page);
  }, [page, limit, verificationStatus]);
  return { blogs, totalBlogs, loading, hasMore, error };
};

export default useBlogs;
