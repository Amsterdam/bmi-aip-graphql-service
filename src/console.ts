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
		// console.log(e);

		await app.init();
		await bootstrap.boot();
		//process.exit(0);
	} catch (e) {
		console.log(e);
		//process.exit(1);
	}
});
