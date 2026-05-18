// Product types
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  batchNumber: string;
  manufacturingDate: string;
  manufacturerId: string;
  manufacturerName: string;
  createdAt: string;
  blockIndex: number;
  blockHash: string;
}

export interface ProductInput {
  name: string;
  sku: string;
  description: string;
  category: string;
  batchNumber: string;
  manufacturingDate: string;
}

// Manufacturer types
export interface Manufacturer {
  id: string;
  name: string;
  email: string;
  password: string; // Hashed
  company: string;
  createdAt: string;
}

export interface ManufacturerInput {
  name: string;
  email: string;
  password: string;
  company: string;
}

export interface ManufacturerSession {
  id: string;
  name: string;
  email: string;
  company: string;
}

// Blockchain types
export interface BlockData {
  productId: string;
  productName: string;
  sku: string;
  manufacturerId: string;
  manufacturerName: string;
  action: 'REGISTER' | 'VERIFY';
  timestamp: number;
}

export interface Block {
  index: number;
  timestamp: number;
  data: BlockData;
  previousHash: string;
  hash: string;
  nonce: number;
}

// Verification types
export interface VerificationResult {
  isAuthentic: boolean;
  product: Product | null;
  block: Block | null;
  chainValid: boolean;
  message: string;
  verifiedAt: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
