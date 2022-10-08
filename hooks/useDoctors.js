import { useEffect, useState } from "react";
import { retrieveDoctorsBySpecialization } from "../controllers/DoctorController";
import { retrieveAcceptedDoctors } from "../controllers/UserController";

const useDoctors = (page, limit, specializationId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieve = async (page, limit, specializationId) => {
    try {
      setLoading(true);
      let data = [];
      if (Number(specializationId) === -1) {
        data = await retrieveAcceptedDoctors(page, limit);
      } else {
        data = await retrieveDoctorsBySpecialization(
          page,
          limit,
          specializationId
        );
      }
      console.log({ specializationId, data });
      if (data.length < limit || data.length === 0) {
        setHasMore(false);
      }
      if (page === 0) setData(data);
      else setData((prev) => [...prev, ...data]);
      console.log({ specializationId, data });

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 0) setData([]);
    retrieve(page, limit, specializationId);
  }, [page, limit, specializationId]);
  return { data, loading, hasMore, error };
};

export default useDoctors;
