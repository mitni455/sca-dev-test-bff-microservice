import { Module, HttpModule } from '@nestjs/common';

import { UserController } from './ctrls/user.controller';

import { UserService } from './services/user.service';

@Module({
    imports : [
        HttpModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ]
})
export class UserModule {}
