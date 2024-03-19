import React from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
// REACT ICONS
import { TbReportAnalytics } from 'react-icons/tb'
import { SlSupport } from 'react-icons/sl'
import { SiAboutdotme, SiStaffbase } from 'react-icons/si'
import { BiCategory, BiCalendarEvent } from 'react-icons/bi'
import { RiUserSearchLine, RiUserSearchFill } from 'react-icons/ri'
import { FaQuestionCircle } from 'react-icons/fa'
import { GiAchievement } from 'react-icons/gi'
import { FiPackage, FiUsers } from 'react-icons/fi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { AiOutlineContacts, AiOutlineHome, AiOutlineSwap, AiOutlineHeart } from 'react-icons/ai'
import {
  MdSpeed,
  MdMiscellaneousServices,
  MdDevicesOther,
  MdPages,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md'

const role = {
  Admin: 'Admin',
  Sub_Admin: 'Sub Admin',
  Partner: 'Partner',
  Customer: 'Customer',
}

const currentRole = localStorage.getItem('role')

let _nav

if (currentRole === role.Admin) {
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <MdSpeed className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Admin',
      to: '/admin-list',
      icon: <MdOutlineAdminPanelSettings className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Sub Admin',
      to: '/sub-admin',
      icon: <SiStaffbase className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Partners',
      to: '/partners',
      icon: <MdOutlineGroupAdd className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Manage Users',
      to: '/manage-users',
      icon: <FiUsers className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Events',
      to: '/event-list',
      icon: <BiCalendarEvent className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Contact Inquiry',
      to: '/inquiry-page',
      icon: <RiUserSearchLine className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Partner Inquiry',
      to: '/partner-inquiry-page',
      icon: <RiUserSearchFill className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Event List',
      to: '/intrested',
      icon: <AiOutlineHeart className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Service Booking',
      to: '/service-booking-page',
      icon: <MdMiscellaneousServices className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavGroup,
      name: 'Services',
      icon: <MdMiscellaneousServices className="nav-icon" />,
      role: role.Admin,
      items: [
        {
          component: CNavItem,
          name: 'Service',
          to: '/service',
          icon: <BiCategory className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Category',
          to: '/category',
          icon: <BiCategory className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Sub Category',
          to: '/sub-category',
          icon: <BiCategory className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Provider Service',
          to: '/provider-service',
          icon: <MdMiscellaneousServices className="nav-icon" />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Others',
      icon: <MdDevicesOther className="nav-icon" />,
      role: role.Admin,
      items: [
        {
          component: CNavItem,
          name: 'Testimonial',
          to: '/testimonial',
          icon: <AiOutlineSwap className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Supporters',
          to: '/supporters',
          icon: <SlSupport className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Plan',
          to: '/plan',
          icon: <FiPackage className="nav-icon" />,
        },
        // {
        //   component: CNavItem,
        //   name: 'Legal Service',
        //   to: '/legal-service',
        //   icon: <MdDesignServices className="nav-icon" />,
        // },
        {
          component: CNavItem,
          name: 'Achivement',
          to: '/achivement',
          icon: <GiAchievement className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Faq',
          to: '/faq',
          icon: <FaQuestionCircle className="nav-icon" />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'CMS Pages',
      icon: <MdPages className="nav-icon" />,
      role: role.Admin,
      items: [
        {
          component: CNavItem,
          name: 'Home Page',
          to: '/homepage',
          icon: <AiOutlineHome className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'About Us',
          to: '/aboutus',
          icon: <SiAboutdotme className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Contact Us',
          to: '/contactus',
          icon: <AiOutlineContacts className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Become Partner',
          to: '/become-partner-page',
          icon: <AiOutlineContacts className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'User Dashboard Page',
          to: '/user-board-page',
          icon: <MdSpeed className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Blogs',
          to: '/blogs',
          icon: <MdSpeed className="nav-icon" />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Reports',
      icon: <TbReportAnalytics className="nav-icon" />,
      role: role.Admin,
      items: [
        {
          component: CNavItem,
          name: 'Users',
          to: '/users-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        // {
        //   component: CNavItem,
        //   name: 'Service Booking',
        //   to: '/service-booking-reports',
        //   icon: <TbReportAnalytics className="nav-icon" />,
        // },
        {
          component: CNavItem,
          name: 'Customer Service Booking',
          to: '/customer-booking-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Customer Pending Booking',
          to: '/customer-pending-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Customer Plan Booking',
          to: '/customer-plan-booking-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Sub Admin',
          to: '/sub-admin-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Get Started Inquiry',
          to: '/get-started-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
      ],
    },
  ]
} else if (currentRole === role.Sub_Admin) {
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <MdSpeed className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Manage Users',
      to: '/manage-users',
      icon: <FiUsers className="nav-icon" />,
      role: role.Sub_Admin,
    },
    {
      component: CNavItem,
      name: 'Partners',
      to: '/partners',
      icon: <MdOutlineGroupAdd className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Contact Inquiry',
      to: '/inquiry-page',
      icon: <RiUserSearchLine className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavItem,
      name: 'Partner Inquiry',
      to: '/partner-inquiry-page',
      icon: <RiUserSearchFill className="nav-icon" />,
      role: role.Admin,
    },
    {
      component: CNavGroup,
      name: 'Services',
      icon: <MdMiscellaneousServices className="nav-icon" />,
      role: role.Sub_Admin,
      items: [
        //Provider Service By SubAdmin
        {
          component: CNavItem,
          name: 'Provider Service',
          to: '/user-by-provider-service',
          icon: <MdMiscellaneousServices className="nav-icon" />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Reports',
      icon: <TbReportAnalytics className="nav-icon" />,
      role: role.Sub_Admin,
      items: [
        {
          component: CNavItem,
          name: 'Users Report',
          to: '/users-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Customer Service Booking',
          to: '/customer-booking-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Customer Plan Booking',
          to: '/customer-plan-booking-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Sub Admin',
          to: '/sub-admin-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
      ],
    },
  ]
} else if (currentRole === role.Partner) {
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <MdSpeed className="nav-icon" />,
    },
    //Manage Users By Partner
    {
      component: CNavItem,
      name: 'Partner Users',
      to: '/manage-users-by-partner',
      icon: <FiUsers className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Partner Service Booking',
      to: '/partner-service-booking',
      icon: <MdMiscellaneousServices className="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Services',
      icon: <MdMiscellaneousServices className="nav-icon" />,
      role: role.Partner,
      items: [
        //Provider Service By Partner
        {
          component: CNavItem,
          name: 'Provider Service',
          to: '/user-by-provider-service',
          icon: <MdMiscellaneousServices className="nav-icon" />,
        },
      ],
    },

    {
      component: CNavGroup,
      name: 'Reports',
      icon: <TbReportAnalytics className="nav-icon" />,
      role: role.Partner,
      items: [
        {
          component: CNavItem,
          name: 'Users Report',
          to: '/users-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Customer Service Booking',
          to: '/customer-booking-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Customer Plan Booking',
          to: '/customer-plan-booking-reports',
          icon: <TbReportAnalytics className="nav-icon" />,
        },
      ],
    },
  ]
} else {
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <MdSpeed className="nav-icon" />,
    },
  ]
}

export default _nav
