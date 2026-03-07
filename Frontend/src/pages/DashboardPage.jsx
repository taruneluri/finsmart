import { ArrowDownRight, ArrowUpRight, Wallet, Plus, Loader2, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { TransactionItem } from "../components/TransactionItem"
import { TransactionModal } from "../components/TransactionModal"
import { TransactionContext } from "../context/TransactionContext"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardPage() {
    const {
        transactions,
        summary,
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        addTransaction,
        loading,
        currentMonth,
        currentYear,
        nextMonth,
        prevMonth
    } = useContext(TransactionContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const recentTransactions = transactions.slice(0, 5)

    const chartData = [
        { name: 'Income', value: monthlyIncome },
        { name: 'Expenses', value: monthlyExpenses },
        { name: 'Savings', value: summary.savings || 0 },
    ];

    if (loading && transactions.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const budgetPercent = Math.min(summary.percentageUsed || 0, 100);
    const isOverBudget = summary.percentageUsed > 100;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-navy">Dashboard Overview</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-500">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-semibold text-slate-600 min-w-[120px] text-center">
                            {monthNames[currentMonth - 1]} {currentYear}
                        </span>
                        <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-500">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto shrink-0 shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover:-translate-y-1 transition-transform duration-300 shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings</CardTitle>
                        <Wallet className="h-4 w-4 text-navy" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-navy">₹{totalBalance.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card className="hover:-translate-y-1 transition-transform duration-300 shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Income</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-navy">₹{monthlyIncome.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card className="hover:-translate-y-1 transition-transform duration-300 shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expenses</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-navy">₹{monthlyExpenses.toLocaleString('en-IN')}</div>
                    </CardContent>
                </Card>

                <Card className="hover:-translate-y-1 transition-transform duration-300 shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Budget Progress</CardTitle>
                        <Target className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-navy">{Math.round(summary.percentageUsed || 0)}%</span>
                            <span className="text-xs text-slate-500">₹{summary.totalExpense.toLocaleString()} / ₹{summary.budget.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${isOverBudget ? 'bg-red-500' : 'bg-orange-500'}`}
                                style={{ width: `${budgetPercent}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-navy">Financial Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6 sm:pt-0">
                        <div className="h-[280px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="value" stroke="#00d1b2" fill="#00d1b2" fillOpacity={0.2} strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 border-slate-200 shadow-sm flex flex-col max-h-[400px]">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-navy">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-y-auto">
                        {recentTransactions.length === 0 ? (
                            <div className="flex h-40 flex-col items-center justify-center text-slate-400">
                                <p>No recent activity</p>
                            </div>
                        ) : recentTransactions.map(t => (
                            <TransactionItem key={t._id} transaction={t} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            {isModalOpen && (
                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={addTransaction}
                />
            )}
        </div>
    )
}
