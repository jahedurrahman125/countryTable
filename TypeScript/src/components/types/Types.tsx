type languages = {
    name: string,
};

export type mainType = {
    flag: string;
    name: string;
    languages: languages[];
    population: number;
    region: string;
};


export type valuesOf = {
    data: mainType[]
}

export type Order = 'asc' | 'desc';


export type ServerResponse = {
    data: mainType[],
    loading?: boolean | boolean[],
    error?: Error | null
}

export type Column = {
    id: "flag" | "name" | "population" | "languages" | "region";
    label: string;
    minWidth?: number;
    align?: 'right';
}