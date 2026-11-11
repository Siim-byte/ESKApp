//getall
export interface SkateparkSummary {
    id: string,
    name: string
}

//getbyid
export interface Skatepark {
    id: string,
    name: string,
    city: string,
    description: string,
    address: string,
    latitude: string,
    longitude: string,
}

//create
export interface SkateparkInput {
    name: string,
    city: string,
    description: string,
    address: string,
}

