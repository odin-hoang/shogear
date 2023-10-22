// rootReducer.ts (or wherever you combine your reducers)
import { combineReducers } from 'redux';
import priceReducer from '../pricetotal/pricetotal';
import cartReducer from '../cart/cart'
// Import other reducers if you have them

const rootReducer = combineReducers({
   pricetotal: priceReducer,
   cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
