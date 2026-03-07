import { ArrowRight, BarChart3, PieChart, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"

const features = [
    {
        title: "Expense Tracking",
        description: "Monitor your daily spending with automatic categorization and smart insights.",
        icon: BarChart3,
    },
    {
        title: "Budget Goals",
        description: "Set personalized budgets and get notified when you're close to your limits.",
        icon: PieChart,
    },
    {
        title: "Smart Insights",
        description: "Real-time analytics to help you understand your spending habits and save more.",
        icon: ShieldCheck,
    },
]

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl md:text-6xl">
                        Take Control of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Finances</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                        Smart expense tracking, budget goals, and actionable financial insights to help you build wealth and achieve financial freedom.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="w-full sm:w-auto group">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-navy">Everything you need</h2>
                        <p className="mt-4 text-lg text-slate-600">Powerful features to manage your money effectively.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title} className="bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t border-slate-200 bg-white py-8">
                <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 text-navy font-bold text-lg mb-4 md:mb-0">
                        <span>FinSmart © 2026</span>
                    </div>
                    <div className="flex space-x-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
