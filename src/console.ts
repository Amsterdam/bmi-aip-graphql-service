import { BootstrapConsole } from 'nestjs-console';

import { AppModule } from './app.module';

const bootstrap = new BootstrapConsole({
	module: AppModule,
	useDecorators: true,
	contextOptions: {
		logger: ['debug', 'error', 'verbose', 'warn'],
	},
});

bootstrap.init().then(async (app) => {
	try {
		await app.init();
		await bootstrap.boot();
	} catch (e) {
		console.error(e);
	}
});
