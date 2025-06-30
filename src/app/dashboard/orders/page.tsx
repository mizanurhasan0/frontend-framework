"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SimpleTable } from "@/components/ui/simple-table";
import {
    Search,
    Filter,
    Eye,
    Package,
    DollarSign,
    ShoppingCart,
    Clock
} from "lucide-react";

// Mock orders data
const orders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        email: "john@example.com",
        status: "completed",
        total: 299.99,
        items: 3,
        date: "2024-01-20",
        paymentMethod: "Credit Card"
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        email: "jane@example.com",
        status: "pending",
        total: 159.50,
        items: 2,
        date: "2024-01-20",
        paymentMethod: "PayPal"
    },
    {
        id: "ORD-003",
        customer: "Mike Johnson",
        email: "mike@example.com",
        status: "shipped",
        total: 89.99,
        items: 1,
        date: "2024-01-19",
        paymentMethod: "Credit Card"
    },
    {
        id: "ORD-004",
        customer: "Sarah Wilson",
        email: "sarah@example.com",
        status: "cancelled",
        total: 199.99,
        items: 2,
        date: "2024-01-19",
        paymentMethod: "Debit Card"
    },
    {
        id: "ORD-005",
        customer: "Alex Brown",
        email: "alex@example.com",
        status: "processing",
        total: 449.99,
        items: 4,
        date: "2024-01-18",
        paymentMethod: "Credit Card"
    },
];

type Order = typeof orders[0];

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOrders = orders.filter(order =>
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        const variants = {
            completed: { variant: "default" as const, text: "Completed" },
            pending: { variant: "secondary" as const, text: "Pending" },
            shipped: { variant: "default" as const, text: "Shipped" },
            cancelled: { variant: "destructive" as const, text: "Cancelled" },
            processing: { variant: "secondary" as const, text: "Processing" },
        };

        const config = variants[status as keyof typeof variants];
        return <Badge variant={config.variant}>{config.text}</Badge>;
    };

    const handleViewOrder = (order: Order) => {
        console.log("Viewing order:", order.id);
    };

    // Define table columns - Simple and customizable!
    const columns = [
        {
            key: "id",
            header: "Order ID",
            className: "font-mono",
        },
        {
            key: "customer",
            header: "Customer",
            render: (order: Order) => (
                <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                </div>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (order: Order) => getStatusBadge(order.status),
        },
        {
            key: "total",
            header: "Total",
            render: (order: Order) => (
                <span className="font-medium">${order.total.toFixed(2)}</span>
            ),
            className: "text-right",
            headerClassName: "text-right",
        },
        {
            key: "items",
            header: "Items",
            className: "text-center",
            headerClassName: "text-center",
        },
        {
            key: "date",
            header: "Date",
            render: (order: Order) => new Date(order.date).toLocaleDateString(),
            className: "text-muted-foreground",
        },
        {
            key: "actions",
            header: "Actions",
            render: (order: Order) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewOrder(order)}
                >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                </Button>
            ),
            className: "text-right",
            headerClassName: "text-right",
        },
    ];

    // Stats calculations
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "completed").length;
    const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;
    const totalRevenue = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
                <p className="text-muted-foreground">
                    Track and manage customer orders and payments.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <Package className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedOrders}</div>
                        <p className="text-xs text-muted-foreground">Successfully delivered</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                        <p className="text-xs text-orange-600">Require attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">From completed orders</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex flex-1 gap-4 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search orders..."
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
            </div>

            {/* Simple Table - Look how clean this is! */}
            <Card>
                <CardHeader>
                    <CardTitle>Orders ({filteredOrders.length})</CardTitle>
                    <CardDescription>Manage customer orders and track their status.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <SimpleTable
                        data={filteredOrders}
                        columns={columns}
                        onRowClick={(order) => console.log("Clicked row:", order.id)}
                        emptyMessage="No orders found matching your search."
                        rowClassName={(order) =>
                            order.status === "cancelled" ? "opacity-60" : ""
                        }
                    />
                </CardContent>
            </Card>
        </div>
    );
} 