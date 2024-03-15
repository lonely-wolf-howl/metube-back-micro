/// <reference types="node" />
import { ICommand } from '@nestjs/cqrs';
export declare class CreateVideoCommand implements ICommand {
    readonly title: string;
    readonly displayName: string;
    readonly email: string;
    readonly mimetype: string;
    readonly extension: string;
    readonly buffer: Buffer;
    constructor(title: string, displayName: string, email: string, mimetype: string, extension: string, buffer: Buffer);
}
