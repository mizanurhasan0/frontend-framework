"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider, Slide } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const demoSlides = [
    {
        id: 1,
        title: "Welcome to Universal App",
        description: "A comprehensive web application template for building modern applications.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        cta: "Get Started",
    },
    {
        id: 2,
        title: "E-commerce Ready",
        description: "Complete product management, cart system, and order processing.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
        cta: "Learn More",
    },
    {
        id: 3,
        title: "Inventory Management",
        description: "Track stock levels, manage suppliers, and monitor inventory.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
        cta: "Explore",
    },
    {
        id: 4,
        title: "School Management",
        description: "Student records, course management, and academic tracking.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=800&h=400&fit=crop",
        cta: "Discover",
    },
];

export default function SliderDemoPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Slider Component Demo</h1>
                <p className="text-muted-foreground">
                    Showcasing the reusable slider component with various configurations.
                </p>
            </div>

            <div className="space-y-8">
                {/* Basic Slider */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Slider</CardTitle>
                        <CardDescription>
                            Simple slider with navigation arrows and dots.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Slider className="h-64">
                            {demoSlides.map((slide) => (
                                <Slide key={slide.id}>
                                    <div className="relative w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                                        <div className="text-center space-y-4">
                                            <h3 className="text-2xl font-bold">{slide.title}</h3>
                                            <p className="text-muted-foreground max-w-md">{slide.description}</p>
                                            <Button>{slide.cta}</Button>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </Slider>
                    </CardContent>
                </Card>

                {/* Autoplay Slider */}
                <Card>
                    <CardHeader>
                        <CardTitle>Autoplay Slider</CardTitle>
                        <CardDescription>
                            Slider with automatic playback and pause on hover.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Slider
                            className="h-64"
                            autoplay={true}
                            autoplayInterval={4000}
                        >
                            {demoSlides.map((slide) => (
                                <Slide key={slide.id}>
                                    <div className="relative w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                        <div className="text-center space-y-4">
                                            <h3 className="text-2xl font-bold">{slide.title}</h3>
                                            <p className="text-muted-foreground max-w-md">{slide.description}</p>
                                            <Button variant="outline">{slide.cta}</Button>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </Slider>
                    </CardContent>
                </Card>

                {/* Multi-Slide Slider */}
                <Card>
                    <CardHeader>
                        <CardTitle>Multi-Slide Slider</CardTitle>
                        <CardDescription>
                            Shows multiple slides at once with spacing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Slider
                            className="h-48"
                            slidesPerView={3}
                            spacing={16}
                            showArrows={true}
                            showDots={false}
                        >
                            {demoSlides.map((slide) => (
                                <Slide key={slide.id}>
                                    <div className="h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center p-4">
                                        <div className="text-center space-y-2">
                                            <h4 className="font-semibold">{slide.title}</h4>
                                            <p className="text-sm text-muted-foreground">{slide.description}</p>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </Slider>
                    </CardContent>
                </Card>

                {/* Minimal Slider */}
                <Card>
                    <CardHeader>
                        <CardTitle>Minimal Slider</CardTitle>
                        <CardDescription>
                            Clean slider with dots only, no arrows.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Slider
                            className="h-64"
                            showArrows={false}
                            showDots={true}
                        >
                            {demoSlides.map((slide) => (
                                <Slide key={slide.id}>
                                    <div className="relative w-full h-full bg-gradient-to-tl from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                                        <div className="text-center space-y-4">
                                            <h3 className="text-2xl font-bold">{slide.title}</h3>
                                            <p className="text-muted-foreground max-w-md">{slide.description}</p>
                                            <Button variant="secondary">{slide.cta}</Button>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </Slider>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 