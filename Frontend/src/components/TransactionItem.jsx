import { BadgeDollarSign, CreditCard, ShoppingBag, Utensils, Edit2, Trash2, Zap, Car, Tags } from "lucide-react"
import { cn } from "../lib/utils"

const categoryIcons = {
    Food: Utensils,
    Shopping: ShoppingBag,
    Salary: BadgeDollarSign,
    Subscriptions: CreditCard,
    Transport: Car,
    Utilities: Zap,
    Other: Tags
}

export function TransactionItem({ transaction, onEdit, onDelete }) {
    const Icon = categoryIcons[transaction.category] || CreditCard
    const isCredit = transaction.type === "Credit" || transaction.type === "income"
    const displayTitle = transaction.notes || transaction.title || transaction.category
    const displayId = transaction._id || transaction.id

    return (
        <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 relative group">
            <div className="flex items-center gap-4 flex-1 overflow-hidden">
                <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105",
                    isCredit ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
                )}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="truncate pr-4">
                    <p className="font-medium text-navy truncate">{displayTitle}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 truncate mt-0.5">
                        <span className="whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 whitespace-nowrap">{transaction.category}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <div className="font-semibold text-right">
                    <span className={cn(
                        "inline-block transition-transform group-hover:-translate-y-0.5",
                        isCredit ? "text-primary" : "text-red-500"
                    )}>
                        {isCredit ? "+" : "-"}₹{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                </div>

                {(onEdit || onDelete) && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(transaction)}
                                className="p-1.5 text-slate-400 hover:text-navy hover:bg-slate-200 rounded-md transition-colors"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(displayId)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
