// import { configureStore } from '@reduxjs/toolkit';
// import { authApi } from '../services/authApi';
// import { hotelApi } from '../services/hotelAPI';

// import { 
//     themeModeReducer,
//     themeReducer,
//     strokeReducer,
//     boxLayoutReducer,
//     monochromeReducer,
//     borderRadiusReducer,
//     iconColorReducer,
//     bodyGradientReducer 
// } from './reducers/settingsReducers';
// import authReducer from './reducers/authReducer';
// import hotelReducer from './reducers/hotelReducer';
// import { amenitiesApi } from '../services/amenitiesAPI';

// // Combine API middleware
// const apiMiddleware = [authApi.middleware, hotelApi.middleware, amenitiesApi.middleware];

// const store = configureStore({
//     reducer: {
//         // Theme related reducers
//         themeMode: themeModeReducer,
//         theme: themeReducer,
//         stroke: strokeReducer,
//         boxLayout: boxLayoutReducer,
//         monochrome: monochromeReducer,
//         borderRadius: borderRadiusReducer,
//         iconColor: iconColorReducer,
//         gradientColor: bodyGradientReducer,
        
//         // Feature reducers
//         auth: authReducer,
//         hotels: hotelReducer,
        
//         // RTK Query API reducers
//         [authApi.reducerPath]: authApi.reducer,
//         [hotelApi.reducerPath]: hotelApi.reducer,
//         [amenitiesApi.reducerPath]: amenitiesApi.reducer
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//             immutableCheck: false,
//         }).concat(...apiMiddleware),
//     devTools: process.env.NODE_ENV !== 'production'
// });

// // Enable hot reloading if in development
// if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => {
//         const nextRootReducer = require('./reducers').default;
//         store.replaceReducer(nextRootReducer);
//     });
// }

// export default store;



// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { hotelApi } from '../services/hotelAPI';
import { roomApi } from '../services/roomAPI';
import { promocodeApi } from '../services/promocodeAPI';
import { amenitiesApi } from '../services/amenitiesAPI';
import { blogApi } from '../services/blogAPI';

import {
    themeModeReducer,
    themeReducer,
    strokeReducer,
    boxLayoutReducer,
    monochromeReducer,
    borderRadiusReducer,
    iconColorReducer,
    bodyGradientReducer
} from './reducers/settingsReducers';
import authReducer from './reducers/authReducer';
import hotelReducer from './reducers/hotelReducer';
import roomReducer from './reducers/roomReducer';
import dashboardReducer from './reducers/dashboardReducer';
import { dashboardApi } from '../services/dashboardAPI';
import { eventApi } from '../services/eventAPI';
import { featuredHotelApi } from '../services/featuredHotelAPI';


// Combine API middleware
const apiMiddleware = [
    authApi.middleware,
    hotelApi.middleware,
    roomApi.middleware,
    amenitiesApi.middleware,
    blogApi.middleware,
    promocodeApi.middleware,
    dashboardApi.middleware,
    eventApi.middleware,
    featuredHotelApi.middleware
];

const store = configureStore({
    reducer: {
        // Theme related reducers
        themeMode: themeModeReducer,
        theme: themeReducer,
        stroke: strokeReducer,
        boxLayout: boxLayoutReducer,
        monochrome: monochromeReducer,
        borderRadius: borderRadiusReducer,
        iconColor: iconColorReducer,
        gradientColor: bodyGradientReducer,
        
        // Feature reducers
        auth: authReducer,
        hotels: hotelReducer,
        rooms: roomReducer,
        dashboard: dashboardReducer,
        
        // RTK Query API reducers
        [authApi.reducerPath]: authApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [amenitiesApi.reducerPath]: amenitiesApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [promocodeApi.reducerPath]: promocodeApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer,
        [featuredHotelApi.reducerPath]: featuredHotelApi.reducer



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).concat(...apiMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;