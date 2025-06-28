import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider, Slide } from "@/components/ui/slider";
import {
  Rocket,
  Zap,
  Shield,
  Palette,
  Smartphone,
  Globe,
  Database,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  BookOpen,
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Next.js 15 + App Router",
    description: "Latest Next.js with file-based routing and server components",
  },
  {
    icon: Zap,
    title: "Tailwind CSS 4.1",
    description: "Dynamic color palette with CSS variables and dark mode",
  },
  {
    icon: Shield,
    title: "TypeScript",
    description: "Full type safety and excellent developer experience",
  },
  {
    icon: Palette,
    title: "Dynamic Theming",
    description: "Light/dark modes with customizable color schemes",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Fully responsive design that works on all devices",
  },
  {
    icon: Globe,
    title: "Real-time Communication",
    description: "Socket.io integration for live updates and chat",
  },
];

const advancedFeatures = [
  {
    icon: Database,
    title: "React Query Integration",
    description: "Powerful data fetching with caching, mutations, and optimistic updates",
    badge: "New",
  },
  {
    icon: BarChart3,
    title: "Advanced Tables",
    description: "Sortable, filterable tables with pagination using TanStack Table",
    badge: "New",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Categories",
    description: "Tree-based category navigation with nested dropdowns",
    badge: "New",
  },
  {
    icon: Package,
    title: "Dashboard Sidebar",
    description: "Collapsible sidebar with nested menu items and active states",
    badge: "New",
  },
  {
    icon: Users,
    title: "Multi-purpose Ready",
    description: "E-commerce, inventory, school management, and dashboard apps",
    badge: "New",
  },
  {
    icon: BookOpen,
    title: "Form Handling",
    description: "React Hook Form with Zod validation and error handling",
    badge: "New",
  },
];

const useCases = [
  {
    title: "E-commerce Platform",
    description: "Complete online store with product management, cart, and checkout",
    icon: ShoppingCart,
    features: ["Product catalog", "Shopping cart", "Order management", "Payment integration"],
  },
  {
    title: "Inventory Management",
    description: "Track stock levels, suppliers, and purchase orders",
    icon: Package,
    features: ["Stock tracking", "Supplier management", "Purchase orders", "Reports"],
  },
  {
    title: "School Management",
    description: "Student records, courses, attendance, and grade tracking",
    icon: Users,
    features: ["Student management", "Course catalog", "Attendance tracking", "Grade reports"],
  },
  {
    title: "Dashboard Applications",
    description: "Analytics dashboards with charts, metrics, and real-time data",
    icon: BarChart3,
    features: ["Data visualization", "Real-time updates", "Custom metrics", "Export functionality"],
  },
];

const heroSlides = [
  {
    title: "Universal Web App Template",
    description: "Build scalable applications with modern tech stack and best practices",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "React Query + TanStack Table",
    description: "Powerful data management with caching, sorting, and filtering",
    gradient: "from-green-500/20 to-blue-500/20",
  },
  {
    title: "E-commerce Ready",
    description: "Complete category navigation and product management system",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <Slider className="h-96" autoplay={true} autoplayInterval={5000}>
            {heroSlides.map((slide, index) => (
              <Slide key={index}>
                <div className={`relative w-full h-full bg-gradient-to-br ${slide.gradient} rounded-lg flex items-center justify-center`}>
                  <div className="text-center space-y-6 max-w-3xl">
                    <h1 className="text-5xl font-bold tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {slide.description}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Button size="lg" asChild>
                        <Link href="/dashboard">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link href="/demo/slider">View Demo</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build modern, scalable web applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest additions to make your development experience even better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature) => (
              <Card key={feature.title} className="relative">
                {feature.badge && (
                  <Badge className="absolute top-4 right-4" variant="secondary">
                    {feature.badge}
                  </Badge>
                )}
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Perfect For Multiple Use Cases
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One template, endless possibilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                    <ul className="space-y-2">
                      {useCase.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start building your next web application with our comprehensive template
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
