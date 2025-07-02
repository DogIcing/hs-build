import { BlockType } from "./data/blocks";
import { ParameterType } from "./data/parameterType";
import { parameterBuilder } from "./parameter";

export class BlockCollectionBuilder {
    blocks: Block[] = [];

    setText(text: string, color: string) {
        this.blocks.push(new Block('SET_TEXT', [
            parameterBuilder(ParameterType.SetText, text, 'to'),
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