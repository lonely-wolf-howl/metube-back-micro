import { IQuery } from '@nestjs/cqrs';
export declare class FindVideosQuery implements IQuery {
    readonly page: number;
    readonly size: number;
    constructor(page: number, size: number);
}
