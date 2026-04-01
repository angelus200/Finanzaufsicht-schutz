import { getPrisma } from "@/lib/db";
import { ContactTable } from "./contact-table";

async function getContacts() {
  const prisma = getPrisma();
  return prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function KontaktanfragenPage() {
  const contacts = await getContacts();

  const openCount = contacts.filter((c) => c.status === "NEW").length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kontaktanfragen</h1>
        <p className="text-sm text-gray-500 mt-1">
          {contacts.length} gesamt · {openCount} offen
        </p>
      </div>
      <ContactTable contacts={contacts} />
    </div>
  );
}
