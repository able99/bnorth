let PathName = {};

PathName.Home = {
  multiPage: false, 
  path: "/home",
};

PathName.Login = {
  multiPage: false, 
  path: "/login",
};

PathName.Logout = {
  multiPage: false, 
  path: "/logout",
};

import { ExtendPathname } from '../../extend/extend';
export default Object.assign(PathName, ExtendPathname||{});
