interface DateOnlyFormat {
    locale: string | undefined;
    localeMatcher: "lookup" | "best fit" | undefined;
    dateStyle:  "full" | "long" | "medium" | "short" | undefined;
    numberingSystem: string | undefined;
    weekday: "long" | "short" | "narrow" | undefined;
    era: "long" | "short" | "narrow" | undefined;
    year: "numeric" | "2-digit" | undefined;
    month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
    day: "numeric" | "2-digit" | undefined;
}