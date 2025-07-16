import { getHSObject } from "./data/objects";
import { abilities, eventParams } from "./globals";
import { Scene, SceneCollectionBuilder } from "./scene";
import { getBlock } from "./data/blocks";
import { getRule } from "./data/rule";
import { Variable, VariableCollectionBuilder } from "./variable";

interface StageSize {
    width: number,
    height: number
}

interface ProjectInitData {
    stageSize: StageSize
}

export type ProjectScenesBuilder = (SceneCollectionBuilder: SceneCollectionBuilder, VariableCollectionBuilder: VariableCollectionBuilder) => void;

export class Project {
    stageSize: StageSize;
    scenes: Scene[] = [];
    variables: Variable[];

    constructor(scenesBuilder: ProjectScenesBuilder, data?: ProjectInitData) {
        this.stageSize = {
            width: 1000,
            height: 1000,
            ...data?.stageSize
        }
        const sceneBuilder = new SceneCollectionBuilder(this);
        const variableBuilder = new VariableCollectionBuilder();
        scenesBuilder(sceneBuilder, variableBuilder);
        this.scenes = sceneBuilder.scenes;
        this.variables = variableBuilder.variables;
    }

    serialize() {
        const output = {
            version: 34,
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
            variables: this.variables.map(v => ({
                objectIdString: v.objectIdString,
                name: v.name,
                type: v.type
            })),
            playerVersion: '2.1.1',
            playerUpgrades: {}
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
                    width: '150', //todo
                    height: '150', //todo
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