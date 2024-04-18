BACKEND:

packages:
    npm:
        - koa:
            - 
        - exifr
        - PostgreSQL
        - sequelize
        - https://www.npmjs.com/package/lunarphase-js

DATABASE Structure:

    Tables:
        - TRIPS:
        description: contains all trips
        fields:
            - ID
            - authorId
            - name
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
            - coordinates: number[] -> [lat, lon]
            - fileLocation: UUID? / file path / URL
            - associatedTrips: number[] -> [tripId1, tripId2, ...]
            - captureDate -> number -> timestamp
            - associatedDate -> number -> timestamp
            - assetType -> string -> image / note / waypoint 


API Endpoints:

    TRIP:
    - GET:  /trips/:userId
        request:
        responds:    
    
    - POST: /trips/:userId
        request:
        responds:

    - GET   /trips/:id/
        request:
        responds:    
    
    - GET   /trips/:id/assets
        request:
        responds: with a sorted (by date) array of asset objects for the trip with the given ID

    - POST  /trips/:id/assets
        request:
        responds:
    
    - GET /trips/:id/day/assets

    - DELETE /trips/:id

    - DELETE /trips/:id/day/:day

    - DELETE /trips/:id/:assetId
