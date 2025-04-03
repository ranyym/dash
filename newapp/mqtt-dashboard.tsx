"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MQTTProvider, useMQTT } from "@/components/mqtt-context"
import { MQTTConfig } from "@/components/mqtt-config"
import { MQTTPublisher } from "@/components/mqtt-publisher"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function MQTTMessages() {
  const { messages } = useMQTT()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages MQTT</CardTitle>
        <CardDescription>Derniers messages reçus des capteurs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-y-auto border rounded-md p-2">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="text-sm border-b py-2 last:border-0">
                <div className="flex justify-between">
                  <Badge variant="outline">{msg.topic}</Badge>
                  <span className="text-xs text-muted-foreground">{msg.timestamp.toLocaleTimeString()}</span>
                </div>
                <div className="mt-1 break-all">{msg.message}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">Aucun message reçu</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function MQTTDashboardContent() {
  const mqtt = useMQTT()

  return (
    <div className="space-y-4">
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="publish">Publier</TabsTrigger>
        </TabsList>
        <TabsContent value="config" className="space-y-4">
          <MQTTConfig />
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <MQTTMessages />
        </TabsContent>
        <TabsContent value="publish" className="space-y-4">
          <MQTTPublisher isConnected={mqtt.isConnected} publishMessage={mqtt.publishMessage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function MQTTDashboard() {
  return (
    <MQTTProvider>
      <MQTTDashboardContent />
    </MQTTProvider>
  )
}

