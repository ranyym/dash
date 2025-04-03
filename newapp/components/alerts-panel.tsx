import { Droplets, Flame, Thermometer, Vibrate, WavesIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Données simulées pour les alertes
const alerts = [
  {
    id: 1,
    type: "temperature",
    value: "28.5°C",
    threshold: "25°C",
    timestamp: "10:45 aujourd'hui",
    status: "active",
  },
  {
    id: 2,
    type: "humidity",
    value: "85%",
    threshold: "80%",
    timestamp: "08:30 aujourd'hui",
    status: "active",
  },
  {
    id: 3,
    type: "vibration",
    value: "2.3 g",
    threshold: "2.0 g",
    timestamp: "22:15 hier",
    status: "resolved",
  },
  {
    id: 4,
    type: "water",
    value: "15%",
    threshold: "20%",
    timestamp: "14:20 hier",
    status: "resolved",
  },
  {
    id: 5,
    type: "flame",
    value: "Détecté",
    threshold: "Non détecté",
    timestamp: "09:05 il y a 3 jours",
    status: "resolved",
  },
]

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des Alertes</CardTitle>
        <CardDescription>Toutes les alertes détectées par les capteurs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                {alert.type === "temperature" && <Thermometer className="h-6 w-6 text-red-500" />}
                {alert.type === "humidity" && <Droplets className="h-6 w-6 text-blue-500" />}
                {alert.type === "vibration" && <Vibrate className="h-6 w-6 text-purple-500" />}
                {alert.type === "water" && <WavesIcon className="h-6 w-6 text-cyan-500" />}
                {alert.type === "flame" && <Flame className="h-6 w-6 text-orange-500" />}
                <div>
                  <p className="font-medium">
                    {alert.type === "temperature" && "Température élevée"}
                    {alert.type === "humidity" && "Humidité élevée"}
                    {alert.type === "vibration" && "Vibration anormale"}
                    {alert.type === "water" && "Niveau d'eau bas"}
                    {alert.type === "flame" && "Détection de flamme"}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Valeur: {alert.value} (Seuil: {alert.threshold})
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                </div>
              </div>
              <Badge variant={alert.status === "active" ? "destructive" : "outline"}>
                {alert.status === "active" ? "Active" : "Résolue"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

