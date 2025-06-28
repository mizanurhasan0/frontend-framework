"use client";
import { TextEditor } from "@/components/forms/text-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    const stats = [
        { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month" },
        { title: "Subscriptions", value: "+2350", description: "+180.1% from last month" },
        { title: "Sales", value: "+12,234", description: "+19% from last month" },
        { title: "Active Now", value: "+573", description: "+201 since last hour" },
    ];

    const recentActivity = [
        { action: "New order received", time: "2 minutes ago", user: "John Doe" },
        { action: "Product updated", time: "5 minutes ago", user: "Jane Smith" },
        { action: "Payment processed", time: "10 minutes ago", user: "Mike Johnson" },
        { action: "Inventory low alert", time: "15 minutes ago", user: "System" },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your universal web app dashboard. Here's an overview of your application.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Activity */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest updates and activities in your application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                                        <p className="text-sm text-muted-foreground">
                                            by {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks and shortcuts for your application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                <h4 className="font-medium">Add New Product</h4>
                                <p className="text-sm text-muted-foreground">Create a new product listing</p>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                <h4 className="font-medium">View Orders</h4>
                                <p className="text-sm text-muted-foreground">Check recent orders</p>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                <h4 className="font-medium">Analytics Report</h4>
                                <p className="text-sm text-muted-foreground">Generate performance report</p>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                <h4 className="font-medium">Settings</h4>
                                <p className="text-sm text-muted-foreground">Configure your application</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <TextEditor value="" variant="full" placeholder="this is a placeholder" />
        </div>
    );
} 