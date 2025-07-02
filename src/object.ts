import { Rule, RuleCollectionBuilder } from "./rule";
import { HSObjectType } from "./data/objects";
import { v4 } from "uuid";

export interface HSObjectData {
    name: string
}

export type HSObjectRulesBuilder = (ruleCollectionBuilder: RuleCollectionBuilder) => void;

export class HSObjectCollectionBuilder {
    objects: HSObject[] = [];

    object(type: HSObjectType, name: string, rulesBuilder: HSObjectRulesBuilder) {
        const id = v4();
        const builder = new RuleCollectionBuilder(id);
        rulesBuilder(builder);
        const obj = new HSObject(type, id, {
            name
        }, builder.rules);
        this.objects.push(obj);        
        return obj;
    }
}

export class HSObject {
    rules: Rule[];
    data: HSObjectData;
    type: HSObjectType;
    id: string;

    constructor(type: HSObjectType, id: string, data: HSObjectData, rules: Rule[]) {
        this.type = type;
        this.rules = rules;
        this.data = data;
        this.id = id;
    }

    setName(name: string) {
        this.data.name = name;
        return this;
    }

    clear() {
        this.rules.length = 0;
        return this;
    }

    update(rulesBuilder: HSObjectRulesBuilder) {
        const builder = new RuleCollectionBuilder(this.id);
        rulesBuilder(builder);
        this.rules.push(...builder.rules);
        return this;
    }
}