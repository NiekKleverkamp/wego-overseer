import {Maybe} from '@/types/util';

/**
 * Get string from environment
 */
export function getEnvString(name: string): Maybe<string>;
export function getEnvString(name: string, fallback: string): string;
export function getEnvString(name: string, fallback?: string): Maybe<string> {
    return process.env[name] ?? fallback;
}
