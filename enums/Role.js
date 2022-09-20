const ADMIN = "ADMIN";
const USER = "USER";
const DOCTOR = "DOCTOR";
const GUEST = "GUEST";
const ALL = "ALL";

export const Role = Object.freeze({
  ADMIN: Symbol(ADMIN),
  USER: Symbol(USER),
  DOCTOR: Symbol(DOCTOR),
  GUEST: Symbol(GUEST),
  ALL: Symbol(ALL),
});

export const RoleBuilder = (roleString) => {
  if (roleString === ADMIN) return Role.ADMIN;
  else if (roleString === USER) return Role.USER;
  else if (roleString === DOCTOR) return Role.DOCTOR;
  else if (roleString === GUEST) return Role.GUEST;
};
