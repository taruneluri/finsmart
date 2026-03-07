import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()

    // Don't show sidebar on landing page, login, or register
    const noSidebarRoutes = ["/", "/login", "/register"]
    const hideSidebar = noSidebarRoutes.includes(location.pathname)

    return (
        <div className="min-h-screen bg-accent flex flex-col">
            <Navbar onMenuClick={!hideSidebar ? () => setIsSidebarOpen(!isSidebarOpen) : undefined} />

            <div className="flex flex-1">
                {!hideSidebar && (
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                )}

                <main
                    className={`flex-1 transition-all duration-300 ${!hideSidebar ? "md:ml-64" : ""}`}
                >
                    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
