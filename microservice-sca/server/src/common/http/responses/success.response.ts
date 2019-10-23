/**
 * @import Libraries
 */
import { ApiModelProperty } from "@nestjs/swagger";

type TSuccessData = {
    [propertyName: string] : any
}

export class SuccessResponse
{
    @ApiModelProperty({
        required: true,
        description: "The http status code",
        example: 200
    })
    statusCode: number;

    @ApiModelProperty({
        required: false,
        description: "Data returned by the server after success",
        example: {
            propertyName : "Property Value",
        }
    })
    data: TSuccessData

    constructor(data: TSuccessData)
    {
        this.statusCode = 200;
        this.data = data;
    }

}