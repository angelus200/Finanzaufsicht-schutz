import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShoppingBag, FileText, ArrowRight, Plus } from "lucide-react";

export default async function DashboardSeite() {
  const vorname = "Nutzer"; // Clerk deaktiviert — später reaktivieren

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Willkommen, {vorname}
        </h1>
        <p className="text-gray-500 mt-1">
          Hier sehen Sie Ihre Bestellungen und Dokumente.
        </p>
      </div>

      {/* Übersichtskarten */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-normal">
              Bestellungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Noch keine Bestellung
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-normal">
              Dokumente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Keine Dokumente
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700 font-normal">
              Empfehlung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-amber-800 mb-3">
              Schnellcheck noch nicht durchgeführt
            </p>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-500 text-white"
              render={<Link href="/schnellcheck" />}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Jetzt starten
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Schnellzugriffe */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Bestellungen</p>
                  <p className="text-sm text-gray-500">
                    Alle Ihre Käufe im Überblick
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/dashboard/bestellungen" />}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Dokumente</p>
                  <p className="text-sm text-gray-500">
                    Erstellte Dokumente herunterladen
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/dashboard/dokumente" />}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
