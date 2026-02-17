import { FileText, Package, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const BillOfMaterials = () => {
  const { materials, getTotalInventoryValue } = useApp();
  const totalValue = getTotalInventoryValue();

  return (
    <DashboardLayout title="Bill of Materials" subtitle="Complete inventory valuation">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 opacity-0 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="font-display text-2xl font-bold">{materials.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 opacity-0 animate-fade-in stagger-1">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <FileText className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Units</p>
              <p className="font-display text-2xl font-bold">
                {materials.reduce((acc, m) => acc + m.quantity, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-primary text-primary-foreground opacity-0 animate-fade-in stagger-2">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-primary-foreground/80">Total Inventory Value</p>
              <p className="font-display text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Materials Table */}
      <Card className="opacity-0 animate-fade-in stagger-3">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-lg font-semibold">Inventory Breakdown</h2>
          <p className="text-sm text-muted-foreground">Detailed view of all materials and their values</p>
        </div>

        {materials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-2">No materials to display</h3>
            <p className="text-sm text-muted-foreground">Add materials to see your inventory valuation</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material Name</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit</TableHead>
                <TableHead className="text-right">Cost/Unit</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => {
                const totalValue = material.quantity * material.costPerUnit;
                const isLowStock = material.quantity <= material.minimumStock;
                return (
                  <TableRow key={material.id} className={isLowStock ? 'bg-destructive/5' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${isLowStock ? 'bg-destructive' : 'bg-success'}`} />
                        {material.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{material.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{material.unit}</TableCell>
                    <TableCell className="text-right">${material.costPerUnit.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${totalValue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={4}>Grand Total</TableCell>
                <TableCell className="text-right text-lg text-primary">
                  ${totalValue.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default BillOfMaterials;
