// userSlice.ts
import { RootState } from '@/app/redux';
import { User_Data } from '@/types/auth_type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: User_Data | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: User_Data; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); // Optionally remove token from storage
        },
    },
});
export const selectUser = (state: RootState) => state.user.user;
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
