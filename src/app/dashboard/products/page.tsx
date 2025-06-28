"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetProducts } from "@/lib/api/hooks";
import { Plus, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data - replace with actual API data
const sampleProducts = [
    {
        id: "1",
        name: "Mountain Bike Pro",
        category: "Bikes",
        price: 1299.99,
        stock: 15,
        status: "active",
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        name: "Road Bike Elite",
        category: "Bikes",
        price: 899.99,
        stock: 8,
        status: "active",
        createdAt: "2024-01-10",
    },
    {
        id: "3",
        name: "Electric Mountain Bike",
        category: "Bikes",
        price: 2499.99,
        stock: 3,
        status: "low-stock",
        createdAt: "2024-01-05",
    },
    {
        id: "4",
        name: "City Commuter Bike",
        category: "Bikes",
        price: 599.99,
        stock: 22,
        status: "active",
        createdAt: "2024-01-20",
    },
    {
        id: "5",
        name: "Folding Bike Compact",
        category: "Bikes",
        price: 799.99,
        stock: 0,
        status: "out-of-stock",
        createdAt: "2024-01-12",
    },
];

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    createdAt: string;
}

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);
            return formatted;
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock = row.getValue("stock") as number;
            return (
                <span className={cn(stock === 0 ? "text-red-600" : stock < 5 ? "text-orange-600" : "text-green-600")}>
                    {stock}
                </span>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge
                    variant={
                        status === "active"
                            ? "default"
                            : status === "low-stock"
                                ? "secondary"
                                : "destructive"
                    }
                >
                    {status.replace("-", " ")}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return date.toLocaleDateString();
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];

export default function ProductsPage() {
    // In a real app, you would use the React Query hook
    // const { data: products, isLoading, error } = useGetProducts();

    // For demo purposes, using sample data
    const products = sampleProducts;
    const isLoading = false;
    const error = null;

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">Loading products...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-destructive">Error loading products</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">
                            Manage your product inventory and catalog.
                        </p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product List</CardTitle>
                    <CardDescription>
                        View and manage all your products with search, sorting, and pagination.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={products}
                        searchKey="name"
                        searchPlaceholder="Search products..."
                    />
                </CardContent>
            </Card>
        </div>
    );
} 