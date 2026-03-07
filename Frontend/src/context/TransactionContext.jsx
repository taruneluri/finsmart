import { createContext, useState, useEffect, useCallback } from "react"
import * as api from "../services/api"
import { toast } from "react-toastify"

export const TransactionContext = createContext()

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState([])
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        savings: 0,
        budget: 0,
        percentageUsed: 0
    })
    const [loading, setLoading] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const loadData = useCallback(async () => {
        const profile = localStorage.getItem('profile')
        if (!profile) return

        setLoading(true)
        try {
            const params = { month: currentMonth, year: currentYear }
            const { data: transData } = await api.fetchTransactions(params)
            const { data: summaryData } = await api.fetchBudgetSummary(params)
            setTransactions(transData)
            setSummary(summaryData)
        } catch (error) {
            console.error("Failed to fetch data", error)
            if (error.response?.status === 401) {
                localStorage.removeItem('profile')
            }
        } finally {
            setLoading(false)
        }
    }, [currentMonth, currentYear])

    useEffect(() => {
        loadData()
    }, [loadData])

    const clearData = () => {
        setTransactions([])
        setSummary({
            totalIncome: 0,
            totalExpense: 0,
            savings: 0,
            budget: 0,
            percentageUsed: 0
        })
        setCurrentMonth(new Date().getMonth() + 1)
        setCurrentYear(new Date().getFullYear())
    }

    const nextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1)
            setCurrentYear(prev => prev + 1)
        } else {
            setCurrentMonth(prev => prev + 1)
        }
    }

    const prevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12)
            setCurrentYear(prev => prev - 1)
        } else {
            setCurrentMonth(prev => prev - 1)
        }
    }

    const value = {
        transactions,
        summary,
        loading,
        currentMonth,
        currentYear,
        nextMonth,
        prevMonth,
        setCurrentMonth,
        setCurrentYear,
        addTransaction: async (data) => {
            await api.createTransaction(data)
            toast.success("Transaction added")
            loadData()
        },
        editTransaction: async (id, data) => {
            await api.updateTransaction(id, data)
            toast.success("Transaction updated")
            loadData()
        },
        deleteTransaction: async (id) => {
            await api.deleteTransaction(id)
            toast.success("Transaction deleted")
            loadData()
        },
        refreshData: loadData,
        clearData,
        totalBalance: summary.savings,
        monthlyIncome: summary.totalIncome,
        monthlyExpenses: summary.totalExpense
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}
