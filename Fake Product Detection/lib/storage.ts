import type { Product, Manufacturer, ManufacturerInput, ProductInput } from './types';
import { getBlockchain } from './blockchain';
import { hashPassword } from './hash';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
const products: Map<string, Product> = new Map();
const manufacturers: Map<string, Manufacturer> = new Map();

// Initialize with demo data
function initializeDemoData() {
  if (manufacturers.size === 0) {
    // Add demo manufacturer
    const demoManufacturer: Manufacturer = {
      id: 'demo-mfr-001',
      name: 'John Smith',
      email: 'demo@example.com',
      password: hashPassword('demo123'),
      company: 'TechCorp Industries',
      createdAt: new Date().toISOString(),
    };
    manufacturers.set(demoManufacturer.id, demoManufacturer);

    // Add some demo products
    const demoProducts = [
      {
        name: 'Premium Wireless Headphones',
        sku: 'WH-PRO-001',
        description: 'High-quality noise-canceling wireless headphones',
        category: 'Electronics',
        batchNumber: 'BATCH-2024-001',
        manufacturingDate: '2024-01-15',
      },
      {
        name: 'Smart Watch Pro',
        sku: 'SW-PRO-002',
        description: 'Advanced fitness tracking smartwatch',
        category: 'Electronics',
        batchNumber: 'BATCH-2024-002',
        manufacturingDate: '2024-02-20',
      },
    ];

    demoProducts.forEach((productData) => {
      const product = createProduct(productData, demoManufacturer.id, demoManufacturer.company);
      products.set(product.id, product);
    });
  }
}

// Product functions
export function createProduct(
  input: ProductInput,
  manufacturerId: string,
  manufacturerName: string
): Product {
  const id = uuidv4();
  const blockchain = getBlockchain();
  
  // Add to blockchain
  const block = blockchain.addBlock({
    productId: id,
    productName: input.name,
    sku: input.sku,
    manufacturerId,
    manufacturerName,
    action: 'REGISTER',
    timestamp: Date.now(),
  });

  const product: Product = {
    id,
    ...input,
    manufacturerId,
    manufacturerName,
    createdAt: new Date().toISOString(),
    blockIndex: block.index,
    blockHash: block.hash,
  };

  products.set(id, product);
  return product;
}

export function getProductById(id: string): Product | null {
  initializeDemoData();
  return products.get(id) || null;
}

export function getAllProducts(): Product[] {
  initializeDemoData();
  return Array.from(products.values());
}

export function getProductsByManufacturer(manufacturerId: string): Product[] {
  initializeDemoData();
  return Array.from(products.values()).filter(
    (p) => p.manufacturerId === manufacturerId
  );
}

// Manufacturer functions
export function createManufacturer(input: ManufacturerInput): Manufacturer {
  const id = uuidv4();
  const manufacturer: Manufacturer = {
    id,
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashPassword(input.password),
    company: input.company,
    createdAt: new Date().toISOString(),
  };

  manufacturers.set(id, manufacturer);
  return manufacturer;
}

export function getManufacturerById(id: string): Manufacturer | null {
  initializeDemoData();
  return manufacturers.get(id) || null;
}

export function getManufacturerByEmail(email: string): Manufacturer | null {
  initializeDemoData();
  const normalizedEmail = email.toLowerCase();
  return Array.from(manufacturers.values()).find(
    (m) => m.email === normalizedEmail
  ) || null;
}

export function manufacturerEmailExists(email: string): boolean {
  initializeDemoData();
  return getManufacturerByEmail(email) !== null;
}

// Statistics
export function getStats() {
  initializeDemoData();
  const blockchain = getBlockchain();
  return {
    totalProducts: products.size,
    totalManufacturers: manufacturers.size,
    totalBlocks: blockchain.getChainLength(),
    chainValid: blockchain.isChainValid(),
  };
}

// Initialize on module load
initializeDemoData();
