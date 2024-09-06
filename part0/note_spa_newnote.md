sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user enters data and clicks save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa with payload
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
    Note right of browser: SPA adds the entered message to the list of notes
