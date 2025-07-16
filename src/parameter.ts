import { ParameterType } from "./data/parameterType";
import { DatumSerializableParameter } from "./datumSerializableParameter";

export function parameterBuilder<T = string>(type: ParameterType, value: T | DatumSerializableParameter, key?: string, datum?: any, defaultValue?: string) {
    if (typeof value === 'object' && 'serializeDatum' in value) return {
        type: type as number,
        defaultValue, value: '', key, datum: value.serializeDatum()
    };
    else return {
        type: type as number,
        value: value.toString(),
        defaultValue, datum
    };
}