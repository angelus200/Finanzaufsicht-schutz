import { getPrisma } from "@/lib/db";
import { NewsletterTable } from "./newsletter-table";

async function getSubscribers() {
  const prisma = getPrisma();
  return prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function NewsletterPage() {
  const subscribers = await getSubscribers();
  const active = subscribers.filter((s) => !s.unsubscribedAt).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter-Abonnenten</h1>
        <p className="text-sm text-gray-500 mt-1">
          {subscribers.length} gesamt · {active} aktiv
        </p>
      </div>
      <NewsletterTable subscribers={subscribers} />
    </div>
  );
}
