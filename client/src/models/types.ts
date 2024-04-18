// types.ts
export interface Trip {
    id: number;
    name: string;
    description: string;
    locationCenter: number[],
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