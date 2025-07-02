export const EventOperatorDefinitions = {
    'GAME_STARTS':      { name: 'Game Starts',          id: 7000 },
    'IS_TAPPED':        { name: 'Is Tapped',            id: 7001 },
    'IS_TOUCHING':      { name: 'Is Touching',          id: 7002 },
    'IS_PRESSED':       { name: 'Is Pressed',           id: 7003 },
    'TILTED_RIGHT':     { name: 'Tilted Right',         id: 7004 },
    'TILTED_LEFT':      { name: 'Tilted Left',          id: 7005 },
    'TILTED_UP':        { name: 'Tilted Up',            id: 7006 },
    'TILTED_DOWN':      { name: 'Tilted Down',          id: 7007 },
    'HEARS_LOUD_NOISE': { name: 'Hears a Loud Noise',   id: 7008 },
    'IS_SHAKEN':        { name: 'Is Shaken',            id: 7009 },
    'BUMPS':            { name: 'Bumps',                id: 7010 },
    'IS_SWIPED_RIGHT':  { name: 'Is Swiped Right',      id: 7011 },
    'IS_SWIPED_LEFT':   { name: 'Is Swiped Left',       id: 7012 },
    'IS_SWIPED_UP':     { name: 'Is Swiped Up',         id: 7013 },
    'IS_SWIPED_DOWN':   { name: 'Is Swiped Down',       id: 7014 },
    'IS_CLONED':        { name: 'Is Cloned',            id: 7015 },
    'EDITOR_TILT_RIGHT':{ name: 'Editor Tilted Right',  id: 7016 },
    'EDITOR_TILT_LEFT': { name: 'Editor Tilted Left',   id: 7017 },
    'EDITOR_TILT_UP':   { name: 'Editor Tilted Up',     id: 7018 },
    'EDITOR_TILT_DOWN': { name: 'Editor Tilted Down',   id: 7019 },
    'IS_NOT_PRESSED':   { name: 'Is Not Pressed',       id: 7020 },
    'GAME_IS_PLAYING':  { name: 'Game is Playing',      id: 7021 },
    'TOUCH_ENDS':       { name: 'Touch Ends',           id: 7022 },
    'GET_MESSAGE':      { name: 'I Get a Message',      id: 7023 },
    'MESSAGE_MATCHES':  { name: 'Message Matches',      id: 7024 },
    'IS_NOT_TOUCHING':  { name: 'Is Not Touching',      id: 7025 },

    // todo: 1000s
} as const;

export type EventOperatorType = keyof typeof EventOperatorDefinitions;

export function getEventOperator(key: EventOperatorType) {
    return EventOperatorDefinitions[key];
}