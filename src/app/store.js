import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "../features/email/emailSlice";
import emailBodyReducer from "../features/email/emailBodySlice";
import filterSliceReducer from "../features/filterSlice";

export default configureStore({
    reducer: {
        email: emailReducer,
        emailBody: emailBodyReducer,
        filter: filterSliceReducer
    }
});