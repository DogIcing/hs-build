import { v4 } from "uuid";
import { HSObject, HSObjectCollectionBuilder } from "./object";
import { Project } from "./project";

export type SceneObjectsBuilder = (HSObjectCollectionBuilder: HSObjectCollectionBuilder) => void;

export class SceneCollectionBuilder {
    scenes: Scene[] = [];
    private project: Project;

    constructor(project: Project) {
        this.project = project;
    }

    scene(name: string, objectsBuilder: SceneObjectsBuilder) {
        const id = v4();
        const scene = new Scene(name, this.project, objectsBuilder);
        const builder = new HSObjectCollectionBuilder(scene);
        objectsBuilder(builder);
        scene.objects = builder.objects;
        this.scenes.push(scene);
        return scene;
    }
}


export class Scene {
    objects: HSObject[];
    name: string;
    id: string;
    project: Project;

    constructor(name: string, project: Project, objectBuilder?: SceneObjectsBuilder) {
        this.name = name;
        this.project = project;
        this.id = v4();

        const builder = new HSObjectCollectionBuilder(this);
        objectBuilder(builder);
        this.objects = builder.objects;
    }
}