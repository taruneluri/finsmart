import { Home, ListOrdered, PieChart, User } from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "../lib/utils"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Transactions", href: "/transactions", icon: ListOrdered },
    { name: "Analytics", href: "/dashboard#analytics", icon: PieChart },
    { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar({ isOpen, setIsOpen }) {
    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm transition-opacity md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={cn(
                    "fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col overflow-y-auto py-6">
                    <nav className="flex-1 space-y-1 px-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary-light/10 text-primary-dark"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-navy translate-x-0 hover:translate-x-1"
                                    )
                                }
                            >
                                <item.icon className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors")} />
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    )
}
