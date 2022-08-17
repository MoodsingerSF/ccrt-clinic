import { Role } from "../../enums/Role";

export const DashboardOptions = [
  {
    route: "profile",
    heading: "Profile",
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
  },
  {
    route: "overview",
    heading: "Overview",
    allowedRoles: [Role.ADMIN],
  },
  {
    route: "doctor-signup-requests",
    heading: "Doctor request",
    allowedRoles: [Role.ADMIN],
  },
  {
    route: "new-admins",
    heading: "Create new admin",
    allowedRoles: [Role.ADMIN],
  },
  {
    route: "blogs",
    heading: "Blogs",
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
  },
];

export const DoctorTableData = [
  {
    id: "1",
    name: "Shakil",
    email: "shakil@gmail.com",
    status: "Pending",
  },
  {
    id: "2",
    name: "Rafi",
    email: "rafi@gmail.com",
    status: "Pending",
  },
  {
    id: "3",
    name: "Rajib",
    email: "rajib@gmail.com",
    status: "Pending",
  },
];
