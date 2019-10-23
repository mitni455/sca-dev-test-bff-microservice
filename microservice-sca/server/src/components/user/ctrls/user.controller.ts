import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    UsePipes, 
    Header, 
    HttpCode,
    InternalServerErrorException
} from '@nestjs/common';

/**
 * @import Libraries
 */
import { 
    ApiOperation, 
    ApiImplicitBody, 
    ApiOkResponse, 
    ApiBadRequestResponse, 
    ApiInternalServerErrorResponse} from '@nestjs/swagger';

/**
 * @import Pipes
 */
import { ValidationPipe } from '../../../common/pipes/ValidationPipe';

/**
 * @import Services
 */
import { UserService } from '../services/user.service';

/**
 * @import Dtos
 */
import { SubscribeUserDto } from '../dtos/index';

/**
 * @import Responses & Exceptions
 */
import {
    SuccessResponse
} from '../../../common/http/responses/index';
import {  
    ValidationException
} from '../../../common/http/exceptions/index';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    @Header("Content-Type", "application/json")
    @ApiOperation({
        title: "subscribe",
        description: "Subscribes a new user to sca"
    })
    @ApiOkResponse({
        description: "The success code and message",
        type : SuccessResponse
    })
    @ApiBadRequestResponse({
        description: "Returned when the requested data is malformed",
        type : ValidationException
    })
    @ApiInternalServerErrorResponse({
        description: "Server has had a problem",
        type: InternalServerErrorException
    })
    async subscribe(@Body() subscribeUserDto: SubscribeUserDto) {
        
        try 
        {
            let result = await this.userService.subscribe(subscribeUserDto)
            return new SuccessResponse({
                firstName: subscribeUserDto.firstName,
                lastName: subscribeUserDto.lastName
            });
        } 
        catch (error) 
        {
            throw new InternalServerErrorException();
        }
    }
    
}
