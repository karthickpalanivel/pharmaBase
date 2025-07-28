"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus } from "lucide-react"

type Medicine = {
  medicine_code: string
  drug_name: string
  brand_name: string
  strength: string
  unit_type: string
  available_quantity: number
  price_per_unit: number
  seller_name: string
  seller_id: string
}

type MedicineCardProps = {
  medicine: Medicine
  onAddToCart: (medicine: Medicine, quantity: number) => void
  cartQuantity?: number
  onUpdateQuantity?: (medicine: Medicine, quantity: number) => void
}

export function MedicineCard({ medicine, onAddToCart, cartQuantity = 0, onUpdateQuantity }: MedicineCardProps) {
  const handleAddToCart = () => {
    onAddToCart(medicine, 1)
  }

  const handleIncrement = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(medicine, cartQuantity + 1)
    }
  }

  const handleDecrement = () => {
    if (onUpdateQuantity && cartQuantity > 0) {
      onUpdateQuantity(medicine, cartQuantity - 1)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {medicine.drug_name} ({medicine.strength})
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {medicine.unit_type}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">Brand: {medicine.brand_name}</p>
        <p className="text-sm text-gray-500">From: {medicine.seller_name}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Available: {medicine.available_quantity}</p>
            <p className="text-lg font-bold text-green-600">₹{medicine.price_per_unit}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {cartQuantity > 0 ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDecrement} disabled={cartQuantity <= 0}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{cartQuantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleIncrement}
                disabled={cartQuantity >= medicine.available_quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm font-medium">Total: ₹{(cartQuantity * medicine.price_per_unit).toFixed(2)}</p>
          </div>
        ) : (
          <Button onClick={handleAddToCart} className="w-full" disabled={medicine.available_quantity === 0}>
            {medicine.available_quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
