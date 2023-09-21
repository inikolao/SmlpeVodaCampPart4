import {configureStore} from '@reduxjs/toolkit';
import eventsreducer from './reduxLib/eventsLib';
import userreducer from './reduxLib/userLib';

export default configureStore({
    reducer:{
        eventsreducer,
        userreducer,
    }
});