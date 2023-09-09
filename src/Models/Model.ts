export class Model {

    id?: string | null;
    fxFileId?: string | null;
    [key: string]: any;

    constructor(initialValues: Partial<Model> = {}) {
        Object.assign(this, initialValues);
    }
}
