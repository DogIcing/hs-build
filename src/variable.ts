import { v4 } from "uuid";
import { EventParameterType } from "./data/eventParameterType";
import { HSObject } from "./object";
import { DatumSerializableParameter } from "./datumSerializableParameter";

export function GameVariable(name: string) {
    return new Variable(name, EventParameterType.GAME);
}

export function ObjectVariable(name: string, obj: HSObject | 'ORIGINAL') {
    return new Variable(
        name,
        obj === 'ORIGINAL' ? EventParameterType.ORIGINAL_OBJECT :
            EventParameterType.OBJECT,
    );
}

export class Variable extends DatumSerializableParameter {
    objectIdString: string;
    name: string;
    type: EventParameterType;

    constructor(name: string, type: EventParameterType) {
        super();
        this.name = name;
        this.type = type;
        this.objectIdString = v4();
        this.serializeDatum = () => ({
            type: this.type,
            variable: this.objectIdString,
            description: "Variable"
        });
    }
}

export class VariableCollectionBuilder {
    variables: Variable[] = [];
    game = (name: string) => pushWithReturn(this.variables, GameVariable(name))
    object = (name: string, obj: HSObject | 'ORIGINAL') => pushWithReturn(this.variables, ObjectVariable(name, obj))
}

const pushWithReturn = (arr: any[], val: any) => {
    arr.push(val);
    return val;
}