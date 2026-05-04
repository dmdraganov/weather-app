type NameStyle = 'short' | 'long' | 'narrow';
type NumericStyle = 'numeric' | '2-digit';

export interface DateFormatOptions {
  weekday?: NameStyle;
  month?: NameStyle;
  day?: NumericStyle;
  year?: NumericStyle;
  locale?: string;
}

export type FormattedDate<T extends DateFormatOptions> = {
  readonly [P in keyof Omit<T, 'locale'>]: string;
};

export const formatDate = <T extends DateFormatOptions>(
  date: Date,
  { locale = 'en-US', ...options }: T
): FormattedDate<T> => {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(options)) {
    if (value) {
      result[key] = date.toLocaleDateString(locale, {
        [key]: value as string,
      } as Intl.DateTimeFormatOptions);
    }
  }

  return result as FormattedDate<T>;
};
