"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données simulées pour la détection de flamme (0 = pas de flamme, 1 = flamme détectée)
const data = [
  { date: "01/04", value: 0 },
  { date: "02/04", value: 0 },
  { date: "03/04", value: 0 },
  { date: "04/04", value: 0 },
  { date: "05/04", value: 0 },
  { date: "06/04", value: 0 },
  { date: "07/04", value: 0 },
  { date: "08/04", value: 0 },
  { date: "09/04", value: 0 },
  { date: "10/04", value: 0 },
  { date: "11/04", value: 0 },
  { date: "12/04", value: 0 },
  { date: "13/04", value: 0 },
  { date: "14/04", value: 0 },
  { date: "15/04", value: 0 },
  { date: "16/04", value: 0 },
  { date: "17/04", value: 0 },
  { date: "18/04", value: 0 },
  { date: "19/04", value: 0 },
  { date: "20/04", value: 0 },
  { date: "21/04", value: 0 },
  { date: "22/04", value: 0 },
  { date: "23/04", value: 0 },
  { date: "24/04", value: 0 },
  { date: "25/04", value: 0 },
  { date: "26/04", value: 0 },
  { date: "27/04", value: 0 },
  { date: "28/04", value: 1 },
  { date: "29/04", value: 0 },
  { date: "30/04", value: 0 },
]

export function FlameDetectionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => (value === 0 ? "Non" : "Oui")}
          domain={[0, 1]}
          ticks={[0, 1]}
        />
        <Tooltip
          formatter={(value) => [value === 0 ? "Non détecté" : "Détecté", "Flamme"]}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "6px" }}
        />
        <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

