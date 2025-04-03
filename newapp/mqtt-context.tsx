"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import * as mqtt from "mqtt"
import { useToast } from "@/components/ui/use-toast"

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
  brokerUrl: string
  setBrokerUrl: (url: string) => void
  clientId: string
  setClientId: (id: string) => void
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  autoReconnect: boolean
  setAutoReconnect: (autoReconnect: boolean) => void
  connectToBroker: () => void
  disconnectFromBroker: () => void
  publishMessage: (topic: string, message: string) => void
  subscribeToTopic: (topic: string) => void
  unsubscribeFromTopic: (topic: string) => void
  topics: string[]
  clearMessages: () => void
}

// Création du contexte
const MQTTContext = createContext<MQTTContextType | undefined>(undefined)

// Hook pour utiliser le contexte
export const useMQTT = () => {
  const context = useContext(MQTTContext)
  if (context === undefined) {
    throw new Error("useMQTT doit être utilisé à l'intérieur d'un MQTTProvider")
  }
  return context
}

// Provider du contexte
export const MQTTProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()
  const [brokerUrl, setBrokerUrl] = useState("mqtt://broker.hivemq.com:1883")
  const [clientId, setClientId] = useState(`mqtt-dashboard-${Math.random().toString(16).substring(2, 10)}`)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [client, setClient] = useState<any>(null)
  const [messages, setMessages] = useState<MQTTMessage[]>([])
  const [autoReconnect, setAutoReconnect] = useState(true)

  // Topics pour les différents capteurs
  const defaultTopics = [
    "capteurs/temperature",
    "capteurs/humidite",
    "capteurs/niveau-eau",
    "capteurs/vibration",
    "capteurs/flamme",
  ]
  const [topics, setTopics] = useState<string[]>(defaultTopics)

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

  // Effacer les messages
  const clearMessages = () => {
    setMessages([])
  }

  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (client) {
        client.end(true)
      }
    }
  }, [client])

  const value = {
    client,
    isConnected,
    messages,
    brokerUrl,
    setBrokerUrl,
    clientId,
    setClientId,
    username,
    setUsername,
    password,
    setPassword,
    autoReconnect,
    setAutoReconnect,
    connectToBroker,
    disconnectFromBroker,
    publishMessage,
    subscribeToTopic,
    unsubscribeFromTopic,
    topics,
    clearMessages,
  }

  return <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>
}

