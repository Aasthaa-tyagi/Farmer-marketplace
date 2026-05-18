import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/storage';
import { getBlockchain } from '@/lib/blockchain';
import type { ApiResponse, VerificationResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = getProductById(productId);
    const blockchain = getBlockchain();
    const chainValid = blockchain.isChainValid();

    if (!product) {
      const result: VerificationResult = {
        isAuthentic: false,
        product: null,
        block: null,
        chainValid,
        message: 'Product not found in our database. This may be a counterfeit product.',
        verifiedAt: new Date().toISOString(),
      };

      return NextResponse.json<ApiResponse<VerificationResult>>({
        success: true,
        data: result,
      });
    }

    // Get the block associated with this product
    const block = blockchain.getBlockByProductId(productId);

    if (!block) {
      const result: VerificationResult = {
        isAuthentic: false,
        product,
        block: null,
        chainValid,
        message: 'Product found but blockchain record is missing. Verification failed.',
        verifiedAt: new Date().toISOString(),
      };

      return NextResponse.json<ApiResponse<VerificationResult>>({
        success: true,
        data: result,
      });
    }

    // Verify block hash matches product's recorded hash
    const hashMatches = product.blockHash === block.hash;

    const result: VerificationResult = {
      isAuthentic: hashMatches && chainValid,
      product,
      block,
      chainValid,
      message: hashMatches && chainValid
        ? 'This product is authentic and verified on the blockchain.'
        : 'Verification failed. Blockchain integrity compromised or hash mismatch.',
      verifiedAt: new Date().toISOString(),
    };

    return NextResponse.json<ApiResponse<VerificationResult>>({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
