import React, { useState } from "react";
import { DONATION_REQUEST_STATUS } from "../../misc/constants";
import DonationRequestsComp from "../misc/DonationRequestsComp";
import useUserDonationRequests from "../../hooks/useUserDonationRequests";

const UserRequestsForDonation = () => {
  const [page, setPage] = useState(0);
  const [filterValue, setFilterValue] = useState(
    DONATION_REQUEST_STATUS.PENDING
  );
  const {
    data: donationRequests,
    loading,
    hasMore,
  } = useUserDonationRequests(page, 15);

  return (
    <>
      <DonationRequestsComp
        title="My Donation Requests"
        filterValue={filterValue}
        onChangeFilterValue={(e) => {
          setFilterValue(e.target.value);
          setPage(0);
        }}
        loading={loading}
        page={page}
        donationRequests={donationRequests}
        hasMore={hasMore}
        onLoadMore={() => setPage((prev) => prev + 1)}
      />
    </>
  );
};

export default UserRequestsForDonation;
