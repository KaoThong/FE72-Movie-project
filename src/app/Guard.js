import { Redirect, Route } from "react-router-dom";

const createRoute = (condition) => {
    // component guard
    return (props) => {
        const {path, component, redirectPath} = props;
        if(condition) {
            return <Route path={path} component={component}/>;
        }
        return <Redirect to = {redirectPath}/> ;
    }
}

const checkAuth = () => {
  if(!localStorage.getItem("token")) {
    return true;
  } 
  return false;
  //hceck nếu localstorage chưa có token => chưa login => vào 
  // locastorage có token => login => đẩy đi tới home
};

export const AuthRoute = createRoute(checkAuth);


const checkLogin = () => {
    if(localStorage.getItem("token")) {
      return true;
    } 
    return false;
    //hceck nếu localstorage chưa có token => chưa login => vào 
    // locastorage có token => login => đẩy đi tới home
  };

export const PrivateRoute = createRoute(checkLogin);
// export const AdminRoute = createRoute(checkAdmin);




