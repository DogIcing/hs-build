export const RuleDefinitions = {
    'WHEN': { name: 'When', id: 6000 },
} as const;

export type RuleType = keyof typeof RuleDefinitions;

export function getRule(key: RuleType) {
    return RuleDefinitions[key];
}