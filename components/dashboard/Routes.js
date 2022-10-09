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
import UserRequestsForDonation from "./UserRequestsForDonation";
import MyDonations from "./MyDonations";
const iconStyle = {
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
    icon: <AccountCircleIcon style={iconStyle} />,
  },
  // {
  //   path: "overview",
  //   heading: "Overview",
  //   component: <Overview />,
  //   allowedRoles: [Role.ADMIN],
  //   icon: <DonutSmallIcon style={iconStyle} />,
  // },
  {
    path: "doctor-signup-requests",
    heading: "Registration Requests",
    component: <DoctorsRequest />,
    allowedRoles: [Role.ADMIN],
    icon: <SubscriptionsIcon style={iconStyle} />,
  },
  {
    path: "new-admins",
    heading: "Add New Admin",
    component: <CreateNewAdmin />,
    allowedRoles: [Role.ADMIN],
    icon: <PersonAddIcon style={iconStyle} />,
  },
  {
    path: "my-blogs",
    heading: "My Blogs",
    component: <MyBlogs />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
    icon: <TextSnippetIcon style={iconStyle} />,
  },
  {
    path: "blog-requests",
    heading: "Blog Requests",
    component: <DashboardBlogRequests />,
    allowedRoles: [Role.ADMIN],
    icon: <AdminPanelSettingsIcon style={iconStyle} />,
  },
  {
    path: "weekly-time-slots",
    heading: "Weekly Schedule",
    component: <DoctorWeeklyScheduleManager />,
    allowedRoles: [Role.DOCTOR],
    icon: <CalendarMonthIcon style={iconStyle} />,
  },
  {
    path: "appointments",
    heading: "Appointments",
    component: <Appointment />,
    allowedRoles: [Role.ADMIN, Role.DOCTOR, Role.USER],
    icon: <BookOnlineIcon style={iconStyle} />,
  },
  {
    path: "reports",
    heading: "Manage Reports",
    component: <Reports />,
    allowedRoles: [Role.USER],
    icon: <MedicationIcon style={iconStyle} />,
  },
  {
    path: "fee-changing-requests",
    heading: "Fee Changing Requests",
    component: <FeeChangingRequest />,
    allowedRoles: [Role.ADMIN],
    icon: <AdminPanelSettingsIcon style={iconStyle} />,
  },
  {
    path: "suggestions",
    heading: "User Suggestions",
    component: <SuggestionComp />,
    allowedRoles: [Role.ADMIN],
    icon: <ForumIcon style={iconStyle} />,
  },
  {
    path: "requests-for-donation",
    heading: "Requests For Donation",
    component: <RequestForDonation />,
    allowedRoles: [Role.ADMIN],
    icon: <RequestPageIcon style={iconStyle} />,
  },
  {
    path: "my-requests-for-donation",
    heading: "My Donation Requests",
    component: <UserRequestsForDonation />,
    allowedRoles: [Role.ADMIN, Role.USER, Role.DOCTOR],
    icon: <SummarizeIcon style={iconStyle} />,
  },
  {
    path: "donations",
    heading: "Donations",
    component: <Donation />,
    allowedRoles: [Role.ADMIN],
    icon: <VolunteerActivismIcon style={iconStyle} />,
  },
  {
    path: "my-donations",
    heading: "My Donations",
    component: <MyDonations />,
    allowedRoles: [Role.ADMIN, Role.USER, Role.DOCTOR],
    icon: <AttachMoneyIcon style={iconStyle} />,
  },
];
