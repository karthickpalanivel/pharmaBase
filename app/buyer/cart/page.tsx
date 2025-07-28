"use client"

import { useState, useEffect } from "react"
import { BuyerLayout } from "@/components/layouts/buyer-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type CartItem = {
  medicine_code: string
  drug_name: string
  brand_name: string
  strength: string
  unit_type: string
  price_per_unit: number
  seller_name: string
  seller_id: string
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()
  const router = useRouter()

  // Mock cart data - in real app, this would come from context or API
  useEffect(() => {
    const mockCart: CartItem[] = [
      {
        medicine_code: "MED001",
        drug_name: "Paracetamol",
        brand_name: "Calpol",
        strength: "500mg",
        unit_type: "tablet",
        price_per_unit: 2.5,
        seller_name: "ABC Distributors",
        seller_id: "SEL001",
        quantity: 10,
      },
      {
        medicine_code: "MED002",
        drug_name: "Ibuprofen",
        brand_name: "Brufen",
        strength: "400mg",
        unit_type: "tablet",
        price_per_unit: 3.0,
        seller_name: "XYZ Pharma",
        seller_id: "SEL002",
        quantity: 5,
      },
    ]
    setCart(mockCart)
  }, [])

  const updateQuantity = (medicineCode: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(medicineCode)
      return
    }

    setCart(cart.map((item) => (item.medicine_code === medicineCode ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (medicineCode: string) => {
    setCart(cart.filter((item) => item.medicine_code !== medicineCode))
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price_per_unit * item.quantity, 0)
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order",
        variant: "destructive",
      })
      return
    }

    // Mock order placement
    toast({
      title: "Order placed successfully!",
      description: `Order for ₹${getTotalAmount().toFixed(2)} has been placed`,
    })

    setCart([])
    router.push("/buyer/my-orders")
  }

  if (cart.length === 0) {
    return (
      <BuyerLayout>
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some medicines to your cart to get started</p>
          <Button onClick={() => router.push("/buyer/order")}>Start Shopping</Button>
        </div>
      </BuyerLayout>
    )
  }

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.medicine_code}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.drug_name} ({item.strength})
                      </h3>
                      <p className="text-sm text-gray-600">Brand: {item.brand_name}</p>
                      <p className="text-sm text-gray-500">From: {item.seller_name}</p>
                      <p className="text-lg font-bold text-green-600 mt-2">
                        ₹{item.price_per_unit} per {item.unit_type}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.medicine_code, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.medicine_code, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">₹{(item.price_per_unit * item.quantity).toFixed(2)}</p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.medicine_code)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getTotalAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={handlePlaceOrder} className="w-full" size="lg">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BuyerLayout>
  )
}
