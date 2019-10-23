import { Test, TestingModule } from '@nestjs/testing';

/**
 * @import Modules
 */
import { HttpModule } from '@nestjs/common';

/**
 * @import Controllers
 */
import { UserController } from './user.controller';

/**
 * @import Services
 */
import { UserService } from '../services/user.service';

/**
 * @import Types
 */
import {
	SubscribeUserDto
} from '../dtos/index';
import {
	SuccessResponse
} from '../../../common/http/responses/index';


describe('User Controller', () => {
	let userController: UserController;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports : [HttpModule],
			controllers: [UserController],
			providers: [UserService]
		}).compile();

		userController = module.get<UserController>(UserController);
		userService = module.get<UserService>(UserService);
	});

	describe('init', () => {
		it('should be defined', () => {
			expect(userController).toBeDefined();
		});
	});

	describe('subscribe', () => {
		it ("Should create a new user and return the first and last name", async () => {
			const userData: SubscribeUserDto = {
				firstName: "Jane",
				lastName: "Doe",
				email: "jane.doe@email.com",
				mobilePhone: "0212345678"
			}

			jest.spyOn(userService, 'subscribe').mockImplementation(async (subscribeUserDto: SubscribeUserDto) => { return true })
			
			const result = await userController.subscribe(userData);
			
			expect(result).toBeInstanceOf(SuccessResponse)
			expect(result).toHaveProperty('statusCode');
			expect(result).toHaveProperty('data');
			expect(result).toMatchObject({
				statusCode : 200,
				data : {
					firstName : userData.firstName,
					lastName : userData.lastName
				}
			})
		});
	});
});
