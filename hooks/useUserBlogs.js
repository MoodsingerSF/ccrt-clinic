import { useEffect, useState } from "react";
import { retrieveUserBlogs } from "../controllers/BlogController";

const useUserBlogs = (userId, page) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieveBlogs = async (page) => {
    try {
      setLoading(true);
      const temp = await retrieveUserBlogs(userId, page, 15);
      if (temp.data.length === 0) {
        setHasMore(false);
      }
      if (page === 0) setBlogs(temp.data);
      else setBlogs((prev) => [...prev, ...temp.data]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveBlogs(page);
  }, [page]);
  return { blogs, loading, hasMore, error };
};

export default useUserBlogs;
