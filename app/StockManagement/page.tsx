"use client";

import { useState } from 'react';
import { Boxes, Plus, Minus, History } from 'lucide-react';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import { useToast } from '../hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const StockManagement = () => {
  const { materials, stockLogs, updateStock } = useApp();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<'add' | 'remove'>('add');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMaterial || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    updateStock(selectedMaterial, parseFloat(quantity), actionType, remarks);

    toast({
      title: "Success",
      description: `Stock ${actionType === 'add' ? 'added' : 'removed'} successfully`,
    });

    setSelectedMaterial('');
    setQuantity('');
    setRemarks('');
    setIsOpen(false);
  };

  const openDialog = (type: 'add' | 'remove') => {
    setActionType(type);
    setIsOpen(true);
  };

  return (
    <DashboardLayout title="Stock Management" subtitle="Adjust inventory levels">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <Boxes className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stock Adjustments</p>
            <p className="font-display text-2xl font-bold">{stockLogs.length}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="success" onClick={() => openDialog('add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
          <Button variant="destructive" onClick={() => openDialog('remove')}>
            <Minus className="h-4 w-4 mr-2" />
            Remove Stock
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {actionType === 'add' ? 'Add Stock' : 'Remove Stock'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Material</label>
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} ({m.quantity} {m.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Remarks (Optional)</label>
              <Textarea
                placeholder={actionType === 'add' ? "e.g., New shipment received" : "e.g., Spoiled items"}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant={actionType === 'add' ? 'success' : 'destructive'}
                className="flex-1"
              >
                {actionType === 'add' ? 'Add Stock' : 'Remove Stock'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {materials.map((material, index) => (
          <Card 
            key={material.id}
            className="p-4 opacity-0 animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold">{material.name}</h3>
              <span className={`text-sm font-medium ${
                material.quantity <= material.minimumStock ? 'text-destructive' : 'text-success'
              }`}>
                {material.quantity} {material.unit}
              </span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setSelectedMaterial(material.id);
                  openDialog('add');
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setSelectedMaterial(material.id);
                  openDialog('remove');
                }}
              >
                <Minus className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Stock History */}
      <Card className="opacity-0 animate-fade-in stagger-4">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <History className="h-5 w-5 text-muted-foreground" />
          <div>
            <h2 className="font-display text-lg font-semibold">Stock History</h2>
            <p className="text-sm text-muted-foreground">Recent stock adjustments</p>
          </div>
        </div>

        {stockLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No stock adjustments yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {stockLogs.slice().reverse().slice(0, 10).map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    log.type === 'add' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {log.type === 'add' ? <Plus className="h-5 w-5" /> : <Minus className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{log.materialName}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.remarks || (log.type === 'add' ? 'Stock added' : 'Stock removed')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    log.type === 'add' ? 'text-success' : 'text-destructive'
                  }`}>
                    {log.type === 'add' ? '+' : '-'}{log.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default StockManagement;
