import React from "react"

const Home_Page = React.lazy(() => import("./pages/Home_Page/HomePage"))
const Statistics = React.lazy(() => import("./pages/Statistics/Statistics"))
const Dates = React.lazy(() => import("./pages/Dates/Dates"))
const Location_Generator = React.lazy(() => import("./pages/Location_Generator/Location_Generator"))
const Suggestion_Box = React.lazy(() => import("./pages/Suggestion_Box/Suggestion_Box"))
const About_Page = React.lazy(() => import("./pages/About_Us/About_Us"))

const Profile = React.lazy(() => import("./pages/Profile/Profile"))
const Profile_Edit = React.lazy(() => import("./pages/Profile_Edit/Profile_Edit"))

const routes = [
	{ path: "/home_page", exact: true, name: "Home Page", component: Home_Page  },
    { path: "/statistics", exact: true, name: "Statistics", component: Statistics },
	{ path: "/dates", exact: true, name: "Dates <3", component: Dates },
    { path: "/location_generator", exact: true, name: "Location Generator", component: Location_Generator },
    { path: "/suggestion", exact: true, name: "Suggestion Box", component: Suggestion_Box },
	{ path: "/about_page", exact: true, name: "About Us", component: About_Page },

    { path: "/profile", exact: true, name: "Profile", component: Profile },
    { path: "/profile_Edit", exact: true, name: "Profile Edit", component: Profile_Edit }
]

export default routes