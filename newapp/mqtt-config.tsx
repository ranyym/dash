"use client"

import { useState, useEffect } from "react"
import * as mqtt from "mqtt"
import { AlertCircle, CheckCircle2, Power, PowerOff, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Type pour les messages MQTT
export type MQTTMessage = {
  topic: string
  message: string
  timestamp: Date
}

// Type pour le contexte MQTT
export type MQTTContextType = {
  client: any
  isConnected: boolean
  messages: MQTTMessage[]
  connectToBroker: (url: string, options?: any) => void
  disconnectFromBroker: () => void
  publishMessage: (topic: string, message: string) => void
  subscribeToTopic: (topic: string) => void
  unsubscribeFromTopic: (topic: string) => void
}

export function MQTTConfig() {
  const { toast } = useToast()
  const [brokerUrl, setBrokerUrl] = useState("mqtt://broker.hivemq.com:1883")
  const [clientId, setClientId] = useState(`mqtt-dashboard-${Math.random().toString(16).substring(2, 10)}`)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [client, setClient] = useState<any>(null)
  const [messages, setMessages] = useState<MQTTMessage[]>([])
  const [autoReconnect, setAutoReconnect] = useState(true)
  const [isConfigOpen, setIsConfigOpen] = useState(false)

  // Topics pour les différents capteurs
  const defaultTopics = [
    "capteurs/temperature",
    "capteurs/humidite",
    "capteurs/niveau-eau",
    "capteurs/vibration",
    "capteurs/flamme",
  ]
  const [topics, setTopics] = useState<string[]>(defaultTopics)
  const [newTopic, setNewTopic] = useState("")

  // Connexion au broker MQTT
  const connectToBroker = () => {
    if (client) {
      client.end(true)
    }

    const options = {
      clientId,
      clean: true,
      reconnectPeriod: autoReconnect ? 1000 : 0,
      connectTimeout: 5000,
    }

    if (username) {
      options.username = username
    }
    if (password) {
      options.password = password
    }

    try {
      const mqttClient = mqtt.connect(brokerUrl, options)

      mqttClient.on("connect", () => {
        setIsConnected(true)
        setClient(mqttClient)
        toast({
          title: "Connexion MQTT établie",
          description: `Connecté à ${brokerUrl}`,
        })

        // S'abonner aux topics par défaut
        topics.forEach((topic) => {
          mqttClient.subscribe(topic)
        })
      })

      mqttClient.on("message", (topic, message) => {
        const messageStr = message.toString()
        const newMessage = {
          topic,
          message: messageStr,
          timestamp: new Date(),
        }
        setMessages((prev) => [newMessage, ...prev].slice(0, 100)) // Garder les 100 derniers messages
      })

      mqttClient.on("error", (err) => {
        toast({
          title: "Erreur MQTT",
          description: `Erreur: ${err.message}`,
          variant: "destructive",
        })
      })

      mqttClient.on("disconnect", () => {
        setIsConnected(false)
        toast({
          title: "Déconnecté du broker MQTT",
          description: "La connexion a été interrompue",
        })
      })

      mqttClient.on("offline", () => {
        setIsConnected(false)
        toast({
          title: "Connexion MQTT hors ligne",
          description: "Tentative de reconnexion...",
        })
      })
    } catch (error) {
      toast({
        title: "Erreur de connexion MQTT",
        description: `Impossible de se connecter: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  // Déconnexion du broker MQTT
  const disconnectFromBroker = () => {
    if (client) {
      client.end(true, () => {
        setIsConnected(false)
        setClient(null)
        toast({
          title: "Déconnexion MQTT",
          description: "Déconnecté du broker MQTT",
        })
      })
    }
  }

  // Publication d'un message
  const publishMessage = (topic: string, message: string) => {
    if (client && isConnected) {
      client.publish(topic, message)
      toast({
        title: "Message publié",
        description: `Topic: ${topic}, Message: ${message}`,
      })
    } else {
      toast({
        title: "Erreur de publication",
        description: "Non connecté au broker MQTT",
        variant: "destructive",
      })
    }
  }

  // Abonnement à un topic
  const subscribeToTopic = (topic: string) => {
    if (!topic) return

    if (client && isConnected) {
      client.subscribe(topic, (err) => {
        if (!err) {
          setTopics((prev) => [...prev, topic])
          setNewTopic("")
          toast({
            title: "Abonnement réussi",
            description: `Abonné au topic: ${topic}`,
          })
        } else {
          toast({
            title: "Erreur d'abonnement",
            description: `Impossible de s'abonner à ${topic}: ${err.message}`,
            variant: "destructive",
          })
        }
      })
    } else {
      toast({
        title: "Erreur d'abonnement",
        description: "Non connecté au broker MQTT",
        variant: "destructive",
      })
    }
  }

  // Désabonnement d'un topic
  const unsubscribeFromTopic = (topic: string) => {
    if (client && isConnected) {
      client.unsubscribe(topic, (err) => {
        if (!err) {
          setTopics((prev) => prev.filter((t) => t !== topic))
          toast({
            title: "Désabonnement réussi",
            description: `Désabonné du topic: ${topic}`,
          })
        } else {
          toast({
            title: "Erreur de désabonnement",
            description: `Impossible de se désabonner de ${topic}: ${err.message}`,
            variant: "destructive",
          })
        }
      })
    }
  }

  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (client) {
        client.end(true)
      }
    }
  }, [client])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Configuration MQTT</CardTitle>
          <CardDescription>Connectez-vous à vos capteurs via MQTT</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isConnected ? "success" : "destructive"} className="px-3 py-1">
            {isConnected ? (
              <>
                <CheckCircle2 className="mr-1 h-4 w-4" /> Connecté
              </>
            ) : (
              <>
                <AlertCircle className="mr-1 h-4 w-4" /> Déconnecté
              </>
            )}
          </Badge>
          <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Configuration MQTT</DialogTitle>
                <DialogDescription>Configurez les paramètres de connexion MQTT pour vos capteurs.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="broker-url" className="text-right">
                    Broker URL
                  </Label>
                  <Input
                    id="broker-url"
                    value={brokerUrl}
                    onChange={(e) => setBrokerUrl(e.target.value)}
                    className="col-span-3"
                    placeholder="mqtt://broker.example.com:1883"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client-id" className="text-right">
                    Client ID
                  </Label>
                  <Input
                    id="client-id"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Nom d'utilisateur
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                    placeholder="(optionnel)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                    placeholder="(optionnel)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="auto-reconnect" className="text-right">
                    Reconnexion auto
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="auto-reconnect" checked={autoReconnect} onCheckedChange={setAutoReconnect} />
                    <Label htmlFor="auto-reconnect">{autoReconnect ? "Activée" : "Désactivée"}</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsConfigOpen(false)}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button
              onClick={isConnected ? disconnectFromBroker : connectToBroker}
              variant={isConnected ? "destructive" : "default"}
            >
              {isConnected ? (
                <>
                  <PowerOff className="mr-2 h-4 w-4" /> Déconnecter
                </>
              ) : (
                <>
                  <Power className="mr-2 h-4 w-4" /> Connecter
                </>
              )}
            </Button>
            <div className="text-sm text-muted-foreground">
              {isConnected ? `Connecté à ${brokerUrl}` : "Non connecté"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Topics abonnés</Label>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Badge key={topic} variant="outline" className="flex items-center gap-1">
                  {topic}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 rounded-full"
                    onClick={() => unsubscribeFromTopic(topic)}
                  >
                    <span className="sr-only">Supprimer</span>×
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Nouveau topic (ex: capteurs/temperature)"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
              <Button onClick={() => subscribeToTopic(newTopic)} disabled={!isConnected || !newTopic}>
                Ajouter
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Derniers messages reçus</Label>
            <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="text-sm border-b py-2 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium">{msg.topic}</span>
                      <span className="text-xs text-muted-foreground">{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="mt-1 break-all">{msg.message}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">Aucun message reçu</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">{isConnected ? `Client ID: ${clientId}` : "Non connecté"}</div>
        <Button variant="outline" size="sm" onClick={() => setMessages([])}>
          Effacer les messages
        </Button>
      </CardFooter>
    </Card>
  )
}

