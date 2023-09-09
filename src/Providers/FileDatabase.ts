import {v4 as uuidv4} from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {Model} from '../Models/Model';
import {IDatabase} from './IDatabase';
import {LegalCase} from "../Models/LegalCase";

const util = require('util');


export class FileDatabase implements IDatabase {

    private filePath: string;

    constructor(tableName: string) {
        this.filePath = path.join(__dirname, `../../data/${tableName}/`);
        this.init();
    }

    private init(): void {

        const dir = path.dirname(this.filePath + '/example.txt');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }


    private getFileId(record: LegalCase) {
        if (record.fxFileId) {
            return record.fxFileId;
        }
        return [
            record.customerName.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('_'),
            record.startDate.getFullYear().toString().substr(-2),
            Math.random().toString(36).slice(-4)
        ].join('-');
    }

    public create(record: Model): Model {
        return this.write(record);
    }

    public find(id: string): Model | null {
        const rawData = fs.readFileSync(this.filePath + `/${id}.txt`, 'utf-8');
        let resultObject = {};
        rawData.split('\n').forEach(line => {
            const [key, value] = line.split(': ');
            if (value === 'true') {
                resultObject[key] = true;
            } else if (value === 'false') {
                resultObject[key] = false;
            } else if (!isNaN(Date.parse(value))) {
                resultObject[key] = new Date(value);
            } else {
                resultObject[key] = value;
            }
        });
        return resultObject;
    }

    public update(id: string, updatedFields: Partial<Model>): Model | null {
        const record = this.find(id);
        console.log(record);
        return this.write({...record, ...updatedFields});
    }

    private write(record: Model) {
        record = {fxFileId: this.getFileId(record as LegalCase), ...record};
        fs.writeFileSync(
            this.filePath + `/${record.fxFileId}.txt`,
            Object.entries(record).map(([key, value]) => `${key}: ${value}`).join('\n')
        );
        return record;
    }

    public delete(id: string): boolean {
        fs.unlink(this.filePath + `/${id}.txt`, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${err}`);
                return;
            }
            console.log(`Successfully deleted ${id}`);
        });
        return true;
    }

    public readAll(): Model[] {
        return [];
    }
}
