import { HttpException } from "@nestjs/common";

/**
 * @import Libraries
 */
import { ApiModelProperty } from "@nestjs/swagger";
import { ValidationError as ClassValidatorValidationError } from 'class-validator';


/**
 * @import Types
 */
type TValidationErrorData = {
    property : string,
    constraints : {
        [constraintName: string] : string
    }
}

export class ValidationException extends HttpException {

    @ApiModelProperty({
        required: true,
        description: "The http status code",
        example: 400
    })
    statusCode: number;
    
    @ApiModelProperty({
        required: true,
        description: "The error name",
        example: "Validation Exception"
    })
    error: string;

    @ApiModelProperty({
        required: true,
        description: "Describing the error type",
        example: "Failed to validate the data"
    })
    message: string;

    @ApiModelProperty({
        required: true,
        description: "An array of validation issues with propery and constraints",
        example : [{
            property : "lastName",
            constraints : {
                isString: "lastName must be a string"
            }
        }]
    })
    data: TValidationErrorData[];


    constructor(errorArray: ClassValidatorValidationError[])
    {
        var propertyErrors = errorArray.map((error: ClassValidatorValidationError) => {
            return {
                property : error.property,
                constraints : error.constraints
            }
        });

        var errorData = {
            "statusCode": 400,
            "error": "Validation Exception",
            "message": "Failed to validate the data",
            "data" : propertyErrors
        }
        super(errorData, 400);
    }

}