import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers['role']; // Simulate role via headers
    return userRole === 'admin'; // Allow only admin users
  }
}
