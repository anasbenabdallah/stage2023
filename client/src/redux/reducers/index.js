import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AdminReducer from "./AdminReducer";

import CompanyProfileReducer from "./companyProfileReducer";

export const RootReducer = combineReducers({
  Auth: AuthReducer,
  Admin: AdminReducer,
 

  CompanyProfile: CompanyProfileReducer,
});
