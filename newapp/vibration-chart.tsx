"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données simulées pour la vibration
const data = [
  { time: "00:00", value: 0.3 },
  { time: "02:00", value: 0.2 },
  { time: "04:00", value: 0.2 },
  { time: "06:00", value: 0.4 },
  { time: "08:00", value: 0.6 },
  { time: "10:00", value: 0.8 },
  { time: "12:00", value: 0.7 },
  { time: "14:00", value: 0.9 },
  { time: "16:00", value: 0.8 },
  { time: "18:00", value: 0.6 },
  { time: "20:00", value: 0.5 },
  { time: "22:00", value: 0.4 },
  { time: "24:00", value: 0.3 },
]

export function VibrationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} g`}
          domain={[0, "dataMax + 0.2"]}
        />
        <Tooltip
          formatter={(value) => [`${value} g`, "Vibration"]}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "6px" }}
        />
        <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

