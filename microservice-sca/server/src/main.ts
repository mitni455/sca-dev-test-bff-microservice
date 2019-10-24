import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @import Recipes
 */
import { SwaggerUtil } from 'src/common/recipes/swagger/swagger.util';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // -- Cors
    app.enableCors();

    // -- Utils
    SwaggerUtil.buildSwagger(app);

    // -- Boot the app
    console.log(`🦄 Running on port: ${process.env.PORT ? process.env.PORT : 3000}`);
    await app.listen(process.env.PORT ? process.env.PORT : 3000)
}
bootstrap();
