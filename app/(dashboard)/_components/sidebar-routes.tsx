"use client";

import { Layout, Compass, List, BarChart } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon : Layout,
        label : "Dashboard",
        href : "/"
    },
    {
        icon : Compass,
        label : "Browse",
        href : "/search"
    }
]

const teacherRoutes = [
    {
        icon : List,
        label : "Courses",
        href : "/teacher/courses"
    },
    {
        icon : BarChart,
        label : "Analytics",
        href : "/teacher/analytics"
    }
]

export const SidebarRoutes = () => {
    const pathname = usePathname()

    const isTeacherPage = pathname?.includes("/teacher");

    const route = isTeacherPage? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {
                route.map((item) => (
                    <SidebarItem 
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                    />
                ))            
            }
        </div>
    )
}