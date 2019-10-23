import { 
    Injectable,
    HttpService
} from '@nestjs/common';

/**
 * @import Types
 */
import { 
    SubscribeUserDto
} from '../dtos/index';

/**
 * User service to handle requests by the UserController
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService) {}

    /**
     * Constructs a packet to be persisted to an external server via fetch
     * @param subscribeUserDto 
     */
    async subscribe(subscribeUserDto: SubscribeUserDto): Promise<boolean>
    {
        const userData = {
            data : {
                firstName : subscribeUserDto.firstName,
                lastName : subscribeUserDto.lastName,
                email : subscribeUserDto.email,
                mobilePhone : subscribeUserDto.mobilePhone
            }
        }

        return this.httpService.post("https://ckzvgrbymezqegu.form.io/reacttestform/submission", userData, {
                headers : {
                    "x-auth" : "react-test",
                    "Content-Type" : "application/json"
                }
            })
            .toPromise()
            .then((response) => {
                return true;
            })
            .catch((err) => {
                throw err;
            })
        
    }

}