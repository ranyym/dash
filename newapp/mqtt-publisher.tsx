"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

type MQTTPublisherProps = {
  isConnected: boolean
  publishMessage: (topic: string, message: string) => void
}

export function MQTTPublisher({ isConnected, publishMessage }: MQTTPublisherProps) {
  const { toast } = useToast()
  const [topic, setTopic] = useState("capteurs/controle")
  const [message, setMessage] = useState("")

  const handlePublish = () => {
    if (!topic || !message) {
      toast({
        title: "Erreur de publication",
        description: "Le topic et le message sont requis",
        variant: "destructive",
      })
      return
    }

    publishMessage(topic, message)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publier un message</CardTitle>
        <CardDescription>Envoyez des commandes à vos appareils</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="capteurs/controle"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={!isConnected}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Entrez votre message ici"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isConnected}
              className="min-h-[100px]"
            />
          </div>
          <Button className="w-full" onClick={handlePublish} disabled={!isConnected || !topic || !message}>
            <Send className="mr-2 h-4 w-4" /> Publier
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

