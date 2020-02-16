import { combineReducers } from'redux';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import inBuildDataReducer from './data/inBuildDataReducer';

const persistConfig={
	key:'root',
	storage:storage,
	whitelist:['inBuildData']
}

const RootReducer = combineReducers({
	inBuildData: inBuildDataReducer
});

export default persistReducer(persistConfig, RootReducer);
