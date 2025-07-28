"use client"

import { useState } from "react"
import { SellerLayout } from "@/components/layouts/seller-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Package, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type InventoryItem = {
  medicine_code: string
  drug_name: string
  brand_name: string
  strength: string
  unit_type: string
  quantity_available: number
  price_per_unit: number
  reorder_level: number
}

const mockInventory: InventoryItem[] = [
  {
    medicine_code: "MED001",
    drug_name: "Paracetamol",
    brand_name: "Calpol",
    strength: "500mg",
    unit_type: "tablet",
    quantity_available: 85,
    price_per_unit: 2.5,
    reorder_level: 20,
  },
  {
    medicine_code: "MED003",
    drug_name: "Amoxicillin",
    brand_name: "Amoxil",
    strength: "250mg",
    unit_type: "capsule",
    quantity_available: 45,
    price_per_unit: 5.5,
    reorder_level: 30,
  },
  {
    medicine_code: "MED005",
    drug_name: "Aspirin",
    brand_name: "Disprin",
    strength: "325mg",
    unit_type: "tablet",
    quantity_available: 150,
    price_per_unit: 1.8,
    reorder_level: 25,
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    drug_name: "",
    brand_name: "",
    strength: "",
    unit_type: "tablet",
    quantity_available: 0,
    price_per_unit: 0,
    reorder_level: 20,
  })

  const filteredInventory = inventory.filter(
    (item) =>
      item.drug_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMedicine = () => {
    const newMedicine: InventoryItem = {
      medicine_code: `MED${Date.now()}`,
      ...formData,
    }

    setInventory([...inventory, newMedicine])
    setIsAddDialogOpen(false)
    resetForm()

    toast({
      title: "Medicine added",
      description: "New medicine has been added to your inventory",
    })
  }

  const handleUpdateMedicine = () => {
    if (!editingItem) return

    setInventory(
      inventory.map((item) =>
        item.medicine_code === editingItem.medicine_code ? { ...editingItem, ...formData } : item,
      ),
    )

    setEditingItem(null)
    resetForm()

    toast({
      title: "Medicine updated",
      description: "Medicine details have been updated",
    })
  }

  const resetForm = () => {
    setFormData({
      drug_name: "",
      brand_name: "",
      strength: "",
      unit_type: "tablet",
      quantity_available: 0,
      price_per_unit: 0,
      reorder_level: 20,
    })
  }

  const openEditDialog = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      drug_name: item.drug_name,
      brand_name: item.brand_name,
      strength: item.strength,
      unit_type: item.unit_type,
      quantity_available: item.quantity_available,
      price_per_unit: item.price_per_unit,
      reorder_level: item.reorder_level,
    })
  }

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (quantity <= reorderLevel) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    return { label: "In Stock", color: "bg-green-100 text-green-800" }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Medicine</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="drug_name">Drug Name</Label>
                  <Input
                    id="drug_name"
                    value={formData.drug_name}
                    onChange={(e) => setFormData({ ...formData, drug_name: e.target.value })}
                    placeholder="e.g., Paracetamol"
                  />
                </div>
                <div>
                  <Label htmlFor="brand_name">Brand Name</Label>
                  <Input
                    id="brand_name"
                    value={formData.brand_name}
                    onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                    placeholder="e.g., Calpol"
                  />
                </div>
                <div>
                  <Label htmlFor="strength">Strength</Label>
                  <Input
                    id="strength"
                    value={formData.strength}
                    onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <Label htmlFor="unit_type">Unit Type</Label>
                  <Select
                    value={formData.unit_type}
                    onValueChange={(value) => setFormData({ ...formData, unit_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="capsule">Capsule</SelectItem>
                      <SelectItem value="syrup">Syrup</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity_available}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity_available: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price per Unit (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price_per_unit}
                    onChange={(e) =>
                      setFormData({ ...formData, price_per_unit: Number.parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="reorder">Reorder Level</Label>
                  <Input
                    id="reorder"
                    type="number"
                    value={formData.reorder_level}
                    onChange={(e) => setFormData({ ...formData, reorder_level: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button onClick={handleAddMedicine} className="w-full">
                  Add Medicine
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((item) => {
            const stockStatus = getStockStatus(item.quantity_available, item.reorder_level)
            return (
              <Card key={item.medicine_code}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">
                      {item.drug_name} ({item.strength})
                    </CardTitle>
                    <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Brand: {item.brand_name}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Available:</span>
                    <span className="font-medium">
                      {item.quantity_available} {item.unit_type}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-medium text-green-600">₹{item.price_per_unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reorder Level:</span>
                    <span className="font-medium">{item.reorder_level}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(item)} className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No medicines found matching your search.</p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Medicine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit_drug_name">Drug Name</Label>
                <Input
                  id="edit_drug_name"
                  value={formData.drug_name}
                  onChange={(e) => setFormData({ ...formData, drug_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit_brand_name">Brand Name</Label>
                <Input
                  id="edit_brand_name"
                  value={formData.brand_name}
                  onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit_strength">Strength</Label>
                <Input
                  id="edit_strength"
                  value={formData.strength}
                  onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit_unit_type">Unit Type</Label>
                <Select
                  value={formData.unit_type}
                  onValueChange={(value) => setFormData({ ...formData, unit_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="capsule">Capsule</SelectItem>
                    <SelectItem value="syrup">Syrup</SelectItem>
                    <SelectItem value="injection">Injection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit_quantity">Quantity Available</Label>
                <Input
                  id="edit_quantity"
                  type="number"
                  value={formData.quantity_available}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity_available: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit_price">Price per Unit (₹)</Label>
                <Input
                  id="edit_price"
                  type="number"
                  step="0.01"
                  value={formData.price_per_unit}
                  onChange={(e) => setFormData({ ...formData, price_per_unit: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="edit_reorder">Reorder Level</Label>
                <Input
                  id="edit_reorder"
                  type="number"
                  value={formData.reorder_level}
                  onChange={(e) => setFormData({ ...formData, reorder_level: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <Button onClick={handleUpdateMedicine} className="w-full">
                Update Medicine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SellerLayout>
  )
}
