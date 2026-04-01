import { getPrisma } from "@/lib/db";
import { CaseTable } from "./case-table";

async function getCases() {
  const prisma = getPrisma();
  return prisma.caseEntry.findMany({
    orderBy: { createdAt: "desc" },
    include: { tags: true },
  });
}

export default async function DatenbankAdminPage() {
  const cases = await getCases();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transparenzdatenbank</h1>
          <p className="text-sm text-gray-500 mt-1">{cases.length} Einträge gesamt</p>
        </div>
      </div>
      <CaseTable cases={cases} />
    </div>
  );
}
