import React, { useState } from "react";
import { DONATION_REQUEST_STATUS } from "../../misc/constants";
import useDonationRequests from "../../hooks/useDonationRequests";
import DonationRequestsComp from "../misc/DonationRequestsComp";

const RequestForDonation = () => {
  const [page, setPage] = useState(0);
  const [filterValue, setFilterValue] = useState(
    DONATION_REQUEST_STATUS.PENDING
  );

  const {
    data: donationRequests,
    loading,
    hasMore,
  } = useDonationRequests(
    page,
    15,
    filterValue.requestStatus,
    filterValue.completionStatus
  );
  return (
    <>
      <DonationRequestsComp
        title="Requests for Donation"
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
        showActions={true}
      />
    </>
  );
};

export default RequestForDonation;
