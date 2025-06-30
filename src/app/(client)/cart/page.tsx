"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ArrowLeft,
    CreditCard
} from "lucide-react";

// Mock cart data
const initialCartItems = [
    {
        id: 1,
        name: "Mountain Bike Pro",
        price: 899.99,
        quantity: 1,
        image: "/images/art11.png",
        category: "Bikes",
    },
    {
        id: 2,
        name: "Gaming Laptop Ultra",
        price: 1599.99,
        quantity: 1,
        image: "/images/art12.png",
        category: "Electronics",
    },
    {
        id: 3,
        name: "Smart Phone X1",
        price: 799.99,
        quantity: 2,
        image: "/images/art11.png",
        category: "Electronics",
    },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [promoCode, setPromoCode] = useState("");

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity === 0) {
            removeItem(id);
            return;
        }

        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08; // 8% tax
    const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
    const total = subtotal + shipping + tax - discount;

    const applyPromoCode = () => {
        // Apply promo code logic
        console.log("Applying promo code:", promoCode);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Button asChild>
                        <Link href="/products">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Shopping Cart</h1>
                <p className="text-muted-foreground">
                    Review your items and proceed to checkout when ready.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Items in your cart ({cartItems.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {cartItems.map((item, index) => (
                                <div key={item.id}>
                                    <div className="flex items-center gap-4 p-6">
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.category}</p>
                                            <p className="font-bold">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>

                                            <span className="w-8 text-center">{item.quantity}</span>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:text-red-700 mt-1"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {index < cartItems.length - 1 && <Separator />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="mt-6">
                        <Button variant="outline" asChild>
                            <Link href="/products">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Continue Shopping
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}

                            <Separator />

                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            {subtotal < 100 && (
                                <p className="text-sm text-muted-foreground">
                                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                                </p>
                            )}

                            {/* Promo Code */}
                            <div className="pt-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <Button variant="outline" onClick={applyPromoCode}>
                                        Apply
                                    </Button>
                                </div>
                                {promoCode === "SAVE10" && (
                                    <p className="text-sm text-green-600 mt-1">
                                        Promo code applied! 10% discount.
                                    </p>
                                )}
                            </div>

                            <Button className="w-full mt-6" size="lg">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Proceed to Checkout
                            </Button>

                            <p className="text-xs text-muted-foreground text-center">
                                Secure checkout with SSL encryption
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 