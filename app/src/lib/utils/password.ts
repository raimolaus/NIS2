/**
 * Parooli nõuded:
 * - Vähemalt 8 märki
 * - Vähemalt 2 tähemärki (a-z, A-Z)
 * - Vähemalt 2 sümbolit (!@#$%^&* jne)
 */

export function validatePassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Parool peab olema vähemalt 8 märki',
    };
  }

  // Count letters (a-z, A-Z)
  const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 2) {
    return {
      isValid: false,
      error: 'Parool peab sisaldama vähemalt 2 tähemärki',
    };
  }

  // Count special characters
  const symbolCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
  if (symbolCount < 2) {
    return {
      isValid: false,
      error: 'Parool peab sisaldama vähemalt 2 sümbolit (!@#$%^&* jne)',
    };
  }

  return { isValid: true };
}

export function getPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong';
  percentage: number;
} {
  let score = 0;

  // Length
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;

  // Letters
  const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
  if (letterCount >= 2) score += 15;
  if (letterCount >= 4) score += 10;

  // Numbers
  const numberCount = (password.match(/[0-9]/g) || []).length;
  if (numberCount >= 1) score += 10;
  if (numberCount >= 2) score += 5;

  // Special characters
  const symbolCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
  if (symbolCount >= 2) score += 10;

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 70) strength = 'strong';
  else if (score >= 50) strength = 'medium';

  return { strength, percentage: Math.min(score, 100) };
}
