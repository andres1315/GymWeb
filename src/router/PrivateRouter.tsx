import { Navigate, Route } from "react-router";
import { RoutesNotFound } from "./RoutesNotFound";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/page-loader";


const Membership = lazy(() => import("@/features/private/membership"));
const PrivateLayout = lazy(() => import("@/features/private/layout/PrivateLayout"));
const Dashboard = lazy(() => import("@/features/private/dashboard"));
const Setting = lazy(() => import("@/features/private/settings"));
const Client = lazy(() => import("@/features/private/clients"));


const PrivateRouter = () => {
  return (
    <RoutesNotFound>
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoader loading={true} />}>
            <PrivateLayout />
          </Suspense>
        }
      >
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route 
          path="/membership" 
          element={
            <Suspense fallback={<PageLoader loading={true} />}>
              <Membership />
            </Suspense>
          } 
        />
        <Route 
          path="/clients" 
          element={
            <Suspense fallback={<PageLoader loading={true} />}>
              <Client />
            </Suspense>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <Suspense fallback={<PageLoader loading={true} />}>
              <Setting />
            </Suspense>
          } 
        />
     
      </Route>
    </RoutesNotFound>
  );
};

export default PrivateRouter;
