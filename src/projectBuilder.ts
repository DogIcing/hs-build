import { getHSObject } from "./data/objects";
import { abilities, eventParams } from "./globals";
import { Scene } from "./scene";
import { getBlock } from "./data/blocks";
import { getRule } from "./data/rule";

export class ProjectBuilder {
    scenes: Scene[] = [];

    addScene(scene: Scene) {
        this.scenes.push(scene);
        return this;
    }

    serialize() {
        const output = {
            scenes: [],
            objects: [],
            eventParams: eventParams.map(eventParam => ({
                description: eventParam.description,
                id: eventParam.id,
                blockType: eventParam.blockType,
                objectId: eventParam.objectId
            })),
            abilities: abilities.map(ability => ({
                blocks: ability.blocks.map(block => ({
                    parameters: block.parameters ?? [],
                    //block_class: "method", todo
                    type: getBlock(block.type).id,
                    description: getBlock(block.type).name
                })),
                createdAt: ability.createdAt,
                abilityID: ability.id,
                name: ability.name
            })),
            rules: [],
        }

        this.scenes.forEach(scene => {
            output.scenes.push({
                id: scene.id,
                name: scene.name,
                objects: scene.objects.map(x => x.id)
            });

            scene.objects.forEach(object => {
                output.objects.push({
                    objectID: object.id,
                    rotation: 0, //todo
                    width: 0, //todo
                    height: 0, //todo
                    text: '', //todo
                    resizeScale: 0, //todo
                    xPosition: 0, //todo
                    yPosition: 0, //todo

                    name: object.data.name,
                    type: getHSObject(object.type).id,
                    rules: object.rules.map(x => x.id)
                });

                object.rules.forEach(rule => {
                    output.rules.push({
                        ruleBlockType: getRule(rule.type).id,
                        type: getRule(rule.type).id, // I cant seem to find an example where these are different?
                        abilityID: rule.ability.id,
                        id: rule.id,
                        parameters: rule.parameters ?? [],
                        objectID: rule.objectId,
                        name: "", // todo
                    });
                });
            });
        });

        return output;
    }
}