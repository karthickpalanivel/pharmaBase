"use client"

import { useState } from "react"
import { BuyerLayout } from "@/components/layouts/buyer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, CheckCircle, XCircle } from "lucide-react"

type Order = {
  order_id: string
  medicine_code: string
  drug_name: string
  brand_name: string
  strength: string
  quantity: number
  unit_type: string
  status: "pending" | "accepted" | "rejected" | "completed"
  seller_name: string
  total_amount: number
  created_at: string
  accepted_by?: string
}

const mockOrders: Order[] = [
  {
    order_id: "ORD001",
    medicine_code: "MED001",
    drug_name: "Paracetamol",
    brand_name: "Calpol",
    strength: "500mg",
    quantity: 10,
    unit_type: "tablet",
    status: "accepted",
    seller_name: "ABC Distributors",
    total_amount: 25.0,
    created_at: "2025-01-27T10:30:00Z",
    accepted_by: "SEL001",
  },
  {
    order_id: "ORD002",
    medicine_code: "MED002",
    drug_name: "Ibuprofen",
    brand_name: "Brufen",
    strength: "400mg",
    quantity: 5,
    unit_type: "tablet",
    status: "pending",
    seller_name: "XYZ Pharma",
    total_amount: 15.0,
    created_at: "2025-01-27T11:15:00Z",
  },
  {
    order_id: "ORD003",
    medicine_code: "MED003",
    drug_name: "Amoxicillin",
    brand_name: "Amoxil",
    strength: "250mg",
    quantity: 20,
    unit_type: "capsule",
    status: "completed",
    seller_name: "ABC Distributors",
    total_amount: 110.0,
    created_at: "2025-01-26T14:20:00Z",
    accepted_by: "SEL001",
  },
]

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "completed":
        return <Package className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600">Your orders will appear here once you place them</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.order_id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.order_id}</CardTitle>
                      <p className="text-sm text-gray-600">Placed on {formatDate(order.created_at)}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {order.drug_name} ({order.strength})
                      </h4>
                      <p className="text-sm text-gray-600">Brand: {order.brand_name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {order.quantity} {order.unit_type}s
                      </p>
                      <p className="text-sm text-gray-600">From: {order.seller_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{order.total_amount.toFixed(2)}</p>
                      {order.status === "accepted" && <p className="text-sm text-blue-600">Accepted by seller</p>}
                      {order.status === "completed" && <p className="text-sm text-green-600">Order completed</p>}
                      {order.status === "rejected" && <p className="text-sm text-red-600">Order rejected</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </BuyerLayout>
  )
}
