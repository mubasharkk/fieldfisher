import {v4 as uuidv4} from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {Model} from '../Models/Model';
import {IDatabase} from './IDatabase';

export class JsonDatabase implements IDatabase {

    private filePath: string;

    constructor(tableName: string) {
        this.filePath = path.join(__dirname, `../../data/${tableName}.json`);
        this.init();
    }

    private init(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }

    public create(record: Model): Model {
        return this.write(record);
    }

    public find(id: string): Model | null {
        const data = this.readAll();
        return data.find((record) => record.id === id) || null;
    }

    public update(id: string, updatedFields: Partial<Model>): Model | null {
        const record = this.find(id);
        return this.write({...record, ...updatedFields});
    }

    private write(record: Model) {
        const data = this.readAll();
        if (record.id) {
            const recordIndex = data.findIndex((item) => item.id === record.id);
            data[recordIndex] = record;
        } else {
            record = {id: uuidv4(), ...record};
            data.push(record);
        }

        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));  // Beautified JSON
        return record;
    }

    public delete(id: string): boolean {
        const data = this.readAll();
        const recordIndex = data.findIndex((record) => record.id === id);
        if (recordIndex === -1) {
            return false;
        }
        data.splice(recordIndex, 1);
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        return true;
    }

    public readAll(): Model[] {
        const rawData = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(rawData);
    }
}
