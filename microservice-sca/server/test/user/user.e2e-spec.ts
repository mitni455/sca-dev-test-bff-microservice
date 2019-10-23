import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../../src/components/user/user.module';
import { UserService } from '../../src/components/user/services/user.service';
import { INestApplication } from '@nestjs/common';

/**
 * @import Types
 */
import {
    SubscribeUserDto
} from '../../src/components/user/dtos/index';

describe('User', () => {
    let app: INestApplication;
    let userService = { subscribe: () => { return true; } }

    beforeAll(async() => {
        
        const module = await Test.createTestingModule({
                imports: [UserModule],
            })
            .overrideProvider(UserService)
            .useValue(userService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });

    describe('/user', () => {
        describe('POST', () => {
            it ("Should subscribe a new user", (done) => {

                const userData: SubscribeUserDto = {
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jane.doe@email.com",
                    mobilePhone: "0212345678"
                }
    
                return request(app.getHttpServer())
                    .post('/user')
                    .send(userData)
                    .expect(200, {
                        statusCode: 200,
                        data: {
                            firstName: userData.firstName,
                            lastName : userData.lastName
                        }
                    }, done);

            });
        });

        it ("Should succeed if mobile phone is not provided", (done) => {
            const userData: SubscribeUserDto = {
                firstName: "Jane",
                lastName: "Doe",
                email: "jane.doe@email.com"
            }

            return request(app.getHttpServer())
                .post('/user')
                .send(userData)
                .expect(200, {
                    statusCode: 200,
                    data: {
                        firstName: userData.firstName,
                        lastName : userData.lastName
                    }
                }, done);
        });

        it ("Should fail when the first name is not provided", (done) => {
			const userData: any = {
				lastName: "Doe",
				email: "jane.doe@email.com",
				mobilePhone: "0212345678"
            }
            
            return request(app.getHttpServer())
                    .post('/user')
                    .send(userData)
                    .expect(400, {
                        statusCode: 400,
                        error: "Validation Exception",
                        message: "Failed to validate the data",
                        data: [
                            {
                                property: "firstName",
                                constraints: {
                                    length: "firstName must be longer than or equal to 1 characters",
                                    isString: "firstName must be a string"
                                }
                            }
                        ]
                    }, done);
        });
        
        it ("Should fail when the first name is not long enough", (done) => {
			const userData: any = {
                firstName: "",
				lastName: "Doe",
				email: "jane.doe@email.com",
				mobilePhone: "0212345678"
            }
            
            return request(app.getHttpServer())
                    .post('/user')
                    .send(userData)
                    .expect(400, {
                        statusCode: 400,
                        error: "Validation Exception",
                        message: "Failed to validate the data",
                        data: [
                            {
                                property: "firstName",
                                constraints: {
                                    length: "firstName must be longer than or equal to 1 characters"
                                }
                            }
                        ]
                    }, done);
        });
        
        it ("Should fail when the last name is not provided", (done) => {
			const userData: any = {
				firstName: "Jane",
				email: "jane.doe@email.com",
				mobilePhone: "0212345678"
            }
            
            return request(app.getHttpServer())
                    .post('/user')
                    .send(userData)
                    .expect(400, {
                        statusCode: 400,
                        error: "Validation Exception",
                        message: "Failed to validate the data",
                        data: [
                            {
                                property: "lastName",
                                constraints: {
                                    length: "lastName must be longer than or equal to 1 characters",
                                    isString: "lastName must be a string"
                                }
                            }
                        ]
                    }, done);
        });
        
        it ("Should fail when the last name is not long enough", (done) => {
			const userData: any = {
                firstName: "Jane",
                lastName: "",
				email: "jane.doe@email.com",
				mobilePhone: "0212345678"
            }
            
            return request(app.getHttpServer())
                    .post('/user')
                    .send(userData)
                    .expect(400, {
                        statusCode: 400,
                        error: "Validation Exception",
                        message: "Failed to validate the data",
                        data: [
                            {
                                property: "lastName",
                                constraints: {
                                    length: "lastName must be longer than or equal to 1 characters"
                                }
                            }
                        ]
                    }, done);
        });
        
        it ("Should fail when the email is not provided", (done) => {
            const userData: any = {
                firstName: "Jane",
                lastName: "Doe",
                mobilePhone: "0212345678"
            }
    
            return request(app.getHttpServer())
                .post('/user')
                .send(userData)
                .expect(400, {
                    statusCode: 400,
                    error: "Validation Exception",
                    message: "Failed to validate the data",
                    data: [
                        {
                            property: "email",
                            constraints: {
                                isEmail: "email must be an email"
                            }
                        }
                    ]
                }, done);
        });
    
        it ("Should fail when the email is invalid", (done) => {
            const userData: any = {
                firstName: "Jane",
                lastName: "Doe",
                email: "jane.doe.email",
                mobilePhone: "0212345678"
            }

            return request(app.getHttpServer())
                .post('/user')
                .send(userData)
                .expect(400, {
                    statusCode: 400,
                    error: "Validation Exception",
                    message: "Failed to validate the data",
                    data: [
                        {
                            property: "email",
                            constraints: {
                                isEmail: "email must be an email"
                            }
                        }
                    ]
                }, done);
        })

       
    })
})
