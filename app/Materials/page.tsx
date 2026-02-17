import { useState } from 'react';
import { Plus, Package, Trash2, Edit2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Materials = () => {
  const { materials, addMaterial, deleteMaterial } = useApp();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    quantity: '',
    costPerUnit: '',
    minimumStock: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.unit || !formData.quantity || !formData.costPerUnit || !formData.minimumStock) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addMaterial({
      name: formData.name,
      unit: formData.unit,
      quantity: parseFloat(formData.quantity),
      costPerUnit: parseFloat(formData.costPerUnit),
      minimumStock: parseFloat(formData.minimumStock),
    });

    toast({
      title: "Success",
      description: "Material added successfully",
    });

    setFormData({ name: '', unit: '', quantity: '', costPerUnit: '', minimumStock: '' });
    setIsOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deleteMaterial(id);
    toast({
      title: "Deleted",
      description: `${name} has been removed`,
    });
  };

  return (
    <DashboardLayout title="Raw Materials" subtitle="Manage your inventory ingredients">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Materials</p>
            <p className="font-display text-2xl font-bold">{materials.length}</p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Material</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Material Name</label>
                <Input
                  placeholder="e.g., Eggs"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Unit</label>
                  <Input
                    placeholder="e.g., pieces"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cost per Unit ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 0.50"
                    value={formData.costPerUnit}
                    onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Stock</label>
                  <Input
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" className="flex-1">
                  Add Material
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {materials.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">No materials yet</h3>
          <p className="text-muted-foreground mb-6">Add your first raw material to get started</p>
          <Button variant="gradient" onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Material
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {materials.map((material, index) => {
            const isLowStock = material.quantity <= material.minimumStock;
            return (
              <Card 
                key={material.id}
                className={`p-4 hover:shadow-md transition-all duration-200 opacity-0 animate-scale-in ${
                  isLowStock ? 'border-destructive/50 bg-destructive/5' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isLowStock ? 'bg-destructive/20 text-destructive' : 'bg-primary/10 text-primary'
                  }`}>
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(material.id, material.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-display font-semibold text-foreground mb-1">{material.name}</h3>
                
                {isLowStock && (
                  <span className="inline-block text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full mb-2">
                    Low Stock!
                  </span>
                )}
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Stock: <span className="font-medium text-foreground">{material.quantity} {material.unit}</span></p>
                  <p>Min: {material.minimumStock} {material.unit}</p>
                  <p>Cost: ${material.costPerUnit}/{material.unit}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm">
                    Total Value: <span className="font-semibold text-primary">${(material.quantity * material.costPerUnit).toFixed(2)}</span>
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Materials;
