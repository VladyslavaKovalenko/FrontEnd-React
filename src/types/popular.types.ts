export interface IPopularStore{
    selectedLanguage: string,
    loading: boolean,
    repos: []|IRepos[],
    error: null | string
}

export type ReposT= [] | IRepos[]

export type ErrorT= string | null

export interface IRepos{
    [key: string]: any
}

export interface NavigateParams {
    hash: string;
    replace: boolean;
}