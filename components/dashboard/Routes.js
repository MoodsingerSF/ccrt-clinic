import React from "react";
import { Role } from "../../enums/Role";
import CreateNewAdmin from "./CreateNewAdmin";
import DashboardBlogRequests from "./DashboardBlogRequests";
import DashboardBlogs from "./DashboardBlogs";
import DashboardProfile from "./DashboardProfile";
import DoctorsRequest from "./DoctorsRequest";
import Overview from "./Overview";

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
    component: <DashboardBlogs />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
  },
  {
    path: "blog-requests",
    heading: "Blog Requests",
    component: <DashboardBlogRequests />,
    allowedRoles: [Role.ADMIN],
  },
];
