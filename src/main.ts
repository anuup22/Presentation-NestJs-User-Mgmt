import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform/transform.interceptor';
import { CustomExceptionFilter } from './custom-exception/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
