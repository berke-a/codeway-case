export class Configuration {
    parameterKey: string;
    value: string;
    type: string;
    description: string;
    createDate: string;

    constructor(parameterKey: string, value: string, type: string, description: string, createDate: string) {
        this.parameterKey = parameterKey;
        this.value = value;
        this.type = type;
        this.description = description;
        this.createDate = createDate;
    }
}