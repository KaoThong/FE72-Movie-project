import PageNotFound from "common/components/404";
import Header from "common/components/Header";
import { fetchProfileAction } from "features/authentication/action";
// import Signin from "features/authentication/page/Signin";
// import Signup from "features/authentication/page/Signup";
// import Booking from "features/booking/pages/Booking";
// import Detail from "features/booking/pages/Detail";
// import Home from "features/booking/pages/Home";
// import Payment from "features/booking/pages/Payment";
// import MovieManagerment from "features/movies/pages/MovieManagerment";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";

const Home = lazy(() => import("features/booking/pages/Home"));
const Detail = lazy(() => import("features/booking/pages/Detail"));
const Payment = lazy(() => import("features/booking/pages/Payment"));
const MovieManagerment = lazy(() => import("features/booking/pages/Home"));
const Booking = lazy(() => import("features/booking/pages/Booking"));
const Signin = lazy(() => import("features/authentication/page/Signin"));
const Signup = lazy(() => import("features/authentication/page/Signup"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  });

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>...</div>}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/booking" component={Booking} />
          <Route path="/detail/:id" component={Detail} />
          <AuthRoute path="/signin" component={Signin} redirectPath="/" />
          <AuthRoute path="/signup" component={Signup} redirectPath="/home" />
          <Route path="/payment" component={Payment} />
          <PrivateRoute path="/movies" component={MovieManagerment} />
          <Route path="*" component={PageNotFound} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// optimize performance:
// + image, vitualize data (pagination, long list), lazy loading,
// + kiểm soát component render (shouldComponentUpdate)
// + production build

// redux toolkit + type script
