import { sha256 } from './hash';
import type { Block, BlockData } from './types';

class BlockClass implements Block {
  index: number;
  timestamp: number;
  data: BlockData;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(
    index: number,
    timestamp: number,
    data: BlockData,
    previousHash: string = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    );
  }

  // Simple proof of work (difficulty = 2 for demo speed)
  mineBlock(difficulty: number = 2): void {
    const target = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  private createGenesisBlock(): Block {
    const genesisData: BlockData = {
      productId: 'GENESIS',
      productName: 'Genesis Block',
      sku: 'GENESIS-001',
      manufacturerId: 'SYSTEM',
      manufacturerName: 'AuthGuard System',
      action: 'REGISTER',
      timestamp: Date.now(),
    };
    return new BlockClass(0, Date.now(), genesisData, '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: BlockData): Block {
    const previousBlock = this.getLatestBlock();
    const newBlock = new BlockClass(
      previousBlock.index + 1,
      Date.now(),
      data,
      previousBlock.hash
    );
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Recalculate hash to verify
      const blockInstance = new BlockClass(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash
      );
      blockInstance.nonce = currentBlock.nonce;
      const recalculatedHash = blockInstance.calculateHash();

      if (currentBlock.hash !== recalculatedHash) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getBlockByProductId(productId: string): Block | null {
    return this.chain.find((block) => block.data.productId === productId) || null;
  }

  getBlockByIndex(index: number): Block | null {
    return this.chain[index] || null;
  }

  getAllBlocks(): Block[] {
    return this.chain;
  }

  getChainLength(): number {
    return this.chain.length;
  }
}

// Singleton instance
let blockchainInstance: Blockchain | null = null;

export function getBlockchain(): Blockchain {
  if (!blockchainInstance) {
    blockchainInstance = new Blockchain();
  }
  return blockchainInstance;
}

export function resetBlockchain(): void {
  blockchainInstance = new Blockchain();
}

export { Blockchain, BlockClass };
