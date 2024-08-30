export interface GameInterface {
    id: number,
    name: string,
    cover?: Cover,
    involved_companies?: InvolvedCompanies,
    summary?: string,
    storyline?: string,
    first_release_date?: number,
    genres?: Genres[],
    rating: number,
    similar_games?: number[],
    screenshots?: Screenshot[] | undefined,
}

export interface Screenshot {
    id?: number,
    image_id?: number,
}

export interface Cover {
    id: number,
    image_id?: string,
    game_localization?: number,
}

export interface Genres {
    id: number,
    name?: string
}

export interface InvolvedCompanies {
    id: number,
    company?: CompanyInfo
}

export interface CompanyInfo {
    id: number,
    name?: string
    company?: SingleCompany
}

export interface SingleCompany {
    id: number,
    name?: string,
}