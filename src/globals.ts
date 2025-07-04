import { Ability } from "./ability"
import { EventParameterType } from "./data/eventParameterType"
import { Rule } from "./rule"

export const eventParams: {
    objectId?: string,
    description: string,
    id: string,
    blockType: EventParameterType
}[] = []

export const rules: Rule[] = []

export const abilities: Ability[] = []