import { BlockType } from "./data/blocks";
import { ParameterType } from "./data/parameterType";
import { DatumSerializableParameter } from "./datumSerializableParameter";
import { parameterBuilder } from "./parameter";
import { Variable } from "./variable";

export class BlockCollectionBuilder {
    blocks: Block[] = [];

    setVariable(variable: Variable, value: StringParameter) {
        this.blocks.push(new Block('SET_VARIABLE', [
            parameterBuilder(ParameterType.Variable, variable, 'to'),
            parameterBuilder(ParameterType.VariableValue, value)
        ]));
    }

    setText(text: StringParameter, color: string) {
        this.blocks.push(new Block('SET_TEXT', [
            parameterBuilder<string>(ParameterType.SetText, text, 'to'),
            parameterBuilder(ParameterType.LineColor, color, 'color')
        ]));
    }
}

export class Block {
    parameters: any[];
    type: BlockType;

    constructor(type: BlockType, parameters: any[]) {
        this.type = type;
        this.parameters = parameters;
    }
}

type StringParameter = string | DatumSerializableParameter;