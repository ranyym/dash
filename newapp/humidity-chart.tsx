"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données simulées pour l'humidité
const data = [
  { time: "00:00", value: 62 },
  { time: "02:00", value: 64 },
  { time: "04:00", value: 65 },
  { time: "06:00", value: 67 },
  { time: "08:00", value: 63 },
  { time: "10:00", value: 60 },
  { time: "12:00", value: 58 },
  { time: "14:00", value: 55 },
  { time: "16:00", value: 57 },
  { time: "18:00", value: 61 },
  { time: "20:00", value: 63 },
  { time: "22:00", value: 64 },
  { time: "24:00", value: 65 },
]

export function HumidityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[40, 80]}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Humidité"]}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "6px" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4, fill: "#3b82f6" }}
          activeDot={{ r: 6, fill: "#3b82f6" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

