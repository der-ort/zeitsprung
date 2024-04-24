export interface Trip {
    id: number;
    authorId: number;
    name: string;
    description: string;
    locationCenter?: number[],
    start: number,
    end: number,
    length?: () => void // add a length function to automatically set the length
}

export interface Day {
    id: number,
    date: number; //timestamp
    tripId: number, //associated Trip ID 
    description: string,
    blogEntry: string,
    assets: Asset[],
    locationCenter?: number[],
    mood: number, //mood is a number from 0-5 representing 6 different moods
    weather: any; // 
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
    assetType: string;              //image / note 
    fileLocation: string;
    coordinates: number[] | null; 
    captureDate: number; 
    associatedDate: number; 
    associatedTrips: number[] | null; 
    exifData: string;
}