const PENDING = "PENDING";
const ACCEPTED = "ACCEPTED";
const REJECTED = "REJECTED";
export const VerificationStatus = Object.freeze({
  PENDING: Symbol(PENDING),
  ACCEPTED: Symbol(ACCEPTED),
  REJECTED: Symbol(REJECTED),
});

export const VerificationStatusBuilder = (statusString) => {
  if (statusString === PENDING) return VerificationStatus.PENDING;
  else if (statusString === ACCEPTED) return VerificationStatus.ACCEPTED;
  else if (statusString === REJECTED) return VerificationStatus.REJECTED;
};
