import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

export function TransactionModal({ isOpen, onClose, onSave, transactionToEdit }) {
    const [formData, setFormData] = useState({
        amount: "",
        type: "expense",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        notes: ""
    })

    useEffect(() => {
        if (transactionToEdit && isOpen) {
            setFormData({
                amount: transactionToEdit.amount.toString(),
                type: transactionToEdit.type === 'Credit' ? 'income' : 'expense',
                category: transactionToEdit.category,
                date: transactionToEdit.rawDate || new Date(transactionToEdit.date).toISOString().split("T")[0],
                notes: transactionToEdit.notes || transactionToEdit.title || ""
            })
        } else if (isOpen) {
            setFormData({
                amount: "",
                type: "expense",
                category: "Food",
                date: new Date().toISOString().split("T")[0],
                notes: ""
            })
        }
    }, [transactionToEdit, isOpen])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            ...formData,
            amount: parseFloat(formData.amount)
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
            <div className="w-full max-w-md animate-in zoom-in-95 duration-200">
                <Card className="shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
                        <CardTitle>{transactionToEdit ? "Edit Transaction" : "Add Transaction"}</CardTitle>
                        <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                            <X className="h-5 w-5" />
                        </button>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-navy">Type</label>
                                    <select
                                        className="flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-navy"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-navy">Date</label>
                                    <Input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Amount (₹)</label>
                                <Input
                                    type="number"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Category</label>
                                <select
                                    className="flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-navy"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Food">Food</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Notes</label>
                                <Input
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                                <Button type="submit">{transactionToEdit ? "Save" : "Add"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
