"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
    Bike,
    Car,
    Laptop,
    Smartphone,
    Shirt,
    Shoe,
    Watch,
    Camera,
    Headphones,
    Gamepad2,
    BookOpen,
    Home,
    Wrench,
    Heart,
    Star,
} from "lucide-react";

interface Category {
    id: string;
    name: string;
    path: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: Category[];
}

const categories: Category[] = [
    {
        id: "bikes",
        name: "Bikes",
        path: "/category/bikes",
        icon: Bike,
        children: [
            {
                id: "mountain-bikes",
                name: "Mountain Bikes",
                path: "/category/bikes/mountain",
                children: [
                    { id: "electric-mountain", name: "Electric Mountain", path: "/category/bikes/mountain/electric" },
                    { id: "trail-bikes", name: "Trail Bikes", path: "/category/bikes/mountain/trail" },
                ],
            },
            {
                id: "road-bikes",
                name: "Road Bikes",
                path: "/category/bikes/road",
                children: [
                    { id: "racing-bikes", name: "Racing Bikes", path: "/category/bikes/road/racing" },
                    { id: "touring-bikes", name: "Touring Bikes", path: "/category/bikes/road/touring" },
                ],
            },
            {
                id: "city-bikes",
                name: "City Bikes",
                path: "/category/bikes/city",
                children: [
                    { id: "commuter-bikes", name: "Commuter Bikes", path: "/category/bikes/city/commuter" },
                    { id: "folding-bikes", name: "Folding Bikes", path: "/category/bikes/city/folding" },
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
                    { id: "kids", name: "Kids", path: "/category/fashion/clothing/kids" },
                ],
            },
            {
                id: "shoes",
                name: "Shoes",
                path: "/category/fashion/shoes",
                icon: Shoe,
                children: [
                    { id: "sneakers", name: "Sneakers", path: "/category/fashion/shoes/sneakers" },
                    { id: "boots", name: "Boots", path: "/category/fashion/shoes/boots" },
                ],
            },
        ],
    },
    {
        id: "sports",
        name: "Sports",
        path: "/category/sports",
        icon: Gamepad2,
        children: [
            {
                id: "outdoor",
                name: "Outdoor",
                path: "/category/sports/outdoor",
                children: [
                    { id: "camping", name: "Camping", path: "/category/sports/outdoor/camping" },
                    { id: "hiking", name: "Hiking", path: "/category/sports/outdoor/hiking" },
                ],
            },
            {
                id: "fitness",
                name: "Fitness",
                path: "/category/sports/fitness",
                children: [
                    { id: "gym-equipment", name: "Gym Equipment", path: "/category/sports/fitness/gym" },
                    { id: "yoga", name: "Yoga", path: "/category/sports/fitness/yoga" },
                ],
            },
        ],
    },
];

interface CategoryNavbarProps {
    className?: string;
}

export function CategoryNavbar({ className }: CategoryNavbarProps) {
    const pathname = usePathname();

    const renderCategoryItem = (category: Category, level = 0) => {
        const Icon = category.icon;
        const hasChildren = category.children && category.children.length > 0;
        const isActive = pathname === category.path;

        if (hasChildren) {
            return (
                <DropdownMenuSub key={category.id}>
                    <DropdownMenuSubTrigger
                        className={cn(
                            "flex items-center gap-2",
                            isActive && "bg-accent text-accent-foreground"
                        )}
                    >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{category.name}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48">
                        {category.children?.map((child) => renderCategoryItem(child, level + 1))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            );
        }

        return (
            <DropdownMenuItem key={category.id} asChild>
                <Link
                    href={category.path}
                    className={cn(
                        "flex items-center gap-2",
                        isActive && "bg-accent text-accent-foreground"
                    )}
                >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{category.name}</span>
                </Link>
            </DropdownMenuItem>
        );
    };

    return (
        <nav className={cn("bg-background border-b", className)}>
            <div className="container mx-auto px-4">
                <div className="flex items-center space-x-8">
                    {/* Featured Categories */}
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/category/featured"
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Star className="h-4 w-4" />
                            Featured
                        </Link>
                        <Link
                            href="/category/new"
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Heart className="h-4 w-4" />
                            New Arrivals
                        </Link>
                        <Link
                            href="/category/sale"
                            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                            <span className="font-bold">SALE</span>
                        </Link>
                    </div>

                    {/* Category Dropdowns */}
                    <div className="flex items-center space-x-2">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = pathname === category.path;

                            return (
                                <DropdownMenu key={category.id}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "flex items-center gap-1 text-sm font-medium",
                                                isActive && "bg-accent text-accent-foreground"
                                            )}
                                        >
                                            {Icon && <Icon className="h-4 w-4" />}
                                            {category.name}
                                            <ChevronDown className="h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        {category.children?.map((child) => renderCategoryItem(child))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={category.path} className="flex items-center gap-2">
                                                <span>View All {category.name}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
} 