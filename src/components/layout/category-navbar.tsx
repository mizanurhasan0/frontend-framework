"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    Bike,
    Laptop,
    Smartphone,
    Shirt,
    ShoppingBag,
    Gamepad2,
    Star,
    Heart,
} from "lucide-react";

const featuredLinks = [
    { name: "Featured", path: "/category/featured", icon: Star },
    { name: "New", path: "/category/new", icon: Heart },
    { name: "SALE", path: "/category/sale", className: "text-red-600 font-bold" },
];

const categories = [
    {
        id: "bikes",
        name: "Bikes",
        path: "/category/bikes",
        icon: Bike,
        children: [
            {
                id: "mountain",
                name: "Mountain",
                path: "/category/bikes/mountain",
                children: [
                    { id: "electric", name: "Electric", path: "/category/bikes/mountain/electric" },
                    { id: "trail", name: "Trail", path: "/category/bikes/mountain/trail" },
                    { id: "downhill", name: "Downhill", path: "/category/bikes/mountain/downhill" },
                ],
            },
            {
                id: "road",
                name: "Road",
                path: "/category/bikes/road",
                children: [
                    { id: "racing", name: "Racing", path: "/category/bikes/road/racing" },
                    { id: "touring", name: "Touring", path: "/category/bikes/road/touring" },
                ],
            },
        ],
    },
    {
        id: "electronics",
        name: "Electronics",
        path: "/category/electronics",
        icon: Laptop,
        children: [
            {
                id: "computers",
                name: "Computers",
                path: "/category/electronics/computers",
                children: [
                    { id: "laptops", name: "Laptops", path: "/category/electronics/computers/laptops" },
                    { id: "desktops", name: "Desktops", path: "/category/electronics/computers/desktops" },
                ],
            },
            {
                id: "phones",
                name: "Phones",
                path: "/category/electronics/phones",
                icon: Smartphone,
                children: [
                    { id: "smartphones", name: "Smartphones", path: "/category/electronics/phones/smartphones" },
                    { id: "accessories", name: "Accessories", path: "/category/electronics/phones/accessories" },
                ],
            },
        ],
    },
    {
        id: "fashion",
        name: "Fashion",
        path: "/category/fashion",
        icon: Shirt,
        children: [
            {
                id: "clothing",
                name: "Clothing",
                path: "/category/fashion/clothing",
                children: [
                    { id: "men", name: "Men", path: "/category/fashion/clothing/men" },
                    { id: "women", name: "Women", path: "/category/fashion/clothing/women" },
                ],
            },
        ],
    },
];

const NavItem = ({ item, mobile = false, level = 0 }) => {
    const pathname = usePathname();
    const Icon = item.icon;
    const hasChildren = item.children?.length > 0;

    if (hasChildren) {
        return mobile ? (
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex justify-between items-center" style={{ paddingLeft: `${level * 16}px` }}>
                        <span className="flex items-center gap-2">{Icon && <Icon className="h-4 w-4" />} {item.name}</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {item.children.map((child) => (
                        <NavItem key={child.id} item={child} mobile level={level + 1} />
                    ))}
                </CollapsibleContent>
            </Collapsible>
        ) : (
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />} {item.name}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    {item.children.map((child) => (
                        <NavItem key={child.id} item={child} />
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        );
    }

    return mobile ? (
        <Link
            href={item.path}
            className={cn("block px-4 py-2 text-sm", pathname === item.path ? "text-primary font-medium" : "text-muted-foreground")}
        >
            {Icon && <Icon className="h-4 w-4 inline-block mr-2" />} {item.name}
        </Link>
    ) : (
        <DropdownMenuItem asChild>
            <Link href={item.path} className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />} {item.name}
            </Link>
        </DropdownMenuItem>
    );
};

export function CategoryNavbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <nav className="border-b bg-background sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center md:space-x-6">
                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <Button variant="ghost" size="sm" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Desktop Featured Links */}
                <div className="hidden md:flex space-x-6">
                    {featuredLinks.map((link) => (
                        <Link key={link.name} href={link.path} className={cn("flex items-center gap-2 text-sm", link.className)}>
                            {link.icon && <link.icon className="h-4 w-4" />} {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Categories */}
                <div className="hidden md:flex items-center space-x-2">
                    {categories.map((cat) => (
                        <DropdownMenu key={cat.id}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-1 text-sm">
                                    {cat.icon && <cat.icon className="h-4 w-4" />} {cat.name} <ChevronDown className="h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {cat.children?.map((child) => <NavItem key={child.id} item={child} />)}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t py-4">
                    {categories.map((cat) => (
                        <NavItem key={cat.id} item={cat} mobile />
                    ))}
                </div>
            )}
        </nav>
    );
}
