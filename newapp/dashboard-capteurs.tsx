"use client"

import { useState } from "react"
import { Droplets, Flame, Menu, SettingsIcon, Thermometer, Vibrate, WavesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemperatureChart } from "@/components/temperature-chart"
import { HumidityChart } from "@/components/humidity-chart"
import { WaterLevelChart } from "@/components/water-level-chart"
import { VibrationChart } from "@/components/vibration-chart"
import { FlameDetectionChart } from "@/components/flame-detection-chart"
import { AlertsPanel } from "@/components/alerts-panel"
import { MQTTDashboard } from "@/components/mqtt-dashboard"

export default function DashboardCapteurs() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:hidden">
              <nav className="grid gap-6 text-lg font-medium">
                <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <SettingsIcon className="h-6 w-6" />
                  <span>Tableau de Bord Capteurs</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Thermometer className="h-5 w-5" />
                  Température
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Droplets className="h-5 w-5" />
                  Humidité
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <WavesIcon className="h-5 w-5" />
                  Niveau d'Eau
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Vibrate className="h-5 w-5" />
                  Vibration
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Flame className="h-5 w-5" />
                  Détection de Flamme
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="#" className="flex items-center gap-2 text-lg font-semibold">
            <SettingsIcon className="h-6 w-6" />
            <span className="sr-only sm:not-sr-only sm:inline">Tableau de Bord Capteurs</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              Exporter
            </Button>
            <Button size="sm">Paramètres</Button>
          </div>
        </header>
        <div className="grid flex-1 gap-4 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <nav className="hidden border-r bg-background sm:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <a href="#" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
                <Thermometer className="h-5 w-5" />
                Température
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Droplets className="h-5 w-5" />
                Humidité
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <WavesIcon className="h-5 w-5" />
                Niveau d'Eau
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Vibrate className="h-5 w-5" />
                Vibration
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Flame className="h-5 w-5" />
                Détection de Flamme
              </a>
            </div>
          </nav>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="charts">Graphiques</TabsTrigger>
                <TabsTrigger value="alerts">Alertes</TabsTrigger>
                <TabsTrigger value="mqtt">MQTT</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Température</CardTitle>
                      <Thermometer className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">24.5°C</div>
                      <p className="text-xs text-muted-foreground">Normal (20-25°C)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Humidité</CardTitle>
                      <Droplets className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">65%</div>
                      <p className="text-xs text-muted-foreground">Élevée ({">"}60%)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Niveau d'Eau</CardTitle>
                      <WavesIcon className="h-4 w-4 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">75%</div>
                      <p className="text-xs text-muted-foreground">Normal (50-80%)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Vibration</CardTitle>
                      <Vibrate className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0.8 g</div>
                      <p className="text-xs text-muted-foreground">Faible ({"<"}1.0 g)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Flamme</CardTitle>
                      <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Non</div>
                      <p className="text-xs text-muted-foreground">Aucune détection</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Température (24h)</CardTitle>
                      <CardDescription>Évolution de la température sur les dernières 24 heures</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <TemperatureChart />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Humidité (24h)</CardTitle>
                      <CardDescription>Évolution de l'humidité sur les dernières 24 heures</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <HumidityChart />
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Niveau d'Eau (24h)</CardTitle>
                      <CardDescription>Évolution du niveau d'eau sur les dernières 24 heures</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <WaterLevelChart />
                    </CardContent>
                  </Card>
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Alertes Récentes</CardTitle>
                      <CardDescription>Les 5 dernières alertes détectées</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center rounded-md bg-red-100 p-3 dark:bg-red-900/30">
                          <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Température élevée</p>
                            <p className="text-xs text-muted-foreground">28.5°C - 10:45 aujourd'hui</p>
                          </div>
                        </div>
                        <div className="flex items-center rounded-md bg-blue-100 p-3 dark:bg-blue-900/30">
                          <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Humidité élevée</p>
                            <p className="text-xs text-muted-foreground">85% - 08:30 aujourd'hui</p>
                          </div>
                        </div>
                        <div className="flex items-center rounded-md bg-purple-100 p-3 dark:bg-purple-900/30">
                          <Vibrate className="h-5 w-5 text-purple-500 mr-2" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Vibration anormale</p>
                            <p className="text-xs text-muted-foreground">2.3 g - 22:15 hier</p>
                          </div>
                        </div>
                        <div className="flex items-center rounded-md bg-cyan-100 p-3 dark:bg-cyan-900/30">
                          <WavesIcon className="h-5 w-5 text-cyan-500 mr-2" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Niveau d'eau bas</p>
                            <p className="text-xs text-muted-foreground">15% - 14:20 hier</p>
                          </div>
                        </div>
                        <div className="flex items-center rounded-md bg-orange-100 p-3 dark:bg-orange-900/30">
                          <Flame className="h-5 w-5 text-orange-500 mr-2" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Détection de flamme</p>
                            <p className="text-xs text-muted-foreground">Détecté - 09:05 il y a 3 jours</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="charts" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Température (7 jours)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TemperatureChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Humidité (7 jours)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <HumidityChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Niveau d'Eau (7 jours)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <WaterLevelChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Vibration (7 jours)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <VibrationChart />
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Détection de Flamme (30 jours)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FlameDetectionChart />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="alerts">
                <AlertsPanel />
              </TabsContent>
              <TabsContent value="mqtt">
                <MQTTDashboard />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

