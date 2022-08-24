import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { Public } from 'nest-keycloak-connect';

@Controller('health')
export class HealthController {
	public constructor(private health: HealthCheckService) {}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	@Get()
	@HealthCheck()
	@Public()
	public check() {
		return this.health.check([]);
	}
}
