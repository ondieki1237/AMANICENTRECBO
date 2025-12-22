"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ModernNavbar from "../../../components/modern-navbar";
import Footer from "../../../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { AlertCircle, ShieldAlert, Key, Globe } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const getErrorDetails = (err: string | null) => {
        switch (err) {
            case "Configuration":
                return {
                    title: "Server Configuration Error",
                    icon: <AlertCircle className="h-12 w-12 text-red-500" />,
                    message: "There is a problem with the server-side configuration of NextAuth.",
                    suggestion: "This usually means NEXTAUTH_SECRET is missing or the backend URL is misconfigured in your production environment (Vercel/Render).",
                    steps: [
                        "Check that NEXTAUTH_SECRET is set in your Vercel/production environment variables.",
                        "Ensure NEXT_PUBLIC_BACKEND_URL is set correctly.",
                        "Verify that NEXTAUTH_URL matches your production domain (e.g., https://www.amanicentercbo.org)."
                    ]
                };
            case "AccessDenied":
                return {
                    title: "Access Denied",
                    icon: <ShieldAlert className="h-12 w-12 text-orange-500" />,
                    message: "You do not have permission to sign in.",
                    suggestion: "This could be due to restricted roles or a failed authorization check on the backend.",
                    steps: [
                        "Verify your user credentials.",
                        "Ensure your account has 'admin' privileges if accessing the dashboard."
                    ]
                };
            case "CredentialsSignin":
                return {
                    title: "Invalid Credentials",
                    icon: <Key className="h-12 w-12 text-blue-500" />,
                    message: "The email or password you entered is incorrect.",
                    suggestion: "Please try signing in again with the correct information.",
                    steps: ["Check for typos in your email.", "Reset your password if needed."]
                };
            default:
                return {
                    title: "Authentication Error",
                    icon: <Globe className="h-12 w-12 text-gray-500" />,
                    message: "An unexpected error occurred during authentication.",
                    suggestion: `Error Code: ${err || "Unknown"}`,
                    steps: ["Check server logs for detailed trace information.", "Ensure the backend API is up and reachable."]
                };
        }
    };

    const details = getErrorDetails(error);

    return (
        <div className="max-w-2xl mx-auto px-4 py-16">
            <Card className="border-t-4 border-t-red-500 shadow-xl">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">{details.icon}</div>
                    <CardTitle className="text-2xl font-bold font-display">{details.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <p className="text-gray-700 text-center text-lg">{details.message}</p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Likely Cause:</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{details.suggestion}</p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Recommended Steps:</h4>
                        <ul className="space-y-2">
                            {details.steps.map((step, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-600">
                                    <span className="bg-emerald-100 text-emerald-700 rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5 shrink-0">
                                        {i + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/admin/signin" className="flex-1">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Try Again</Button>
                        </Link>
                        <Link href="/" className="flex-1">
                            <Button variant="outline" className="w-full">Return Home</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AdminErrorPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <ModernNavbar />
            <main className="flex-grow flex items-center justify-center">
                <Suspense fallback={<div>Loading error details...</div>}>
                    <ErrorContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
