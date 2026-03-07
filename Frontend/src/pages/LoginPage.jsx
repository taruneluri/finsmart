import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TransactionContext } from "../context/TransactionContext"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Wallet, Loader2 } from "lucide-react"
import { login } from "../services/api"
import { toast } from "react-toastify"

export function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { refreshData } = useContext(TransactionContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Attempting login...", formData);
            const { data } = await login(formData);
            console.log("Login success!", data);
            localStorage.setItem('profile', JSON.stringify(data));
            refreshData();
            toast.success("Login successful!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm mb-4">
                        <Wallet className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-navy">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <Card className="mt-8 bg-white/80 backdrop-blur-sm shadow-xl border-slate-200">
                    <CardContent className="pt-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email-address" className="block text-sm font-medium text-navy mb-1.5">
                                        Email address
                                    </label>
                                    <Input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary transition-colors cursor-pointer"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary hover:text-primary-dark transition-colors">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    )
}
