
import { Router } from 'express';
import { getConfigurations, updateConfiguration, deleteConfiguration } from '../controllers/configuration.controller';

const configurationRouter = Router();

const configurationTableHeaders = [
    'Parameter Key',
    'Value',
    'Type',
    'Description',
    'Create Date',
];

configurationRouter.get('/', async (req: any, res: any) => {
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

configurationRouter.put('/:parameterKey', async (req: any, res: any) => {
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

configurationRouter.delete('/:parameterKey', async (req: any, res: any) => {
    try {
        const { parameterKey } = req.params;
        await deleteConfiguration(parameterKey);
        res.send({
            'status': 'success',
            'message': 'Configuration deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'status': 'error',
            'message': 'Error while deleting configuration'
        });
    }
});

export default configurationRouter;
