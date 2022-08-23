import { useEffect, useState } from "react";
import {
  getAcceptedBlogs,
  getPendingBlogs,
} from "../controllers/BlogController";
import { VerificationStatus } from "../enums/VerificationStatus";

const useBlogs = (page, verificationStatus) => {
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
        responseData = await getPendingBlogs(page);
      } else if (verificationStatus === VerificationStatus.ACCEPTED) {
        responseData = await getAcceptedBlogs(page);
      }
      setTotalBlogs(responseData.totalBlogs);
      if (responseData.blogs.length === 0) {
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
  }, [page]);
  return { blogs, totalBlogs, loading, hasMore, error };
};

export default useBlogs;
