import React, {Fragment,Suspense,lazy} from 'react';
// Suspense and lazy is used for lazy loading
// We will wrap then main component in Suspense
// and in fallback we will pass custom LazyLoader component
// and import component in lazy function

import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const Dashboard =lazy(() => import('../../components/Dashboard/Dashboard'));
const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;