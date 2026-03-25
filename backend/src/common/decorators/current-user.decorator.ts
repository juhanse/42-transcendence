import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/strategies/jwt.strategy';

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): JwtPayload => {
		const req = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
		return req.user;
	},
);
