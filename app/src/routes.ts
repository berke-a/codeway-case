
import { Router } from 'express';
import { Configuration } from './models/configuration.model';
import db from './db'; 

const router = Router();

router.get('/', async (req: any, res: any) => {
    try {
        const configurations = await getConfigurations();
        res.send({
            'status': 'success',
            'data': configurations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'status': 'error',
            'message': 'Error while fetching configurations'
        });
    }
});

async function getConfigurations() {
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

function camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, (c: string) => '_' + c.toLowerCase());
}

function toHumanReadableFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default router;
