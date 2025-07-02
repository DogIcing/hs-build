export enum EventParameterType {
    OBJECT = 8000,
    ANYTHING = 8001,
    EDGE = 8002,
    GAME = 8003,
    SELF = 8004,
    ORIGINAL_OBJECT = 8005,
    LOCAL = 8006,
    USER = 8007
}

export const EventParameterTypeDescriptions: Record<EventParameterType, string> = {
    [EventParameterType.OBJECT]: 'Object',
    [EventParameterType.ANYTHING]: 'Anything',
    [EventParameterType.EDGE]: 'Edge',
    [EventParameterType.GAME]: 'Game',
    [EventParameterType.SELF]: 'Self',
    [EventParameterType.ORIGINAL_OBJECT]: 'Original Object',
    [EventParameterType.LOCAL]: 'Local',
    [EventParameterType.USER]: 'User'
}