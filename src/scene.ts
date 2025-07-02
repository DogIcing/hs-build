import { v4 } from "uuid";
import { HSObject, HSObjectCollectionBuilder } from "./object";

export type SceneObjectsBuilder = (HSObjectCollectionBuilder: HSObjectCollectionBuilder) => void;

export class Scene {
    objects: HSObject[];
    name: string;
    id: string;

    constructor(name: string, objectBuilder?: SceneObjectsBuilder) {
        this.name = name;
        this.id = v4();

        const builder = new HSObjectCollectionBuilder();
        objectBuilder(builder);
        this.objects = builder.objects;
    }

    addObject(obj: HSObject) {
        this.objects.push(obj);
    }
}