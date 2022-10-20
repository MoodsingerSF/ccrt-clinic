import React from "react";
import { Role } from "../../enums/Role";
import CreateNewAdmin from "./CreateNewAdmin";
import DashboardBlogRequests from "./DashboardBlogRequests";
import DashboardProfile from "./DashboardProfile";
import DoctorWeeklyScheduleManager from "./doctor/DoctorWeeklyScheduleManager";
import DoctorsRequest from "./DoctorsRequest";
import MyBlogs from "./MyBlogs";
// import Overview from "./Overview";
import Appointment from "./Appointment";
import Reports from "./Reports";
import FeeChangingRequest from "./FeeChangingRequest";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import ForumIcon from "@mui/icons-material/Forum";
import SuggestionComp from "./SuggestionComp";
import RequestForDonation from "./RequestForDonation";
import Donation from "./Donation";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LoginIcon from "@mui/icons-material/Login";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UserRequestsForDonation from "./UserRequestsForDonation";
import MyDonations from "./MyDonations";
export const ROUTE_ICON_STYLE = {
  fontSize: "120%",
  color: "white",
  marginRight: 10,
  marginLeft: 10,
};
export const DASHBOARD_ROUTES = [
  {
    path: "profile",
    heading: "Profile",
    component: <DashboardProfile />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
    icon: <AccountCircleIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "doctor-signup-requests",
    heading: "Registration Requests",
    component: <DoctorsRequest />,
    allowedRoles: [Role.ADMIN],
    icon: <SubscriptionsIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "new-admins",
    heading: "Add New Admin",
    component: <CreateNewAdmin />,
    allowedRoles: [Role.ADMIN],
    icon: <PersonAddIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "my-blogs",
    heading: "My Blogs",
    component: <MyBlogs />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
    icon: <TextSnippetIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "blog-requests",
    heading: "Blog Requests",
    component: <DashboardBlogRequests />,
    allowedRoles: [Role.ADMIN],
    icon: <AdminPanelSettingsIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "weekly-time-slots",
    heading: "Weekly Schedule",
    component: <DoctorWeeklyScheduleManager />,
    allowedRoles: [Role.DOCTOR],
    icon: <CalendarMonthIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "appointments",
    heading: "Appointments",
    component: <Appointment />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
    icon: <BookOnlineIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "reports",
    heading: "Manage Reports",
    component: <Reports />,
    allowedRoles: [Role.USER],
    icon: <MedicationIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "fee-changing-requests",
    heading: "Fee Changing Requests",
    component: <FeeChangingRequest />,
    allowedRoles: [Role.ADMIN],
    icon: <AdminPanelSettingsIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "suggestions",
    heading: "User Suggestions",
    component: <SuggestionComp />,
    allowedRoles: [Role.ADMIN],
    icon: <ForumIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "requests-for-donation",
    heading: "Requests For Donation",
    component: <RequestForDonation />,
    allowedRoles: [Role.ADMIN],
    icon: <RequestPageIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "my-requests-for-donation",
    heading: "My Donation Requests",
    component: <UserRequestsForDonation />,
    allowedRoles: [Role.ADMIN, Role.USER, Role.DOCTOR],
    icon: <SummarizeIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "donations",
    heading: "Donations",
    component: <Donation />,
    allowedRoles: [Role.ADMIN],
    icon: <VolunteerActivismIcon style={ROUTE_ICON_STYLE} />,
  },
  {
    path: "my-donations",
    heading: "My Donations",
    component: <MyDonations />,
    allowedRoles: [Role.ADMIN, Role.USER, Role.DOCTOR],
    icon: <AttachMoneyIcon style={ROUTE_ICON_STYLE} />,
  },
];

export const VIEW_CRITERIA = {
  AFTER_AUTHORIZATION: "after-authorization",
  BEFORE_AUTHORIZATION: "before-authorization",
  ALWAYS: "always",
};

export const APP_BAR_ROUTES = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.ALWAYS,
  },
  {
    title: "Dashboard",
    path: "/dashboard/profile",
    icon: <DashboardIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.AFTER_AUTHORIZATION,
  },
  {
    title: "Doctors",
    path: "/doctors",
    icon: <PeopleAltIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.ALWAYS,
  },
  {
    title: "Blogs",
    path: "/blogs",
    icon: <RateReviewIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.ALWAYS,
  },
  {
    title: "Contact",
    path: "/contact-us",
    icon: <AccountBoxIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.ALWAYS,
  },
  {
    title: "FAQ",
    path: "/faq",
    icon: <LiveHelpIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.ALWAYS,
  },
  {
    title: "Login",
    path: "/login",
    icon: <LoginIcon style={ROUTE_ICON_STYLE} />,
    showCriteria: VIEW_CRITERIA.BEFORE_AUTHORIZATION,
  },
];
