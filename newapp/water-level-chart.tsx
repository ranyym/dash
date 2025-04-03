"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données simulées pour le niveau d'eau
const data = [
  { time: "00:00", value: 72 },
  { time: "02:00", value: 71 },
  { time: "04:00", value: 70 },
  { time: "06:00", value: 68 },
  { time: "08:00", value: 65 },
  { time: "10:00", value: 63 },
  { time: "12:00", value: 60 },
  { time: "14:00", value: 58 },
  { time: "16:00", value: 62 },
  { time: "18:00", value: 65 },
  { time: "20:00", value: 68 },
  { time: "22:00", value: 70 },
  { time: "24:00", value: 72 },
]

export function WaterLevelChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[50, 80]}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Niveau d'eau"]}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "6px" }}
        />
        <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

