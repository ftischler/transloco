import { Inject, Injectable, Optional } from '@angular/core';
import {
  DefaultTranspiler,
  getValue,
  HashMap,
  isObject,
  setValue,
  Translation,
  TRANSLOCO_CONFIG,
  TranslocoConfig
} from '@ngneat/transloco';
import { IntlMessageformatConfig, TRANSLOCO_INTL_MESSAGE_FORMAT_CONFIG } from './intl-messageformat.config';
import { IntlMessageFormat } from 'intl-messageformat';
import { Formats } from 'intl-messageformat/src/formatters';

@Injectable()
export class IntlMessageformatTranspiler extends DefaultTranspiler {
  private messageConfig: IntlMessageformatConfig;
  private locales?: string | string[];
  private overrideFormats?: Partial<Formats>;

  constructor(
    @Optional() @Inject(TRANSLOCO_INTL_MESSAGE_FORMAT_CONFIG) config: IntlMessageformatConfig,
    @Optional() @Inject(TRANSLOCO_CONFIG) userConfig?: TranslocoConfig
  ) {
    super(userConfig);
    const { locales, ...messageConfig } = config || { locales: undefined };
    this.messageConfig = messageConfig;
    this.locales = locales;
  }

  transpile(value: any, params: HashMap<any> = {}, translation: Translation): any {
    if (!value) {
      return value;
    }

    if (isObject(value) && params) {
      Object.keys(params).forEach(p => {
        const v = getValue(value as Object, p);
        const getParams = getValue(params, p);

        const transpiled = super.transpile(v, getParams, translation);

        const messageFormat = new IntlMessageFormat(transpiled, this.locales, this.overrideFormats, this.messageConfig);

        value = setValue(value, p, messageFormat.format(params));
      });
    } else if (!Array.isArray(value)) {
      const transpiled = super.transpile(value, params, translation);

      const messageFormat = new IntlMessageFormat(transpiled, this.locales, this.overrideFormats, this.messageConfig);

      return messageFormat.format(params);
    }

    return value;
  }

  onLangChanged(lang: string) {
    this.setLocale(lang);
  }

  setLocale(locale: string) {
    this.locales = locale;
  }
}
