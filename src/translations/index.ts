import { Language, AppTranslations } from './types';
import { en } from './en';
import { hi } from './hi';

export * from './types';
export { en, hi };

export const translations: Record<Language, AppTranslations> = {
  en,
  hi,
};
