import { LogOut, User as UserIcon, Mail, ShieldCheck, Wallet } from "lucide-react"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { TransactionContext } from "../context/TransactionContext"
import * as api from "../services/api"
import { toast } from "react-toastify"

export function ProfilePage() {
    const navigate = useNavigate()
    const { summary, refreshData, clearData } = useContext(TransactionContext)
    const [user, setUser] = useState({ name: "", email: "" })
    const [monthlyBudget, setMonthlyBudget] = useState("")

    useEffect(() => {
        const profile = localStorage.getItem('profile')
        if (profile) {
            const { name, email } = JSON.parse(profile)
            setUser({ name, email })
        }
        if (summary.budget) {
            setMonthlyBudget(summary.budget.toString())
        }
    }, [summary.budget])

    const handleLogout = () => {
        localStorage.removeItem('profile')
        clearData()
        toast.info("Logged out successfully")
        navigate("/login")
    }

    const handleUpdateBudget = async (e) => {
        e.preventDefault()
        try {
            const now = new Date()
            await api.setBudget({
                monthlyBudget: parseFloat(monthlyBudget),
                month: now.getMonth() + 1,
                year: now.getFullYear()
            })
            toast.success("Budget updated")
            refreshData()
        } catch (error) {
            toast.error("Failed to update budget")
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-navy">Account Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your profile and financial goals.</p>
            </div>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-50 pb-6">
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-full bg-navy text-white flex items-center justify-center text-2xl font-bold">
                            {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                            <CardTitle className="text-xl text-navy">{user.name || "User"}</CardTitle>
                            <p className="text-slate-500">{user.email || "No email"}</p>
                            <div className="mt-2 flex gap-2">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                    <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleUpdateBudget} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                <Wallet className="h-4 w-4" /> Financial Goal
                            </h3>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Monthly Expense Budget (₹)</label>
                                <div className="flex gap-3">
                                    <Input
                                        type="number"
                                        placeholder="Set your monthly budget"
                                        value={monthlyBudget}
                                        onChange={(e) => setMonthlyBudget(e.target.value)}
                                        className="max-w-xs"
                                    />
                                    <Button type="submit">Update Budget</Button>
                                </div>
                                <p className="text-xs text-slate-400">Setting a budget helps you track your spending limits automatically on the dashboard.</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-4">
                                <UserIcon className="h-4 w-4" /> Personal Information
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-navy">Name</label>
                                    <Input value={user.name} disabled className="bg-slate-50 cursor-not-allowed" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-navy">Email</label>
                                    <Input value={user.email} disabled className="bg-slate-50 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="border-red-100 bg-red-50/30">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-navy flex items-center gap-2">
                                <LogOut className="h-4 w-4 text-red-500" /> Sign Out
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Safely exit your current session.</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
