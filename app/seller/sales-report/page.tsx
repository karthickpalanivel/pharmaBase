"use client"

import { useState } from "react"
import { SellerLayout } from "@/components/layouts/seller-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, DollarSign, Package, TrendingUp, Download } from "lucide-react"

type SalesData = {
  period: string
  revenue: number
  orders: number
  avgOrderValue: number
}

const mockSalesData: Record<string, SalesData[]> = {
  daily: [
    { period: "Mon", revenue: 1250, orders: 8, avgOrderValue: 156.25 },
    { period: "Tue", revenue: 1800, orders: 12, avgOrderValue: 150.0 },
    { period: "Wed", revenue: 2100, orders: 15, avgOrderValue: 140.0 },
    { period: "Thu", revenue: 1650, orders: 10, avgOrderValue: 165.0 },
    { period: "Fri", revenue: 2300, orders: 18, avgOrderValue: 127.78 },
    { period: "Sat", revenue: 1900, orders: 14, avgOrderValue: 135.71 },
    { period: "Sun", revenue: 1400, orders: 9, avgOrderValue: 155.56 },
  ],
  weekly: [
    { period: "Week 1", revenue: 8500, orders: 65, avgOrderValue: 130.77 },
    { period: "Week 2", revenue: 9200, orders: 72, avgOrderValue: 127.78 },
    { period: "Week 3", revenue: 7800, orders: 58, avgOrderValue: 134.48 },
    { period: "Week 4", revenue: 10500, orders: 78, avgOrderValue: 134.62 },
  ],
  monthly: [
    { period: "Jan", revenue: 35000, orders: 280, avgOrderValue: 125.0 },
    { period: "Feb", revenue: 42000, orders: 320, avgOrderValue: 131.25 },
    { period: "Mar", revenue: 38500, orders: 295, avgOrderValue: 130.51 },
    { period: "Apr", revenue: 45000, orders: 350, avgOrderValue: 128.57 },
  ],
}

export default function SalesReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily")

  const currentData = mockSalesData[selectedPeriod]
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders

  const handleExportReport = () => {
    // Mock export functionality
    const csvContent = [
      ["Period", "Revenue", "Orders", "Avg Order Value"],
      ...currentData.map((item) => [
        item.period,
        item.revenue.toString(),
        item.orders.toString(),
        item.avgOrderValue.toFixed(2),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sales-report-${selectedPeriod}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Sales Report</h1>
          <div className="flex space-x-3">
            <Select
              value={selectedPeriod}
              onValueChange={(value: "daily" | "weekly" | "monthly") => setSelectedPeriod(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">Orders processed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{avgOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Per order average</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>{selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Sales Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.period}</h4>
                    <p className="text-sm text-gray-600">{item.orders} orders</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(item.revenue / Math.max(...currentData.map((d) => d.revenue))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{item.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">₹{item.avgOrderValue.toFixed(2)} avg</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Medicines */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Paracetamol 500mg", brand: "Calpol", sales: 1250, orders: 45 },
                { name: "Amoxicillin 250mg", brand: "Amoxil", sales: 980, orders: 32 },
                { name: "Ibuprofen 400mg", brand: "Brufen", sales: 750, orders: 28 },
                { name: "Cetirizine 10mg", brand: "Zyrtec", sales: 650, orders: 35 },
              ].map((medicine, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{medicine.name}</h4>
                    <p className="text-sm text-gray-600">Brand: {medicine.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{medicine.sales}</p>
                    <p className="text-sm text-gray-600">{medicine.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
