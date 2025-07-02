import { EventParameterType, EventParameterTypeDescriptions } from "./data/eventParameterType";
import { v4 } from "uuid";
import { eventParams } from "./globals";

export function registerEventParameter(type: EventParameterType.OBJECT, objectId: string): string;
export function registerEventParameter(type: Exclude<EventParameterType, EventParameterType.OBJECT>, objectId?: undefined): string;
export function registerEventParameter(type: EventParameterType, objectId?: string): string {
    const id = v4();

    if (type === EventParameterType.OBJECT) {
        if (!objectId) {
            throw new Error("objectId is required when type is AuxTypes.OBJECT");
        }
    } else {

    }

    eventParams.push({
        id,
        objectId,
        description: EventParameterTypeDescriptions[type],
        blockType: type,
    })    

    return id;
}