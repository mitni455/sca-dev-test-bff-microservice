import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/common';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [HttpModule],
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
