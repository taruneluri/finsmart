import { Menu, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/Button"

export function Navbar({ onMenuClick }) {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
            <div className="flex items-center gap-4">
                {onMenuClick && (
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                )}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                        <Wallet className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-navy">FinSmart</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/profile">
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-100 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
                        <img src="https://ui-avatars.com/api/?name=User&background=020617&color=fff" alt="User" />
                    </div>
                </Link>
            </div>
        </header>
    )
}
