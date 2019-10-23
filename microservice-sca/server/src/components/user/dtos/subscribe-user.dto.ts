import { ApiModelProperty } from '@nestjs/swagger';

/**
 * @import Libraries
 */
import { IsEmail, Length, IsNumberString, IsString, IsOptional } from 'class-validator'

export class SubscribeUserDto {

    @ApiModelProperty({
        required: true,
        description: "The first name of the user",
        example : "John"
    })
    @IsString()
    @Length(1)
    firstName: string;

    @ApiModelProperty({
        required: true,
        description: "The last name of the user",
        example : "Doe"
    })
    @IsString()
    @Length(1)
    lastName: string;

    @ApiModelProperty({
        required: true,
        description: "The email address of the user",
        example : "john.doe@email.com"
    })
    @IsEmail()
    email: string;

    @ApiModelProperty({
        required: false,
        description: "The mobile phone number of the user",
        example : "0211234567"
    })
    @IsNumberString()
    @IsOptional()
    mobilePhone?: string;
}