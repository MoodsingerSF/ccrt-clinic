import { useEffect, useState } from "react";
import {
  getAcceptedBlogs,
  getPendingBlogs,
} from "../controllers/BlogController";
import { VerificationStatus } from "../enums/VerificationStatus";

const useBlogs = (page, verificationStatus) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieveBlogs = async (page) => {
    try {
      setLoading(true);
      let temp = [];
      if (verificationStatus === VerificationStatus.PENDING) {
        temp = await getPendingBlogs(page);
      } else if (verificationStatus === VerificationStatus.ACCEPTED) {
        temp = await getAcceptedBlogs(page);
      }
      if (temp.length === 0) {
        setHasMore(false);
      }
      setBlogs((prev) => [...prev, ...temp]);
      setLoading(true);
    } catch (error) {
      setError(true);
      setLoading(true);
    }
  };
  useEffect(() => {
    retrieveBlogs(page);
  }, [page]);
  return { blogs, loading, hasMore, error };
};

export default useBlogs;
