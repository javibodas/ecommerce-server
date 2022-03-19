import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection"
import path from "path"

export default class Container {

    container: ContainerBuilder
    loader: YamlFileLoader

    constructor()
    {
        this.container = new ContainerBuilder(true, this.getDir())
        this.loader = new YamlFileLoader(this.container)
        this.initializeServicesByFile(this.getConfigFile())
        this.container.compile()
    }

    private initializeServicesByFile(file: string): void
    {
        this.loader.load(file)
    }

    public getService(serviceName: string)
    {
        return this.container.get(serviceName)
    }

    public findServicesByTag(tag: string): Map<string, any>
    {
        return this.container.findTaggedServiceIds(tag)
    }

	protected getDir(): string
	{
		return path.join(__dirname)
	}

	protected getConfigFile(): string
	{
		return 'config/config.yml'
	}
}
