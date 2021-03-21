import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// HOC takes another compponent as arg
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
           <SpinnerOverlay>
               <SpinnerContainer />
           </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
    return Spinner;
};


export default WithSpinner;


// This could be written more verbosely like that:



// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//         <SpinnerOverlay>
//             <SpinnerContainer />
//         </SpinnerOverlay>
//     ) : (
//         <WrappedComponent {...otherProps} />
//     )
// }