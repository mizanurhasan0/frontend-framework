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
    Users,
    UserCheck,
    UserX,
    Shield
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock users data for admin
const initialUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "customer",
        status: "active",
        joinedAt: "2024-01-15",
        orders: 12,
        totalSpent: 1299.99
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "admin",
        status: "active",
        joinedAt: "2023-12-10",
        orders: 0,
        totalSpent: 0
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        role: "customer",
        status: "suspended",
        joinedAt: "2024-01-05",
        orders: 3,
        totalSpent: 459.97
    },
    {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        role: "customer",
        status: "active",
        joinedAt: "2024-01-20",
        orders: 8,
        totalSpent: 789.45
    },
    {
        id: 5,
        name: "Alex Brown",
        email: "alex.brown@example.com",
        role: "moderator",
        status: "active",
        joinedAt: "2024-01-12",
        orders: 2,
        totalSpent: 199.98
    },
];

export default function UsersManagementPage() {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        if (status === "active") {
            return <Badge variant="default">Active</Badge>;
        }
        if (status === "suspended") {
            return <Badge variant="destructive">Suspended</Badge>;
        }
        return <Badge variant="secondary">Inactive</Badge>;
    };

    const getRoleBadge = (role: string) => {
        if (role === "admin") {
            return <Badge variant="destructive">Admin</Badge>;
        }
        if (role === "moderator") {
            return <Badge variant="secondary">Moderator</Badge>;
        }
        return <Badge variant="outline">Customer</Badge>;
    };

    const handleDelete = (userId: number) => {
        setUsers(users.filter(u => u.id !== userId));
        console.log(`Deleted user ${userId}`);
    };

    const handleEdit = (userId: number) => {
        console.log(`Edit user ${userId}`);
    };

    const handleView = (userId: number) => {
        console.log(`View user ${userId}`);
    };

    const handleSuspend = (userId: number) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === "suspended" ? "active" : "suspended" }
                : user
        ));
        console.log(`Toggled suspension for user ${userId}`);
    };

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === "active").length;
    const adminUsers = users.filter(u => u.role === "admin").length;
    const suspendedUsers = users.filter(u => u.status === "suspended").length;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
                <p className="text-muted-foreground">
                    Manage user accounts, roles, and permissions.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">+3 from last week</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {((activeUsers / totalUsers) * 100).toFixed(1)}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admins</CardTitle>
                        <Shield className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminUsers}</div>
                        <p className="text-xs text-muted-foreground">System administrators</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Suspended</CardTitle>
                        <UserX className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{suspendedUsers}</div>
                        <p className="text-xs text-red-600">Require attention</p>
                    </CardContent>
                </Card>
            </div>

            {/* Actions and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex flex-1 gap-4 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search users..."
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
                    Add User
                </Button>
            </div>

            {/* Simple Table - Desktop View */}
            <div className="hidden md:block">
                <Card>
                    <CardHeader>
                        <CardTitle>Users ({filteredUsers.length})</CardTitle>
                        <CardDescription>Manage user accounts and permissions.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="text-left p-4 font-medium">User</th>
                                        <th className="text-left p-4 font-medium">Email</th>
                                        <th className="text-left p-4 font-medium">Role</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                        <th className="text-left p-4 font-medium">Orders</th>
                                        <th className="text-left p-4 font-medium">Total Spent</th>
                                        <th className="text-left p-4 font-medium">Joined</th>
                                        <th className="text-right p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-muted/25 transition-colors">
                                            <td className="p-4 font-medium">{user.name}</td>
                                            <td className="p-4 text-muted-foreground">{user.email}</td>
                                            <td className="p-4">{getRoleBadge(user.role)}</td>
                                            <td className="p-4">{getStatusBadge(user.status)}</td>
                                            <td className="p-4">{user.orders}</td>
                                            <td className="p-4">
                                                {user.totalSpent > 0 ? `$${user.totalSpent.toFixed(2)}` : "-"}
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(user.joinedAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleView(user.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleSuspend(user.id)}
                                                            className={user.status === "suspended" ? "text-green-600" : "text-orange-600"}
                                                        >
                                                            {user.status === "suspended" ? (
                                                                <>
                                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <UserX className="mr-2 h-4 w-4" />
                                                                    Suspend
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(user.id)}
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
                {filteredUsers.map((user) => (
                    <Card key={user.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-medium text-lg">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                    <div className="flex gap-2 mt-2">
                                        {getRoleBadge(user.role)}
                                        {getStatusBadge(user.status)}
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleView(user.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleSuspend(user.id)}
                                            className={user.status === "suspended" ? "text-green-600" : "text-orange-600"}
                                        >
                                            {user.status === "suspended" ? (
                                                <>
                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                    Activate
                                                </>
                                            ) : (
                                                <>
                                                    <UserX className="mr-2 h-4 w-4" />
                                                    Suspend
                                                </>
                                            )}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(user.id)}
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
                                    <span className="text-muted-foreground">Orders:</span>
                                    <div className="font-medium">{user.orders}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Total Spent:</span>
                                    <div className="font-medium">
                                        {user.totalSpent > 0 ? `$${user.totalSpent.toFixed(2)}` : "-"}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                                Joined: {new Date(user.joinedAt).toLocaleDateString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 