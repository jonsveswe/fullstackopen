# 0.4: New note diagram
Create a similar diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Type a note and click save.

    browser->>server: POST .../exampleapp/new_note with Payload Form Data "note: asdf"
    activate server
    server-->>browser: Status:302 (Redirect), Type:text/html, Name:new_note, Response: no content since redirect
    deactivate server
    
    Note right of browser: Server asks the browser to perform a new HTTP GET request to the address defined in the header's Location: /notes.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Status:200, Type:text/html (document), Name:notes, Response:<!DOCTYPE html>...
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file "main.css"
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file "main.js"
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

# 0.5: Single page app diagram
Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: Status:200, Type:text/html (document), Name:spa, Response:<!DOCTYPE html>...
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file "main.css"
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file "spa.js"
    deactivate server
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

# 0.6: New note in Single page app diagram
Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Type a note and click save.

    Note right of browser: spa.js in browser renders the updated list, then POST the item to server. 

    browser->>server: POST .../exampleapp/new_note_spa with Payload json {content: "asdf", date: "..."}
    activate server
    server-->>browser: Status:201 (Created), Type:application/json, Name:new_note_spa, Response: {"message": "note created"}
    deactivate server
```