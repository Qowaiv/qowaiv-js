declare namespace Qowaiv {
    interface PercentageFormatOptionsStyleRegistry {
        decimal: never;
        percent: never;
        currency: never;
    }

    type PercentageFormatOptionsStyle = keyof PercentageFormatOptionsStyleRegistry;

    interface PercentageFormatOptionsCurrencyDisplayRegistry {
        code: never;
        symbol: never;
        name: never;
    }

    type PercentageFormatOptionsCurrencyDisplay = keyof PercentageFormatOptionsCurrencyDisplayRegistry;

    interface PercentageFormatOptionsUseGroupingRegistry {}

    type PercentageFormatOptionsUseGrouping = {} extends PercentageFormatOptionsUseGroupingRegistry ? boolean : keyof PercentageFormatOptionsUseGroupingRegistry | "true" | "false" | boolean;
    type ResolvedPercentageFormatOptionsUseGrouping = {} extends PercentageFormatOptionsUseGroupingRegistry ? boolean : keyof PercentageFormatOptionsUseGroupingRegistry | false;

    interface PercentageFormatOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        symbol?: string | undefined;
        style?: PercentageFormatOptionsStyle | undefined;
        useGrouping?: PercentageFormatOptionsUseGrouping | undefined;
        minimumIntegerDigits?: number | undefined;
        minimumFractionDigits?: number | undefined;
        maximumFractionDigits?: number | undefined;
        minimumSignificantDigits?: number | undefined;
        maximumSignificantDigits?: number | undefined;
    }

    interface ResolvedPercentageFormatOptions {
        locale: string;
        numberingSystem: string;
        symbol?: string | undefined;
        style: PercentageFormatOptionsStyle;
        minimumIntegerDigits: number;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        useGrouping: ResolvedPercentageFormatOptionsUseGrouping;
    }

    interface PercentageFormat {
        format(value: number): string;
        resolvedOptions(): ResolvedPercentageFormatOptions;
    }

    interface PercentageFormatConstructor {
        new (locales?: string | string[], options?: PercentageFormatOptions): PercentageFormat;
        (locales?: string | string[], options?: PercentageFormatOptions): PercentageFormat;
        supportedLocalesOf(locales: string | string[], options?: PercentageFormatOptions): string[];
        readonly prototype: PercentageFormat;
    }
}
