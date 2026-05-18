'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import type { ProductInput } from '@/lib/types';

interface ProductFormProps {
  onSubmit: (product: ProductInput) => Promise<void>;
  isLoading?: boolean;
}

const categories = [
  'Electronics',
  'Fashion',
  'Food & Beverage',
  'Healthcare',
  'Automotive',
  'Cosmetics',
  'Luxury Goods',
  'Other',
];

export function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    sku: '',
    description: '',
    category: '',
    batchNumber: '',
    manufacturingDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      name: '',
      sku: '',
      description: '',
      category: '',
      batchNumber: '',
      manufacturingDate: '',
    });
  };

  const handleChange = (field: keyof ProductInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Product Name</FieldLabel>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Premium Wireless Headphones"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="sku">SKU / Product Code</FieldLabel>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => handleChange('sku', e.target.value)}
            placeholder="e.g., WH-PRO-001"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="batchNumber">Batch Number</FieldLabel>
          <Input
            id="batchNumber"
            value={formData.batchNumber}
            onChange={(e) => handleChange('batchNumber', e.target.value)}
            placeholder="e.g., BATCH-2024-001"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="manufacturingDate">Manufacturing Date</FieldLabel>
          <Input
            id="manufacturingDate"
            type="date"
            value={formData.manufacturingDate}
            onChange={(e) => handleChange('manufacturingDate', e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe the product..."
            rows={3}
            required
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner className="mr-2" />
            Registering on Blockchain...
          </>
        ) : (
          'Register Product'
        )}
      </Button>
    </form>
  );
}
