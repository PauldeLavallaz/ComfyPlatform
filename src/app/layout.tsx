"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	function LayoutContent({ children }: { children: React.ReactNode }) {
		const pathname = usePathname();
		const { isSignedIn } = useUser();
		const isPublicRoute = publicRoutes.includes(pathname);

		return (
			<div className="flex min-h-screen">
				{isSignedIn && !isPublicRoute && <Sidebar />}
				<main className={`flex-1 ${isSignedIn && !isPublicRoute ? 'md:ml-64' : ''}`}>
					<div className="max-w-7xl mx-auto px-4 py-8 md:py-8 pt-20 md:pt-8">
						{children}
					</div>
				</main>
			</div>
		);
	}

	return (
		<html lang="es">
			<head>
				<meta 
					name="viewport" 
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
				/>
			</head>
			<body className={inter.className}>
				<ClerkProvider>
					<LayoutContent>{children}</LayoutContent>
					<Toaster />
				</ClerkProvider>
			</body>
		</html>
	);
}

