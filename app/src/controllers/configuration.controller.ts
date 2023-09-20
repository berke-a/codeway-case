import admin from '../firebaseConfig';
import { Configuration } from '../models/configuration.model';
import { camelToSnake, snakeToCamel, toHumanReadableFormat } from '../utils';

export async function getConfigurations() {
    const configurationArray: Configuration[] = [];
    const db = admin.firestore();
    const snapshot = await db.collection('Configurations').get();
    snapshot.forEach((doc: any) => {
        const configuration = new Configuration(
            camelToSnake(doc.id),
            doc.data().value,
            doc.data().type,
            doc.data().description,
            toHumanReadableFormat(doc.data().createDate.toDate())
        );
        configurationArray.push(configuration);
    });
    return configurationArray;
}

export async function updateConfiguration(parameterKey: string, updatedConfig: any) {
    const db = admin.firestore();
    parameterKey = snakeToCamel(parameterKey);
    const configuration = await db.collection('Configurations').doc(parameterKey).get();
    if (!configuration.exists) {
        throw new Error('Configuration does not exist');
    }

    delete updatedConfig.parameterKey;
    updatedConfig.createDate = configuration.data().createDate;
    await db.collection('Configurations').doc(parameterKey).update(updatedConfig);
    return updatedConfig;
}

export async function deleteConfiguration(parameterKey: string) {
    const db = admin.firestore();
    parameterKey = snakeToCamel(parameterKey);
    await db.collection('Configurations').doc(parameterKey).delete();
    return;
}

export async function createJsonFormat() {
    const db = admin.firestore();
    const snapshot = await db.collection('Configurations').get();
    const configurations: any = {};
    snapshot.forEach((doc: any) => {
        const data = doc.data();

        switch (data.type) {
            case 'int':
                configurations[doc.id] = parseInt(data.value, 10);
                break;
            case 'float':
                configurations[doc.id] = parseFloat(data.value);
                break;
            case 'string':
                configurations[doc.id] = data.value;
                break;
            default:
                configurations[doc.id] = data.value;
        }
    });

    return configurations;
}
