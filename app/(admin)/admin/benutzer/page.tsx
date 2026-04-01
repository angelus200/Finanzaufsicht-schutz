import { getPrisma } from "@/lib/db";
import { UserTable } from "./user-table";

async function getUsers() {
  const prisma = getPrisma();
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      company: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      sessions: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true },
      },
    },
  });
}

export default async function BenutzerPage() {
  const users = await getUsers();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Benutzerverwaltung</h1>
        <p className="text-sm text-gray-500 mt-1">{users.length} Benutzer gesamt</p>
      </div>
      <UserTable users={users} />
    </div>
  );
}
