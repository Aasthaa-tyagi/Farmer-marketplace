import { NextResponse } from 'next/server';
import { getBlockchain } from '@/lib/blockchain';
import type { ApiResponse, Block } from '@/lib/types';

interface BlockchainState {
  chain: Block[];
  length: number;
  isValid: boolean;
  difficulty: number;
}

export async function GET() {
  try {
    const blockchain = getBlockchain();
    
    const state: BlockchainState = {
      chain: blockchain.getAllBlocks(),
      length: blockchain.getChainLength(),
      isValid: blockchain.isChainValid(),
      difficulty: blockchain.difficulty,
    };

    return NextResponse.json<ApiResponse<BlockchainState>>({
      success: true,
      data: state,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to fetch blockchain state' },
      { status: 500 }
    );
  }
}
