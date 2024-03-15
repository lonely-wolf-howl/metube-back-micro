import { IEvent } from '@nestjs/cqrs';
export declare class VideoCreatedEvent implements IEvent {
    readonly id: string;
    constructor(id: string);
}
