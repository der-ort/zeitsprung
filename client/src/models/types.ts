export interface Trip {
    id: number;
    name: string;
    description: string;
    locationCenter?: number[],
    start: number,
    end: number,
    length: () => void
}

export interface Waypoint {
    id: number,
    description: string,
    imageURL: string,
    captureDate: number, 
    coordinates: number[]
}

export interface Day {
    id: number,
    date: number; //timestamp
    tripId: number, //associated Trip ID 
    description: string,
    assets: Asset[],
    locationCenter?: number[],
    mood: number, //mood is a number from 0-5 representing 6 different moods

}

export const moods = [
    'sad',
    'upset',
    'happy',
    'neutral',
    'euphoric',
    'shocked'
]

export interface Asset {
    id: number;
    description: string;
    name: string;
    assetType: string;              //image / note / waypoint
    fileLocation: string;
    coordinates: number[] | null; 
    captureDate: number; 
    associatedDate: number; 
    associatedTrips: number[] | null; 
}