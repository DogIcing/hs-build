import { v4 } from "uuid";
import { DatumSerializableParameter } from "./datumSerializableParameter";

class Trait extends DatumSerializableParameter {
    type: number;
    id: string;
    description: string;

    constructor(type: number, description: string) {
        super();
        this.type = type;
        this.description = description;
        this.id = v4();
        this.serializeDatum = () => ({
            HSTraitTypeKey: this.type,
            HSTraitIDKey: this.id,
            description: this.description
        });
    }
}

export const Width = new Trait(3000, 'Width');
export const Height = new Trait(3001, 'Height');