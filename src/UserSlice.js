import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
const user=createSlice(
    {name:"user",initialState:{token:null,userid:null,username:null,role:null},
    reducers:{
        login(state,action){
            const {token,userid,username,role}=action.payload
            state.token=token
            state.userid=userid
            state.username=username
            state.role=role
            notification.success({
                message: 'Login Successful',
                description: `Welcome, ${role}`,
                placement: 'top',
                duration:3.0 ,
              });
        },
        logout(state){
            state.token=null
            state.userid=null
            state.username=null
            state.role=null
            notification.success({
                message: 'Logout Successful',
                description: `Thank You for using AmazeCare`,
                placement: 'top',
                duration:3.0 ,
              });
        }
    }
})
export default user.reducer
export const {login,logout}=user.actions