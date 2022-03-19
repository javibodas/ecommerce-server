import Application from "./Application";
import Container from "./Container";
 
const app = new Application(new Container(), (process.env.server_port ? parseInt(process.env.server_port) : 3001));
app.listen();