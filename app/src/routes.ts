
import { Router } from 'express';
import { Configuration } from './models/configuration.model';
import { toHumanReadableFormat, camelToSnake } from './utils';
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

export default router;
