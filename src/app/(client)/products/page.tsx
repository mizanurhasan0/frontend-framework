"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    ShoppingCart,
    Heart,
    Search,
    Filter,
    Star,
    Grid,
    List
} from "lucide-react";

// Mock product data
const products = [
    {
        id: 1,
        name: "Mountain Bike Pro",
        description: "High-performance mountain bike for trail riding",
        price: 899.99,
        originalPrice: 1199.99,
        image: "/images/art11.png",
        category: "Bikes",
        rating: 4.5,
        reviews: 128,
        isNew: false,
        isOnSale: true,
    },
    {
        id: 2,
        name: "Gaming Laptop Ultra",
        description: "Powerful gaming laptop with RTX graphics",
        price: 1599.99,
        originalPrice: null,
        image: "/images/art12.png",
        category: "Electronics",
        rating: 4.8,
        reviews: 89,
        isNew: true,
        isOnSale: false,
    },
    {
        id: 3,
        name: "Smart Phone X1",
        description: "Latest smartphone with advanced camera",
        price: 799.99,
        originalPrice: 899.99,
        image: "/images/art11.png",
        category: "Electronics",
        rating: 4.6,
        reviews: 256,
        isNew: false,
        isOnSale: true,
    },
    {
        id: 4,
        name: "Designer T-Shirt",
        description: "Premium cotton t-shirt with modern design",
        price: 29.99,
        originalPrice: null,
        image: "/images/art12.png",
        category: "Fashion",
        rating: 4.3,
        reviews: 45,
        isNew: true,
        isOnSale: false,
    },
    {
        id: 5,
        name: "Road Bike Elite",
        description: "Lightweight carbon fiber road bike",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "/images/art11.png",
        category: "Bikes",
        rating: 4.7,
        reviews: 73,
        isNew: false,
        isOnSale: true,
    },
    {
        id: 6,
        name: "Wireless Headphones",
        description: "Premium noise-canceling headphones",
        price: 199.99,
        originalPrice: null,
        image: "/images/art12.png",
        category: "Electronics",
        rating: 4.4,
        reviews: 167,
        isNew: false,
        isOnSale: false,
    },
];

export default function ProductsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const addToCart = (productId: number) => {
        // Add to cart functionality - would integrate with cart context/store
        console.log(`Added product ${productId} to cart`);
        // You can implement toast notification here
    };

    const toggleWishlist = (productId: number) => {
        // Wishlist functionality
        console.log(`Toggled wishlist for product ${productId}`);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Our Products</h1>
                <p className="text-muted-foreground">
                    Discover our wide range of high-quality products across multiple categories.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                    <div className="flex border rounded-lg">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="rounded-r-none"
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="rounded-l-none"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Products Grid/List */}
            <div className={
                viewMode === 'grid'
                    ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "space-y-4"
            }>
                {filteredProducts.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                        <CardHeader className="p-0">
                            <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.isNew && (
                                    <Badge className="absolute top-2 left-2 bg-green-600">New</Badge>
                                )}
                                {product.isOnSale && (
                                    <Badge className="absolute top-2 right-2 bg-red-600">Sale</Badge>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => toggleWishlist(product.id)}
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <Badge variant="outline" className="text-xs">
                                    {product.category}
                                </Badge>

                                <CardTitle className="text-lg line-clamp-1">
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {product.name}
                                    </Link>
                                </CardTitle>

                                <CardDescription className="line-clamp-2">
                                    {product.description}
                                </CardDescription>

                                <div className="flex items-center gap-1">
                                    {renderStars(product.rating)}
                                    <span className="text-sm text-muted-foreground ml-1">
                                        ({product.reviews})
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={() => addToCart(product.id)}
                                >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* No results */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No products found matching your search.</p>
                </div>
            )}
        </div>
    );
} 