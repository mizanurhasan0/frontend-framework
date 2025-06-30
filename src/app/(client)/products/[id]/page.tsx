"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    ShoppingCart,
    Heart,
    Star,
    ArrowLeft,
    Share,
    Truck,
    Shield,
    RotateCcw,
    Minus,
    Plus
} from "lucide-react";

// Mock product data (in real app, this would come from API)
const getProduct = (id: string) => {
    const products = {
        "1": {
            id: 1,
            name: "Mountain Bike Pro",
            description: "High-performance mountain bike designed for serious trail riders. Features premium components and rugged construction.",
            price: 899.99,
            originalPrice: 1199.99,
            images: ["/images/art11.png", "/images/art12.png", "/images/art11.png"],
            category: "Bikes",
            rating: 4.5,
            reviews: 128,
            isNew: false,
            isOnSale: true,
            inStock: true,
            stockCount: 15,
            sku: "MTB-PRO-001",
            features: [
                "Aluminum alloy frame",
                "21-speed Shimano drivetrain",
                "Front and rear disc brakes",
                "26-inch wheels",
                "Adjustable suspension"
            ],
            specifications: {
                "Frame Material": "Aluminum Alloy",
                "Wheel Size": "26 inches",
                "Gears": "21-speed",
                "Brakes": "Disc brakes",
                "Weight": "15.5 kg",
                "Max Rider Weight": "120 kg"
            }
        },
        "2": {
            id: 2,
            name: "Gaming Laptop Ultra",
            description: "Powerful gaming laptop with cutting-edge RTX graphics and high-refresh display for the ultimate gaming experience.",
            price: 1599.99,
            originalPrice: null,
            images: ["/images/art12.png", "/images/art11.png", "/images/art12.png"],
            category: "Electronics",
            rating: 4.8,
            reviews: 89,
            isNew: true,
            isOnSale: false,
            inStock: true,
            stockCount: 8,
            sku: "LAP-GAME-002",
            features: [
                "Intel i7 processor",
                "RTX 3070 graphics card",
                "16GB DDR4 RAM",
                "1TB NVMe SSD",
                "144Hz display"
            ],
            specifications: {
                "Processor": "Intel Core i7-11800H",
                "Graphics": "NVIDIA RTX 3070",
                "RAM": "16GB DDR4",
                "Storage": "1TB NVMe SSD",
                "Display": "15.6\" 144Hz Full HD",
                "Weight": "2.3 kg"
            }
        }
    };

    return products[id as keyof typeof products] || null;
};

export default function ProductPage() {
    const params = useParams();
    const product = getProduct(params.id as string);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-2">Product not found</h1>
                    <p className="text-muted-foreground mb-6">
                        The product you're looking for doesn't exist.
                    </p>
                    <Button asChild>
                        <Link href="/products">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Products
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

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

    const addToCart = () => {
        console.log(`Added ${quantity} of product ${product.id} to cart`);
        // Implement cart functionality
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        console.log(`Toggled wishlist for product ${product.id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-foreground">Products</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-foreground">
                        {product.category}
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{product.name}</span>
                </nav>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                        {product.isNew && (
                            <Badge className="absolute top-4 left-4 bg-green-600">New</Badge>
                        )}
                        {product.isOnSale && (
                            <Badge className="absolute top-4 right-4 bg-red-600">Sale</Badge>
                        )}
                    </div>

                    <div className="flex space-x-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-muted'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-2">{product.category}</Badge>
                        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                        <p className="text-muted-foreground mt-2">{product.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                        {product.isOnSale && (
                            <Badge variant="destructive">
                                Save ${(product.originalPrice! - product.price).toFixed(2)}
                            </Badge>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        {product.inStock ? (
                            <>
                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-green-600">
                                    In stock ({product.stockCount} available)
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-red-600">Out of stock</span>
                            </>
                        )}
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium">Quantity:</label>
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                                    disabled={quantity >= product.stockCount}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                className="flex-1"
                                size="lg"
                                onClick={addToCart}
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={toggleWishlist}
                            >
                                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                            </Button>
                            <Button variant="outline" size="lg">
                                <Share className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Features */}
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="font-semibold mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm">
                                        <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Shipping Info */}
                    <div className="grid gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span>Free shipping on orders over $100</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span>2-year warranty included</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RotateCcw className="h-4 w-4 text-muted-foreground" />
                            <span>30-day return policy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12">
                <Tabs defaultValue="specifications" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                    </TabsList>

                    <TabsContent value="specifications" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Product Specifications</h3>
                                <div className="grid gap-3">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                                            <span className="font-medium">{key}</span>
                                            <span className="text-muted-foreground">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                                <p className="text-muted-foreground">
                                    Reviews functionality would be implemented here with real customer feedback.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="shipping" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Shipping & Returns</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <h4 className="font-medium">Shipping Information</h4>
                                        <p className="text-muted-foreground">
                                            Free standard shipping on orders over $100. Express shipping available for $15.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Return Policy</h4>
                                        <p className="text-muted-foreground">
                                            30-day return policy. Items must be in original condition with tags attached.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 