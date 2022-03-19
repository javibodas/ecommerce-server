import Container from '../../../src/Container'

export default class TestContainer extends Container {
	protected getConfigFile(): string
	{
		return 'test/config/config.yml'
	}
}
