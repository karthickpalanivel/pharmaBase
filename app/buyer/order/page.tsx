"use client"

import { useState } from "react"
import { BuyerLayout } from "@/components/layouts/buyer-layout"
import { MedicineCard } from "@/components/medicine-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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

type CartItem = Medicine & { quantity: number }

// Mock data
const mockMedicines: Medicine[] = [
  {
    medicine_code: "MED001",
    drug_name: "Paracetamol",
    brand_name: "Calpol",
    strength: "500mg",
    unit_type: "tablet",
    available_quantity: 100,
    price_per_unit: 2.5,
    seller_name: "ABC Distributors",
    seller_id: "SEL001",
  },
  {
    medicine_code: "MED002",
    drug_name: "Ibuprofen",
    brand_name: "Brufen",
    strength: "400mg",
    unit_type: "tablet",
    available_quantity: 50,
    price_per_unit: 3.0,
    seller_name: "XYZ Pharma",
    seller_id: "SEL002",
  },
  {
    medicine_code: "MED003",
    drug_name: "Amoxicillin",
    brand_name: "Amoxil",
    strength: "250mg",
    unit_type: "capsule",
    available_quantity: 75,
    price_per_unit: 5.5,
    seller_name: "ABC Distributors",
    seller_id: "SEL001",
  },
  {
    medicine_code: "MED004",
    drug_name: "Cetirizine",
    brand_name: "Zyrtec",
    strength: "10mg",
    unit_type: "tablet",
    available_quantity: 200,
    price_per_unit: 1.8,
    seller_name: "PQR Medical",
    seller_id: "SEL003",
  },
]

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines)
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.drug_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.strength.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddToCart = (medicine: Medicine, quantity: number) => {
    const existingItem = cart.find((item) => item.medicine_code === medicine.medicine_code)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.medicine_code === medicine.medicine_code ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setCart([...cart, { ...medicine, quantity }])
    }

    toast({
      title: "Added to cart",
      description: `${medicine.drug_name} added to your cart`,
    })
  }

  const handleUpdateQuantity = (medicine: Medicine, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => item.medicine_code !== medicine.medicine_code))
    } else {
      setCart(cart.map((item) => (item.medicine_code === medicine.medicine_code ? { ...item, quantity } : item)))
    }
  }

  const getCartQuantity = (medicineCode: string) => {
    const item = cart.find((item) => item.medicine_code === medicineCode)
    return item ? item.quantity : 0
  }

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Order Medicines</h1>
          <Link href="/buyer/cart">
            <Button className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by drug name, brand, or strength..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.medicine_code}
              medicine={medicine}
              onAddToCart={handleAddToCart}
              cartQuantity={getCartQuantity(medicine.medicine_code)}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No medicines found matching your search.</p>
          </div>
        )}
      </div>
    </BuyerLayout>
  )
}
