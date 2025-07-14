import { Block, BlockCollectionBuilder } from "./block";
import { EventParameterType } from "./data/eventParameterType";
import { EventOperatorType, getEventOperator } from "./data/eventOperators";
import { registerEventParameter } from "./eventParameter";
import { HSObject } from "./object";
import { rules } from "./globals";
import { v4 } from "uuid";
import { getRule, RuleType } from "./data/rule";
import { parameterBuilder } from "./parameter";
import { ParameterType } from "./data/parameterType";
import { Ability, AbilityBlocksBuilder, AbilityCollectionBuilder } from "./ability";

export type RuleAbilitiesBuilder = (abilityCollectionBuilder: AbilityCollectionBuilder) => void;

type ObjectParameter = HSObject | EventParameterType.SELF | EventParameterType.ORIGINAL_OBJECT;

export class RuleCollectionBuilder {
    private parentObject: HSObject;
    rules: Rule[] = [];

    constructor(parentObject: HSObject) {
        this.parentObject = parentObject;
    }

    whenRule(type: EventOperatorType, blockBuilder: AbilityBlocksBuilder, parameters?: any) {
        const builder = new BlockCollectionBuilder();
        blockBuilder(builder);
        this.rules.push(new Rule('WHEN', this.parentObject, new Ability(builder.blocks), [
            parameterBuilder(ParameterType.Event, '', '', {
                type: getEventOperator(type).id,
                description: getEventOperator(type).name,
                block_class: 'operator', // todo: is this always operator?
                params: parameters
            })
        ]));
    }


    gameStarts = (blockBuilder: AbilityBlocksBuilder) => this.whenRule('GAME_STARTS', blockBuilder);

    isTapped = (obj: ObjectParameter, blockBuilder: AbilityBlocksBuilder) => this.whenRule('IS_TAPPED', blockBuilder, [{
        defaultValue: '', value: '', key: '', type: 50,
        variable: obj instanceof HSObject ? registerEventParameter(EventParameterType.OBJECT, obj.id) : registerEventParameter(obj)
    }]);

    gameIsPlaying = (blockBuilder: AbilityBlocksBuilder) => this.whenRule('GAME_IS_PLAYING', blockBuilder);
}

export class Rule {
    type: RuleType;
    parameters: any[];
    ability: Ability;
    id: string;
    parentObject: HSObject;

    constructor(type: RuleType, parentObject: HSObject, ability: Ability, parameters: any[]) {
        this.type = type;
        this.parentObject = parentObject;
        this.parameters = parameters;
        this.ability = ability;
        this.id = v4();
        rules.push(this);
    }
}