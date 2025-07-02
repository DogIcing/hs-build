import { ParameterType } from "./data/parameterType";

export function parameterBuilder(type: ParameterType, value: string, key?: string, datum?: any, defaultValue?: string) {
    return {
        type: type as number,
        defaultValue, value, key, datum
    }
}