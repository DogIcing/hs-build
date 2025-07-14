import { Rule, RuleCollectionBuilder } from "./rule";
import { HSObjectType } from "./data/objects";
import { v4 } from "uuid";
import { Scene } from "./scene";
import { randomRange } from "./util/internal";

export interface HSObjectData {
    name: string,
    xPosition?: number,
    yPosition?: number,
}

export type HSObjectRulesBuilder = (ruleCollectionBuilder: RuleCollectionBuilder) => void;

export class HSObjectCollectionBuilder {
    objects: HSObject[] = [];
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    object(type: HSObjectType, name: string, rulesBuilder: HSObjectRulesBuilder) {
        const id = v4();
        const obj = new HSObject(type, id, {
            name
        }, this.scene);
        const builder = new RuleCollectionBuilder(obj);
        rulesBuilder(builder);
        obj.rules = builder.rules;
        this.objects.push(obj);
        return obj;
    }
}

export class HSObject {
    rules: Rule[];
    data: HSObjectData;
    type: HSObjectType;
    id: string;
    scene: Scene;

    constructor(type: HSObjectType, id: string, data: HSObjectData, scene: Scene, rules?: Rule[]) {
        this.scene = scene;
        this.type = type;
        this.rules = rules;
        this.data = {
            xPosition: randomRange(0, scene.project.stageSize.width),
            yPosition: randomRange(0, scene.project.stageSize.height),
            ...data
        };
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
        const builder = new RuleCollectionBuilder(this);
        rulesBuilder(builder);
        this.rules.push(...builder.rules);
        return this;
    }
}