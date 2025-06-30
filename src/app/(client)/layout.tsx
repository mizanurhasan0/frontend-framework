import { Footer } from "@/components/layout/footer";
import { CategoryNavbar } from "@/components/layout/category-navbar";
import { TopBar } from "@/components/layout/TopBar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <TopBar />
            <CategoryNavbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
} 