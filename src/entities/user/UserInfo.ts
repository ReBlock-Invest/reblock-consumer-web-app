import UserInvestStateEnum from "./UserInvestStateEnum"
import UserTypeIDEnum from "./UserTypeIDEnum"

type UserInfo = {
  invest_state: UserInvestStateEnum
  user_type: UserTypeIDEnum | ""
  address: string
}

export default UserInfo