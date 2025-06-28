import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
    className?: string;
}

export function Footer({ className }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn("border-t bg-background", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">U</span>
                            </div>
                            <span className="font-bold text-xl">Universal App</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            A comprehensive web application template for building scalable and modern applications.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Analytics
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    API Reference
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/license" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    License
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Universal App. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Status
                        </Link>
                        <Link href="/changelog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Changelog
                        </Link>
                        <Link href="/github" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
} 