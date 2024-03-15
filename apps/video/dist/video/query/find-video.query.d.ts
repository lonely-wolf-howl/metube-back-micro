import { IQuery } from '@nestjs/cqrs';
export declare class FindVideoQuery implements IQuery {
    readonly id: string;
    constructor(id: string);
}
