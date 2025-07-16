import { ParameterType } from "./data/parameterType";
import { DatumSerializableParameter } from "./datumSerializableParameter";
import { parameterBuilder } from "./parameter";

export function divide(a: NumberParameter, b: NumberParameter): DatumSerializableParameter {
    return {
        serializeDatum: () => ({
            keyboardName: "Divide",
            block_class: "operator",
            type: 4003, //todo: Create a data file for math operators
            description: "÷",
            params: [
                parameterBuilder<number>(ParameterType.MultiPurposeNumberDefault, a),
                parameterBuilder<number>(ParameterType.MultiPurposeNumberDefault, b, '÷')
            ]
        })
    }
}

type NumberParameter = number | DatumSerializableParameter;