import { Block, BlockCollectionBuilder } from "./block";
import { abilities } from "./globals";
import { v4 } from "uuid";

export type AbilityBlocksBuilder = (blockCollectionBuilder: BlockCollectionBuilder) => void;

export class AbilityCollectionBuilder {
    abilities: Ability[] = [];

    ability(blockBuilder: AbilityBlocksBuilder, name: string) {
        const id = v4();
        const builder = new BlockCollectionBuilder();
        blockBuilder(builder);
        const ability = new Ability(builder.blocks, name);
        this.abilities.push(ability);
        return ability;
    }
}

export class Ability {
    blocks: Block[];
    id: string;
    createdAt: number;
    name: string;

    constructor(blocks: Block[], name?: string) {
        this.blocks = blocks;
        this.id = v4();
        this.name = name;
        this.createdAt = 0; //todo
        abilities.push(this);
    }
}