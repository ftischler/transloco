import { InjectionToken } from '@angular/core';

import { Formats, Options } from 'intl-messageformat';

export const TRANSLOCO_INTL_MESSAGE_FORMAT_CONFIG = new InjectionToken<IntlMessageformatConfig>(
  'TRANSLOCO_INTL_MESSAGE_FORMAT_CONFIG'
);

export interface IntlMessageformatConfig extends Options {
  locales?: string | string[];
  overrideFormats?: Partial<Formats>;
}
