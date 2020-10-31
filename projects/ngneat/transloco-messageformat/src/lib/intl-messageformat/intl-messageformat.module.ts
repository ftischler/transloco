import { NgModule, ModuleWithProviders } from '@angular/core';
import { TRANSLOCO_TRANSPILER } from '@ngneat/transloco';
import { IntlMessageformatConfig, TRANSLOCO_INTL_MESSAGE_FORMAT_CONFIG } from './intl-messageformat.config';
import { IntlMessageformatTranspiler } from './intl-messageformat.transpiler';

@NgModule()
export class TranslocoIntlMessageFormatModule {
  static init(config?: IntlMessageformatConfig): ModuleWithProviders<TranslocoIntlMessageFormatModule> {
    return {
      ngModule: TranslocoIntlMessageFormatModule,
      providers: [
        { provide: TRANSLOCO_INTL_MESSAGE_FORMAT_CONFIG, useValue: config },
        {
          provide: TRANSLOCO_TRANSPILER,
          useClass: IntlMessageformatTranspiler
        }
      ]
    };
  }

  constructor() {}
}
