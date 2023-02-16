import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import helmet from 'helmet';
import { AppConfigs } from './app.config';
import { AppModule } from './app.module';
import { ResponseTransformerInterceptor } from './shared/interceptors/response-transformer.interceptor';
import { TimeoutInterceptor } from './shared/interceptors/timeout-interceptor.service';
import { EcommerceLoggerService } from './shared/logger';
import { AllExceptionsFilter } from './shared/middlewares/all-exception.filter';
import { HttpExceptionFilter } from './shared/middlewares/http-exception.filter';

async function swaggerBuilder(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(AppConfigs.title)
    .setDescription(`Swagger document for ${AppConfigs.title} APIs`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  return swaggerDocument;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EcommerceLoggerService(),
    cors: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app
    .setGlobalPrefix('/api')
    .enableVersioning({ type: VersioningType.URI })

    // protection middlewares
    .use(helmet({}))

    // filters
    .useGlobalFilters(new AllExceptionsFilter(httpAdapter))
    .useGlobalFilters(new HttpExceptionFilter())

    // interceptors
    .useGlobalInterceptors(new ResponseTransformerInterceptor())
    .useGlobalInterceptors(new TimeoutInterceptor())

    .enableShutdownHooks()

    .useGlobalPipes(new ValidationPipe());

  // swagger
  const swaggerDocument = await swaggerBuilder(app);

  await app.startAllMicroservices();
  await app.listen(AppConfigs.port);

  // swaggerDocument.servers.push({
  //   url: `https://a4db52c2746af4db49ecbcde3ecc7fe8-ef18d9f10302609e.elb.ap-southeast-1.amazonaws.com`,
  // });
  swaggerDocument.servers.push({
    url: await app.getUrl(),
  });

  fs.writeFileSync('./swagger-doc.json', JSON.stringify(swaggerDocument));

  return app;
}

bootstrap().then(async (app) => {
  console.log(`Application start on port ${await app.getUrl()}`);
});
