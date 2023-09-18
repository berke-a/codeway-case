import db from '../db';
import { Configuration } from '../models/configuration.model';
import { camelToSnake, snakeToCamel, toHumanReadableFormat } from '../utils';

export async function getConfigurations() {
    const configurationArray: Configuration[] = [];
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
    parameterKey = snakeToCamel(parameterKey);
    await db.collection('Configurations').doc(parameterKey).delete();
    return;
}
