enum CLIENT_EVENTS {
    INITIALIZATION = 'initialization',
    CONNECTION = 'connection',
    DISCONNECT = 'disconnection',
    ERROR = 'error',
    INITIALIZATION_COMPLETE = 'initializationComplete',
    PLAY_SOUND = "play",
    PAUSE_SOUND = "pause"
}

enum SERVER_EVENTS  {
    CONNECTION = 'connection',
    DISCONNECT= 'disconnection',
    ERROR = 'error',
    COMPLETE_INITALIZATION = 'completeInitialization',
    PLAY_SOUND = "play",
    PAUSE_SOUND = "pause"
}

export { CLIENT_EVENTS, SERVER_EVENTS };