"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, Globe, Home, Map, Menu, Mountain, Settings, TrendingUp, Users } from "lucide-react"

// Sample data for Nepal tourism
const monthlyVisitors = [
  { month: "Jan", visitors: 45000, domestic: 15000, international: 30000 },
  { month: "Feb", visitors: 52000, domestic: 18000, international: 34000 },
  { month: "Mar", visitors: 58000, domestic: 20000, international: 38000 },
  { month: "Apr", visitors: 63000, domestic: 22000, international: 41000 },
  { month: "May", visitors: 59000, domestic: 24000, international: 35000 },
  { month: "Jun", visitors: 48000, domestic: 26000, international: 22000 },
  { month: "Jul", visitors: 42000, domestic: 25000, international: 17000 },
  { month: "Aug", visitors: 40000, domestic: 24000, international: 16000 },
  { month: "Sep", visitors: 52000, domestic: 22000, international: 30000 },
  { month: "Oct", visitors: 68000, domestic: 23000, international: 45000 },
  { month: "Nov", visitors: 72000, domestic: 24000, international: 48000 },
  { month: "Dec", visitors: 65000, domestic: 20000, international: 45000 },
]

const topDestinations = [
  { name: "Capital", visitors: 320000, fill: "#8884d8" },
  { name: "Pokhara", visitors: 280000, fill: "#83a6ed" },
  { name: "Chitwan", visitors: 180000, fill: "#8dd1e1" },
  { name: "Lumbini", visitors: 150000, fill: "#82ca9d" },
  { name: "Everest Region", visitors: 120000, fill: "#a4de6c" },
]

const visitorsByCountry = [
  { name: "India", value: 32 },
  { name: "China", value: 18 },
  { name: "USA", value: 12 },
  { name: "UK", value: 8 },
  { name: "Germany", value: 6 },
  { name: "Others", value: 24 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#A4DE6C"]

const revenueData = [
  { year: "2018", revenue: 450 },
  { year: "2019", revenue: 520 },
  { year: "2020", revenue: 180 },
  { year: "2021", revenue: 250 },
  { year: "2022", revenue: 480 },
  { year: "2023", revenue: 620 },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Visitors</h3>
              <p className="text-2xl font-bold mt-1">664,000</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-emerald-500">+12.5%</span> from last year
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
              <p className="text-2xl font-bold mt-1">$620M</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-emerald-500">+29.2%</span> from last year
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">Avg. Stay Duration</h3>
              <p className="text-2xl font-bold mt-1">13.2 days</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-emerald-500">+2.4 days</span> from last year
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">Satisfaction Rate</h3>
              <p className="text-2xl font-bold mt-1">92%</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-emerald-500">+3%</span> from last year
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Monthly Visitors Chart */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm col-span-2">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Monthly Visitors (2023)</h3>
                <p className="text-sm text-gray-500 mt-1">Breakdown of domestic and international tourists</p>
              </div>
              <div className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyVisitors}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="domestic" name="Domestic" stackId="a" fill="#4ade80" radius={[4, 4, 0, 0]} />
                      <Bar
                        dataKey="international"
                        name="International"
                        stackId="a"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Top Destinations */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Top Destinations</h3>
                <p className="text-sm text-gray-500 mt-1">Most visited places in Nepal</p>
              </div>
              <div className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={topDestinations}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} visitors`, "Visitors"]} />
                      <Bar dataKey="visitors" fill="#8884d8" radius={[0, 4, 4, 0]}>
                        {topDestinations.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visitors by Country */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Visitors by Country</h3>
                <p className="text-sm text-gray-500 mt-1">Percentage distribution</p>
              </div>
              <div className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={visitorsByCountry}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {visitorsByCountry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Trend and Upcoming Events */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Revenue Trend */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Tourism Revenue Trend</h3>
                <p className="text-sm text-gray-500 mt-1">Annual revenue in millions USD</p>
              </div>
              <div className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Upcoming Tourism Events</h3>
                <p className="text-sm text-gray-500 mt-1">Next 30 days</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Nepal Mountain Biking Festival</h3>
                      <p className="text-sm text-gray-500">May 15-18, 2024 • Kathmandu</p>
                    </div>
                    <span className="ml-auto inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Upcoming
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Himalayan Yoga Festival</h3>
                      <p className="text-sm text-gray-500">May 22-26, 2024 • Pokhara</p>
                    </div>
                    <span className="ml-auto inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Upcoming
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Everest Marathon</h3>
                      <p className="text-sm text-gray-500">May 29, 2024 • Everest Base Camp</p>
                    </div>
                    <span className="ml-auto inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Registration Open
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tourism Goals */}
          <div className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">2024 Tourism Goals Progress</h3>
                <p className="text-sm text-gray-500 mt-1">Annual targets and current progress</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Visitor Target (1M)</p>
                        <p className="text-xs text-gray-500">Current: 320,000</p>
                      </div>
                      <p className="text-sm font-medium">32%</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Revenue Target ($800M)</p>
                        <p className="text-xs text-gray-500">Current: $240M</p>
                      </div>
                      <p className="text-sm font-medium">30%</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New Tourism Jobs (50,000)</p>
                        <p className="text-xs text-gray-500">Current: 22,500</p>
                      </div>
                      <p className="text-sm font-medium">45%</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sustainable Tourism Initiatives (20)</p>
                        <p className="text-xs text-gray-500">Current: 12</p>
                      </div>
                      <p className="text-sm font-medium">60%</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

