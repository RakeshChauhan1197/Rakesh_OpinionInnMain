import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

// Material Dashboard 2 PRO React TS components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

const routes = [
  {
    type: "collapse",
    name: "Admin",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Admin" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/basic",
        component: <SignInBasic />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse", // Ensure "collapse" is used if this should be collapsible
    name: "Dashboard",
    key: "dashboard-analytics",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboards/analytics",
    component: <Analytics />,
  },
  { type: "divider", key: "divider-0" },
  { type: "title", title: "Home", key: "title-Home" },
  {
    type: "collapse",
    name: "Configuration",
    key: "configuration",
    icon: <Icon fontSize="medium">apps</Icon>,
    collapse: [
      {
        name: "User Roles",
        key: "Userroles",
        route: "User Roles",
      },
      {
        name: "Access Control",
        key: "Access Control",
        route: "Access Control",
      },
      {
        name: "Settings",
        key: "Settings",
        route: "Settings",
      },
      {
        name: "Affiliate",
        key: "Affiliate",
        route: "Affiliate",
      },
      {
        name: "Survey Config",
        key: "Survey Config",
        route: "Survey Config",
      },
      {
        name: "Validate Panelist",
        key: "Validate Panelist",
        route: "Validate Panelist",
      },
      {
        name: "Panel Validation Logs",
        key: "Panel Validation Logs",
        route: "Panel Validation Logs",
      },
      {
        name: "End Pages",
        key: "End Pages",
        route: "End Pages",
      },
    ],
  },
  {
    type: "collapse",
    name: "Master",
    key: "Master",
    icon: <Icon fontSize="medium">view_in_ar</Icon>,
    collapse: [
      {
        name: "Country",
        key: "Country",
        route: "Country",
      },
      {
        name: "Client",
        key: "Client",
        route: "Client",
      },
      {
        name: "Vendor",
        key: "Vendor",
        route: "Vendor",
      },
      {
        name: "Software User",
        key: "Softwareuser",
        route: "SoftwareUser",
      },
      {
        name: "Survey View",
        key: "Surveyview",
        route: "SurveyView",
      },
      {
        name: "Email Template",
        key: "Emailtemplate",
        route: "Emailtemplate",
      },
      {
        name: "Pre Screener New",
        key: "PreScreenerNew",
        route: "PreScreenerNew",
      },
      {
        name: "Polls",
        key: "Polls",
        route: "Polls",
      },
      {
        name: "Portal User",
        key: "Portaluser",
        route: "Portaluser",
      },
      {
        name: "Promo Codes",
        key: "Promocodes",
        route: "Promocodes",
      },
      {
        name: "Testimonials",
        key: "Testimonials",
        route: "Testimonials",
      },
      {
        name: "Vendor Parent",
        key: "Vendorparent",
        route: "VendorParent",
      },
    ],
  },
  {
    type: "collapse",
    name: "Survey",
    key: "Survey",
    icon: <Icon fontSize="medium">image</Icon>,
    collapse: [
      {
        name: "All Survey",
        key: "All Survey",
        route: "All Survey",
      },
      {
        name: "Survey Ordering",
        key: "Survey Ordering",
        route: "Survey Ordering",
      },
      {
        name: "New Survey",
        key: "New Survey",
        route: "New Survey",
      },
      {
        name: "Archived Survey",
        key: "Archived Survey",
        route: "Archived Survey",
      },
    ],
  },
  {
    type: "collapse",
    name: "Incentive",
    key: "Incentive",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "Redeemption Approval",
        key: "Redeemption Approval",
        route: "Redeemption Approval",
      },
      {
        name: "Incentive Approval Upload",
        key: "Incentive Approval Upload",
        route: "Incentive Approval Upload",
      },
      {
        name: "VendorId Uploader",
        key: "VendorId Uploader",
        route: "VendorId Uploader",
      },
      {
        name: "Upload Reversal",
        key: "Upload Reversal",
        route: "Upload Reversal",
      },
      {
        name: "User Incentive Detail",
        key: "User Incentive Detail",
        route: "User Incentive Detail",
      },
      {
        name: "Redeemption Approval History",
        key: "Redeemption Approval History",
        route: "Redeemption Approval History",
      },
    ],
  },
  {
    type: "collapse",
    name: "Reports",
    key: "Reports",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        name: "Tracking Report",
        key: "Tracking Report",
        route: "Tracking Report",
      },
      {
        name: "User Report",
        key: "User Report",
        route: "User Report",
      },
      {
        name: "Affiliate Survey Report",
        key: "Affiliate Survey Report",
        route: "Affiliate Survey Report",
      },
      {
        name: "Country Wise User Report",
        key: "Country Wise User Report",
        route: "Country Wise User Report",
      },
      {
        name: "Affiliate User Survey Report",
        key: "Affiliate User Survey Report",
        route: "Affiliate User Survey Report",
      },
      {
        name: "Vendor Survey Report",
        key: "Vendor Survey Report",
        route: "Vendor Survey Report",
      },
      {
        name: "Vendor Survey Tracking Report",
        key: "Vendor Survey Tracking Report",
        route: "Vendor Survey Tracking Report",
      },
      {
        name: "Conversion Report",
        key: "Conversion Report",
        route: "Conversion Report",
      },
      {
        name: "Affiliate Survey Summary Report",
        key: "Affiliate Survey Summary Report",
        route: "Affiliate Survey Summary Report",
      },
      {
        name: "OSS Project Details Report",
        key: "OSS Project Details Report",
        route: "OSS Project Details Report",
      },
      {
        name: "OSS Daily Completes Report",
        key: "OSS Daily Completes Report",
        route: "OSS Daily Completes Report",
      },
      {
        name: "Pending Incentive Approval Report",
        key: "Pending Incentive Approval Report",
        route: "Pending Incentive Approval Report",
      },
    ],
  },
  {
    type: "collapse",
    name: "Logs",
    key: "Logs",
    icon: <Icon fontSize="medium">upcoming</Icon>,
    collapse: [
      {
        name: "Audit Log",
        key: "Audit Log",
        route: "Audit Log",
      },
      {
        name: "Unauthorized Log",
        key: "Unauthorized Log",
        route: "Unauthorized Log",
      },
      {
        name: "Unsubscribe Log",
        key: "Unsubscribe Log",
        route: "Unsubscribe Log",
      },
    ],
  },
];

export default routes;
