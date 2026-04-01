import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8 font-bold text-blue-900">
        <Shield className="h-6 w-6 text-amber-600" />
        <span className="text-xl">Finanzaufsicht-Schutz</span>
      </Link>
      {children}
    </div>
  );
}
