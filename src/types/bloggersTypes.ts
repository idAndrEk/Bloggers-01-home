export type BloggersResponseType = {
    id: string
    name: string
    youtubeUrl: string
}

export type BloggerPayloadType = Omit<BloggersResponseType, 'id'>

export type PaginationType<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T[]
}

// export type BloggersResponseTypeWithPagination = PaginationType<BloggersResponseType>