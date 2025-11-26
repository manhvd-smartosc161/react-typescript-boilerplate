import { MESSAGES } from '@src/constants';

/**
 * Translates validation error messages to the current language
 * This function maps MESSAGES constants to their translation keys
 */
export const getTranslatedValidationMessage = (
  message: string,
  t: (key: string) => string,
): string => {
  const translations: Record<string, string> = {
    [MESSAGES.MSG_001]: t('common:registration.errors.requiredField'),
    [MESSAGES.MSG_016]: t(
      'common:registration.errors.atLeastOneAddressRequired',
    ),
    [MESSAGES.MSG_017]: t(
      'common:registration.errors.atLeastOnePaymentRequired',
    ),
    [MESSAGES.MSG_018]: t('common:registration.errors.atLeastOneSiteRequired'),
    [MESSAGES.MSG_019]: t(
      'common:registration.errors.atLeastOneBusinessUnitRequired',
    ),
    [MESSAGES.MSG_023]: t('common:registration.errors.mustBeAtLeast1'),
    [MESSAGES.MSG_024]: t('common:registration.errors.mustBeInteger'),
    [MESSAGES.MSG_025]: t('common:registration.errors.taxIdMustBe13Digits'),
    [MESSAGES.MSG_026]: t('common:registration.errors.invalidTaxId'),
    [MESSAGES.MSG_027]: t('common:registration.errors.remarksMaxLength'),
  };

  return translations[message] || message;
};

