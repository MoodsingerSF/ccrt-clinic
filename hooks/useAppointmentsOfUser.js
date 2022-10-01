import { useEffect, useState } from "react";
import { retrieveAppointmentsOfAnUser } from "../controllers/AppointmentController";

const useAppointmentsOfUser = (page, limit, date, status) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieve = async (page, date, status) => {
    try {
      setLoading(true);
      const data = await retrieveAppointmentsOfAnUser(
        page,
        limit,
        date,
        status
      );
      // console.log(data);
      if (data.length === 0 || data.length < limit) {
        setHasMore(false);
      }
      if (page === 0) setAppointments(data);
      else setAppointments((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieve(page, date, status);
  }, [page, date, status]);
  return { appointments, loading, hasMore, error };
};

export default useAppointmentsOfUser;
