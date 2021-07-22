export declare type ValidationRuleFunction = (value: unknown) => boolean | string | Promise<boolean | string>;
export declare function ruleStringToArray(rulesString: string): string[];
export declare function ruleArrayToString(rulesArray: string[]): string;
