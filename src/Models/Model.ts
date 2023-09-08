export class Model {

    id?: string | null;

    [key: string]: any;

    constructor(initialValues: Partial<Model> = {}) {
        Object.assign(this, initialValues);
    }
}
