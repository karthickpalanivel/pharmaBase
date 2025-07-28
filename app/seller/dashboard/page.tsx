"use client"

import { useState } from "react"
import { SellerLayout } from "@/components/layouts/seller-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, DollarSign, Package, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PendingOrder = {
  order_id: string
  medicine_code: string
  drug_name: string
  brand_name: string
  strength: string
  quantity: number
  unit_type: string
  buyer_name: string
  buyer_id: string
  total_amount: number
  created_at: string
}

const mockPendingOrders: PendingOrder[] = [
  {
    order_id: "ORD004",
    medicine_code: "MED001",
    drug_name: "Paracetamol",
    brand_name: "Calpol",
    strength: "500mg",
    quantity: 15,
    unit_type: "tablet",
    buyer_name: "City Pharmacy",
    buyer_id: "BUY002",
    total_amount: 37.5,
    created_at: "2025-01-27T12:30:00Z",
  },
  {
    order_id: "ORD005",
    medicine_code: "MED003",
    drug_name: "Amoxicillin",
    brand_name: "Amoxil",
    strength: "250mg",
    quantity: 30,
    unit_type: "capsule",
    buyer_name: "Health Center",
    buyer_id: "BUY003",
    total_amount: 165.0,
    created_at: "2025-01-27T13:15:00Z",
  },
]

export default function SellerDashboard() {
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>(mockPendingOrders)
  const { toast } = useToast()

  const handleAcceptOrder = (orderId: string) => {
    setPendingOrders((orders) => orders.filter((order) => order.order_id !== orderId))
    toast({
      title: "Order accepted",
      description: "The order has been accepted and stock will be updated",
    })
  }

  const handleRejectOrder = (orderId: string) => {
    setPendingOrders((orders) => orders.filter((order) => order.order_id !== orderId))
    toast({
      title: "Order rejected",
      description: "The order has been rejected",
      variant: "destructive",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Mock statistics
  const stats = {
    dailySales: 1250.75,
    weeklySales: 8750.25,
    monthlySales: 35000.5,
    pendingOrdersCount: pendingOrders.length,
    totalOrders: 156,
    completedOrders: 142,
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.dailySales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Today's revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.weeklySales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This week's revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrdersCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting your response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Pending Orders</span>
              <Badge variant="secondary">{pendingOrders.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending orders at the moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div key={order.order_id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">Order #{order.order_id}</h4>
                        <p className="text-sm text-gray-600">
                          From: {order.buyer_name} • {formatDate(order.created_at)}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        Pending
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {order.drug_name} ({order.strength})
                        </h5>
                        <p className="text-sm text-gray-600">Brand: {order.brand_name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {order.quantity} {order.unit_type}s
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">₹{order.total_amount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button onClick={() => handleAcceptOrder(order.order_id)} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Order
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRejectOrder(order.order_id)}
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
