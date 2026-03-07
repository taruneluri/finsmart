import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TransactionContext } from "../context/TransactionContext"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Wallet, Loader2 } from "lucide-react"
import { register } from "../services/api"
import { toast } from "react-toastify"

export function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { refreshData } = useContext(TransactionContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        setLoading(true);
        try {
            console.log("Attempting registration...", { name: formData.name, email: formData.email });
            const { data } = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            console.log("Registration success!", data);
            localStorage.setItem('profile', JSON.stringify(data));
            refreshData();
            toast.success("Account created successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Registration error:", error);
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
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join FinSmart to start managing your money smartly
                    </p>
                </div>

                <Card className="mt-8 bg-white/80 backdrop-blur-sm shadow-xl border-slate-200">
                    <CardContent className="pt-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="full-name" className="block text-sm font-medium text-navy mb-1.5">
                                        Full Name
                                    </label>
                                    <Input
                                        id="full-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
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
                                        autoComplete="new-password"
                                        required
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-navy mb-1.5">
                                        Confirm Password
                                    </label>
                                    <Input
                                        id="confirm-password"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                        Sign in instead
                    </Link>
                </p>
            </div>
        </div>
    )
}
