DATABASE Structure:

    Tables:
        - TRIPS:
        description: contains all trips
        fields:
            - ID
            - user
            - description
            - locationCenter
            - start
            - end
            - assets

        - ASSETS:
        description: contains all assets
        fields:
            - ID: int
            - description: string
            - location: number[] -> [lat, lon]
            - associatedTrips: number[] -> [tripId1, tripId2, ...]
            - captureDate -> number -> timestamp
            - associatedDate -> number -> timestamp
            - type -> string -> image / note / waypoint 


API Endpoints:

    TRIP:
    - GET:  /trip/:userId
        request:
        responds:    
    
    - POST: /trip/:userId
        request:
        responds:

    - GET   /trip/:id/
        request:
        responds:    
    
    - GET   /trip/:id/assets
        request:
        responds:

    - POST  /trip/:id/assets
        request:
        responds:

    - GET   /trip/:id/assets
        request:
        responds:
    
    -
