import { createHash } from 'crypto';

export function sha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

export function hashPassword(password: string): string {
  // Simple hashing for demo - in production use bcrypt
  return sha256(password + 'authguard_salt_2024');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
