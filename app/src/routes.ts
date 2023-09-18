
import { Router } from 'express';
import { getConfigurations, updateConfiguration } from './controllers/configuration.controller';

const router = Router();

const configurationTableHeaders = [
    'Parameter Key',
    'Value',
    'Type',
    'Description',
    'Create Date',
];

router.get('/', async (req: any, res: any) => {
    try {
        const configurations = await getConfigurations();
        res.send({
            'status': 'success',
            'headers': configurationTableHeaders,
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

router.put('/:parameterKey', async (req: any, res: any) => {
    try {
        const { parameterKey } = req.params;
        const updatedConfig  = req.body;
        const configuration = await updateConfiguration(parameterKey, updatedConfig);
        res.send({
            'status': 'success',
            'data': configuration,
        });
    }catch (error) {
        console.log(error);
        res.status(500).send({
            'status': 'error',
            'message': 'Error while updating configuration'
        });
    }
});

export default router;
