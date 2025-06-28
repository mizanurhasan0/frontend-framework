"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    ChevronDown,
    ChevronRight,
    Home,
    ShoppingCart,
    Package,
    Users,
    BarChart3,
    Settings,
    FileText,
    Calendar,
    CreditCard,
    Truck,
    Tag,
    FolderOpen,
    Grid,
    Menu,
    X,
} from "lucide-react";

interface MenuItem {
    title: string;
    path?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: MenuItem[];
}

interface SidebarProps {
    className?: string;
    isOpen?: boolean;
    onToggle?: () => void;
}

const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: Home,
    },
    {
        title: "E-commerce",
        icon: ShoppingCart,
        children: [
            { title: "Products", path: "/dashboard/products", icon: Package },
            { title: "Categories", path: "/dashboard/categories", icon: Tag },
            { title: "Orders", path: "/dashboard/orders", icon: FileText },
            { title: "Customers", path: "/dashboard/customers", icon: Users },
        ],
    },
    {
        title: "Inventory",
        icon: Package,
        children: [
            { title: "Stock Management", path: "/dashboard/stock", icon: Grid },
            { title: "Suppliers", path: "/dashboard/suppliers", icon: Truck },
            { title: "Purchase Orders", path: "/dashboard/purchase-orders", icon: CreditCard },
        ],
    },
    {
        title: "School Management",
        icon: Users,
        children: [
            { title: "Students", path: "/dashboard/students", icon: Users },
            { title: "Courses", path: "/dashboard/courses", icon: FileText },
            { title: "Attendance", path: "/dashboard/attendance", icon: Calendar },
            { title: "Grades", path: "/dashboard/grades", icon: BarChart3 },
        ],
    },
    {
        title: "Analytics",
        path: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar({ className, isOpen = true, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const [openItems, setOpenItems] = React.useState<string[]>([]);

    const toggleItem = (title: string) => {
        setOpenItems((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );
    };

    const isActive = (path?: string) => {
        if (!path) return false;
        return pathname === path || pathname.startsWith(path + "/");
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const Icon = item.icon;
        const hasChildren = item.children && item.children.length > 0;
        const isItemOpen = openItems.includes(item.title);
        const isItemActive = isActive(item.path);

        if (hasChildren) {
            return (
                <Collapsible
                    key={item.title}
                    open={isItemOpen}
                    onOpenChange={() => toggleItem(item.title)}
                >
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-between px-3 py-2 h-auto",
                                level > 0 && "ml-4",
                                isItemActive && "bg-accent text-accent-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {Icon && <Icon className="h-4 w-4" />}
                                <span className="text-sm font-medium">{item.title}</span>
                            </div>
                            {isItemOpen ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                        {item.children?.map((child) => renderMenuItem(child, level + 1))}
                    </CollapsibleContent>
                </Collapsible>
            );
        }

        return (
            <Link key={item.title} href={item.path || "#"}>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start px-3 py-2 h-auto",
                        level > 0 && "ml-4",
                        isItemActive && "bg-accent text-accent-foreground"
                    )}
                >
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    <span className="text-sm font-medium">{item.title}</span>
                </Button>
            </Link>
        );
    };

    return (
        <div
            className={cn(
                "flex flex-col bg-card border-r transition-all duration-300",
                isOpen ? "w-64" : "w-16",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                {isOpen && (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">U</span>
                        </div>
                        <span className="font-bold text-lg">Universal</span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="h-8 w-8 p-0"
                >
                    {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {menuItems.map((item) => renderMenuItem(item))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                {isOpen && (
                    <div className="text-xs text-muted-foreground">
                        <p>Universal App v1.0</p>
                        <p>© 2024 All rights reserved</p>
                    </div>
                )}
            </div>
        </div>
    );
} 