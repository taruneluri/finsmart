import { useState, useContext } from "react"
import { Search, Plus, Edit2, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { TransactionItem } from "../components/TransactionItem"
import { TransactionModal } from "../components/TransactionModal"
import { TransactionContext } from "../context/TransactionContext"

export function TransactionsPage() {
    const {
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        loading,
        currentMonth,
        currentYear,
        nextMonth,
        prevMonth
    } = useContext(TransactionContext)

    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("All")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [transactionToEdit, setTransactionToEdit] = useState(null)

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const filteredTransactions = transactions.filter(t => {
        const title = t.notes || t.category;
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === "All" || t.category === filterCategory
        return matchesSearch && matchesCategory;
    })

    const openAddModal = () => {
        setTransactionToEdit(null)
        setIsModalOpen(true)
    }

    const openEditModal = (transaction) => {
        setTransactionToEdit(transaction)
        setIsModalOpen(true)
    }

    const handleSaveTransaction = (transactionData) => {
        if (transactionToEdit) {
            editTransaction(transactionToEdit._id, transactionData)
        } else {
            addTransaction(transactionData)
        }
        setIsModalOpen(false)
    }

    const handleDeleteTransaction = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteTransaction(id)
        }
    }

    if (loading && transactions.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Transactions</h1>
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
                <Button onClick={openAddModal}>
                    <Plus className="h-4 w-4 mr-2" /> Add Transaction
                </Button>
            </div>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-xs"
                        />
                        <select
                            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Salary">Salary</option>
                            <option value="Transport">Transport</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-slate-50 border-y border-slate-100 text-slate-600">
                                <tr>
                                    <th className="px-6 py-4">Transaction</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredTransactions.map(t => (
                                    <tr key={t._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-navy">{t.notes || t.category}</td>
                                        <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded-full text-xs">{t.category}</span></td>
                                        <td className="px-6 py-4">{new Date(t.date).toLocaleDateString()}</td>
                                        <td className={`px-6 py-4 text-right font-bold ${t.type === 'income' ? 'text-primary' : 'text-red-500'}`}>
                                            {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openEditModal(t)} className="p-1 hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                                                <button onClick={() => handleDeleteTransaction(t._id)} className="p-1 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {isModalOpen && (
                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTransaction}
                    transactionToEdit={transactionToEdit}
                />
            )}
        </div>
    )
}
