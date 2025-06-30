"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Filter,
    MoreHorizontal,
    Package
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock products data for admin
const initialProducts = [
    {
        id: 1,
        name: "Mountain Bike Pro",
        category: "Bikes",
        price: 899.99,
        stock: 15,
        status: "active",
        createdAt: "2024-01-15",
        sales: 43
    },
    {
        id: 2,
        name: "Gaming Laptop Ultra",
        category: "Electronics",
        price: 1599.99,
        stock: 8,
        status: "active",
        createdAt: "2024-01-10",
        sales: 21
    },
    {
        id: 3,
        name: "Smart Phone X1",
        category: "Electronics",
        price: 799.99,
        stock: 0,
        status: "out_of_stock",
        createdAt: "2024-01-05",
        sales: 67
    },
    {
        id: 4,
        name: "Designer T-Shirt",
        category: "Fashion",
        price: 29.99,
        stock: 50,
        status: "active",
        createdAt: "2024-01-20",
        sales: 89
    },
    {
        id: 5,
        name: "Road Bike Elite",
        category: "Bikes",
        price: 1299.99,
        stock: 3,
        status: "low_stock",
        createdAt: "2024-01-12",
        sales: 12
    },
];

export default function ProductsManagementPage() {
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const getStatusBadge = (status: string, stock: number) => {
        if (status === "out_of_stock" || stock === 0) {
            return <Badge variant="destructive">Out of Stock</Badge>;
        }
        if (status === "low_stock" || stock <= 5) {
            return <Badge variant="secondary">Low Stock</Badge>;
        }
        return <Badge variant="default">Active</Badge>;
    };

    const handleDelete = (productId: number) => {
        setProducts(products.filter(p => p.id !== productId));
        console.log(`Deleted product ${productId}`);
    };

    const handleEdit = (productId: number) => {
        console.log(`Edit product ${productId}`);
    };

    const handleView = (productId: number) => {
        console.log(`View product ${productId}`);
    };

    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.status === "active").length;
    const lowStockProducts = products.filter(p => p.stock <= 5 && p.stock > 0).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
                <p className="text-muted-foreground">
                    Manage your product inventory, pricing, and availability.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                        <Badge variant="default" className="h-4 px-1 text-xs">Active</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeProducts}</div>
                        <p className="text-xs text-muted-foreground">
                            {((activeProducts / totalProducts) * 100).toFixed(1)}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                        <Badge variant="secondary" className="h-4 px-1 text-xs">Low</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{lowStockProducts}</div>
                        <p className="text-xs text-red-600">Requires attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                        <Badge variant="destructive" className="h-4 px-1 text-xs">Out</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{outOfStockProducts}</div>
                        <p className="text-xs text-red-600">Need restocking</p>
                    </CardContent>
                </Card>
            </div>

            {/* Actions and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex flex-1 gap-4 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </div>

                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Simple Table - Desktop View */}
            <div className="hidden md:block">
                <Card>
                    <CardHeader>
                        <CardTitle>Products ({filteredProducts.length})</CardTitle>
                        <CardDescription>Manage your product catalog and inventory.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="text-left p-4 font-medium">Product</th>
                                        <th className="text-left p-4 font-medium">Category</th>
                                        <th className="text-left p-4 font-medium">Price</th>
                                        <th className="text-left p-4 font-medium">Stock</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                        <th className="text-left p-4 font-medium">Sales</th>
                                        <th className="text-left p-4 font-medium">Created</th>
                                        <th className="text-right p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="border-b hover:bg-muted/25 transition-colors">
                                            <td className="p-4 font-medium">{product.name}</td>
                                            <td className="p-4">
                                                <Badge variant="outline">{product.category}</Badge>
                                            </td>
                                            <td className="p-4">${product.price}</td>
                                            <td className="p-4">
                                                <span className={product.stock <= 5 ? "text-red-600 font-medium" : ""}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="p-4">{getStatusBadge(product.status, product.stock)}</td>
                                            <td className="p-4">{product.sales}</td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(product.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleView(product.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Card View - Mobile */}
            <div className="md:hidden space-y-4">
                {filteredProducts.map((product) => (
                    <Card key={product.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-medium text-lg">{product.name}</h3>
                                    <Badge variant="outline" className="mt-1">{product.category}</Badge>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleView(product.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Price:</span>
                                    <div className="font-medium">${product.price}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Stock:</span>
                                    <div className={`font-medium ${product.stock <= 5 ? "text-red-600" : ""}`}>
                                        {product.stock}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Status:</span>
                                    <div className="mt-1">{getStatusBadge(product.status, product.stock)}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Sales:</span>
                                    <div className="font-medium">{product.sales}</div>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                                Created: {new Date(product.createdAt).toLocaleDateString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 