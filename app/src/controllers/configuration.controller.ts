import db from '../db';
import { Configuration } from '../models/configuration.model';
import { camelToSnake, toHumanReadableFormat } from '../utils';

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
