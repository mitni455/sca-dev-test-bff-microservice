const yarn = require('package.json');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * @import Modules
 */


export class SwaggerUtil{

	static buildSwagger(app){

		const options = new DocumentBuilder()
			.setTitle('Microservice BFF for SCA React App')
			.setDescription('This is the BFF microservice for SCA Developer Test and its amazeballs')
			.setVersion('2.0')
			.setVersion(yarn.version)
			.setBasePath('/')
			.setSchemes('http', 'https')
			// .addBearerAuth()
			.build();

		const swaggerDoc = SwaggerModule.createDocument(
			app, 
			options, 
			SwaggerUtil.includeModules()
		);
		SwaggerModule.setup('/', app, swaggerDoc);

	}

	static includeModules(){
		return { 
	    	include: [
                
	    	] 
	    }
	}

}