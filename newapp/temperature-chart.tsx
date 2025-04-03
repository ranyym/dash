"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données simulées pour la température
const data = [
  { time: "00:00", value: 22.5 },
  { time: "02:00", value: 21.8 },
  { time: "04:00", value: 21.2 },
  { time: "06:00", value: 20.9 },
  { time: "08:00", value: 21.5 },
  { time: "10:00", value: 23.2 },
  { time: "12:00", value: 24.8 },
  { time: "14:00", value: 25.5 },
  { time: "16:00", value: 25.2 },
  { time: "18:00", value: 24.0 },
  { time: "20:00", value: 23.5 },
  { time: "22:00", value: 22.8 },
  { time: "24:00", value: 22.3 },
]

export function TemperatureChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°C`}
          domain={["dataMin - 1", "dataMax + 1"]}
        />
        <Tooltip
          formatter={(value) => [`${value}°C`, "Température"]}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "6px" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 4, fill: "#ef4444" }}
          activeDot={{ r: 6, fill: "#ef4444" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

