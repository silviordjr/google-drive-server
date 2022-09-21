
import DriveController from './controller/DriveController';
import app from './app';

const driveController = new DriveController();

app.get('/', driveController.get)