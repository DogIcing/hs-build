import { getHSObject } from "./data/objects";
import { abilities, eventParams } from "./globals";
import { Scene, SceneCollectionBuilder } from "./scene";
import { getBlock } from "./data/blocks";
import { getRule } from "./data/rule";

interface StageSize {
    width: number,
    height: number
}

interface ProjectInitData {
    stageSize: StageSize
}

export type ProjectScenesBuilder = (SceneCollectionBuilder: SceneCollectionBuilder) => void;

export class Project {
    stageSize: StageSize;
    scenes: Scene[] = [];

    constructor(scenesBuilder: ProjectScenesBuilder, data?: ProjectInitData) {
        this.stageSize = {
            width: 1000,
            height: 1000,
            ...data?.stageSize
        }
        const builder = new SceneCollectionBuilder(this);
        scenesBuilder(builder);
        this.scenes = builder.scenes;
    }

    serialize() {
        const output = {
            stageSize: this.stageSize,
            scenes: [],
            objects: [],
            eventParameters: eventParams.map(eventParam => ({
                description: eventParam.description,
                id: eventParam.id,
                blockType: eventParam.blockType,
                objectID: eventParam.objectId
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
                    xPosition: object.data.xPosition,
                    yPosition: object.data.yPosition,

                    name: object.data.name,
                    type: getHSObject(object.type).id,
                    rules: object.rules.map(x => x.id)
                });

                object.rules.forEach(rule => {
                    output.rules.push({
                        ruleBlockType: getRule(rule.type).id,
                        abilityID: rule.ability.id,
                        id: rule.id,
                        parameters: rule.parameters ?? [],
                        objectID: rule.parentObject.id,
                    });
                });
            });
        });

        return output;
    }
}