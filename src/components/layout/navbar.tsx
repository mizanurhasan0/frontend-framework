"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, ShoppingCart, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { theme, setTheme } = useTheme();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    const navigation = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Products", href: "/products" },
        { name: "Orders", href: "/orders" },
        { name: "Analytics", href: "/analytics" },
    ];

    return (
        <nav className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">U</span>
                            </div>
                            <span className="font-bold text-xl">Universal App</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>

                        <Link
                            href="/cart"
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/profile"
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                            <User className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/settings"
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                            <Settings className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t pt-4 pb-3">
                            <div className="flex items-center space-x-4 px-3">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="h-5 w-5" />
                                    ) : (
                                        <Moon className="h-5 w-5" />
                                    )}
                                </button>

                                <Link
                                    href="/cart"
                                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="/profile"
                                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="/settings"
                                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Settings className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 