import React from "react";
import { Role } from "../../enums/Role";
import CreateNewAdmin from "./CreateNewAdmin";
import DashboardBlogRequests from "./DashboardBlogRequests";
import DashboardProfile from "./DashboardProfile";
import DoctorWeeklyScheduleManager from "./doctor/DoctorWeeklyScheduleManager";
import DoctorsRequest from "./DoctorsRequest";
import MyBlogs from "./MyBlogs";
import Overview from "./Overview";
import Appointment from "./Appointment";
import Reports from "./Reports";
import FeeChangingRequest from "./FeeChangingRequest";
import RequestForDonation from "./RequestForDonation";
import Donation from "./Donation";

export const DASHBOARD_ROUTES = [
  {
    path: "profile",
    heading: "Profile",
    component: <DashboardProfile />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
  },
  {
    path: "overview",
    heading: "Overview",
    component: <Overview />,
    allowedRoles: [Role.ADMIN],
  },
  {
    path: "doctor-signup-requests",
    heading: "Doctor request",
    component: <DoctorsRequest />,
    allowedRoles: [Role.ADMIN],
  },
  {
    path: "new-admins",
    heading: "Create new admin",
    component: <CreateNewAdmin />,
    allowedRoles: [Role.ADMIN],
  },
  {
    path: "my-blogs",
    heading: "My Blogs",
    component: <MyBlogs />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
  },
  {
    path: "blog-requests",
    heading: "Blog Requests",
    component: <DashboardBlogRequests />,
    allowedRoles: [Role.ADMIN],
  },
  {
    path: "weekly-time-slots",
    heading: "Manage Weekly Schedule",
    component: <DoctorWeeklyScheduleManager />,
    allowedRoles: [Role.DOCTOR],
  },
  {
    path: "appointments",
    heading: "Appointments",
    component: <Appointment />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
  },
  {
    path: "reports",
    heading: "Manage Reports",
    component: <Reports />,
    allowedRoles: [Role.USER],
  },
  {
    path: "fee-changing-requests",
    heading: "Fee Changing Requests",
    component: <FeeChangingRequest />,
    allowedRoles: [Role.ADMIN],
  },
  {
    path: "request-for-donation",
    heading: "Requests For Donation",
    component: <RequestForDonation />,
    allowedRoles: [Role.ADMIN],
  },
  {
    path: "donation",
    heading: "Donation",
    component: <Donation />,
    allowedRoles: [Role.ADMIN],
  },
];
