export interface Photo {
    alt_description: string;
    urls: {
        full: string;
        raw: string;
        small: string;
        thumb: string;
    }
    id: string;
    liked_by_user: boolean;
    // tags: 
    links: {
        download: string;
        download_location: string;
    }
}

export interface Category {
    label: string;
    backgroundImage?: string;
}

export interface PhotoResponse {
    total: number, 
    total_pages: number, 
    results: Photo[]
}