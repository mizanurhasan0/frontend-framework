"use client";

import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "keen-slider/keen-slider.min.css";

interface SliderProps {
    children: React.ReactNode;
    className?: string;
    autoplay?: boolean;
    autoplayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    slidesPerView?: number;
    spacing?: number;
}

export function Slider({
    children,
    className,
    autoplay = false,
    autoplayInterval = 3000,
    showDots = true,
    showArrows = true,
    loop = true,
    slidesPerView = 1,
    spacing = 0,
}: SliderProps) {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = React.useState(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop,
            mode: "free-snap",
            slides: {
                perView: slidesPerView,
                spacing: spacing,
            },
            created() {
                setLoaded(true);
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (autoplay && !mouseOver) {
                        timeout = setTimeout(() => {
                            slider.next();
                        }, autoplayInterval);
                    }
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    const goToSlide = (index: number) => {
        instanceRef.current?.moveToIdx(index);
    };

    const goToPrevious = () => {
        instanceRef.current?.prev();
    };

    const goToNext = () => {
        instanceRef.current?.next();
    };

    return (
        <div className={cn("relative", className)}>
            {/* Slider Container */}
            <div ref={sliderRef} className="keen-slider">
                {React.Children.map(children, (child) => (
                    <div className="keen-slider__slide">{child}</div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && loaded && instanceRef.current && (
                <>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={goToPrevious}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={goToNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next slide</span>
                    </Button>
                </>
            )}

            {/* Dots Navigation */}
            {showDots && loaded && instanceRef.current && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: instanceRef.current.track.details.slides.length }).map(
                        (_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-2 w-2 rounded-full transition-colors",
                                    currentSlide === index
                                        ? "bg-primary"
                                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                )}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}

// Slide component for individual slides
interface SlideProps {
    children: React.ReactNode;
    className?: string;
}

export function Slide({ children, className }: SlideProps) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            {children}
        </div>
    );
} 