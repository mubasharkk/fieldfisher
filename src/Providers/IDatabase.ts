// IDatabase.ts

import {Model} from '../Models/Model';

export interface IDatabase {
    create(record: Model): Model;

    find(id: string): Model | null;

    update(id: string, updatedFields: Partial<Model>): Model | null;

    delete(id: string): boolean;
}
