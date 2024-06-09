import { createSlice } from '@reduxjs/toolkit'
import { useEffect } from 'react';


//creating the initial state of the app 
const initialState = {
    adminUser: [],
    checked : []
}

//creating slice to perform different action as per the requirement 
export const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        //function to store the data received from the api in the store as a state od the app
        setAdminUser : (state , action )=>{
           state.adminUser = action.payload;
        },

        //function to edit the name of the user
        editUser : ( state , action ) =>{
                console.log('action', action.payload);
                let obj = action.payload;
                let { id , item } = obj;
                 
                 //finding the id of the user whose data needs to be edited
                 const userIndex = state.adminUser.findIndex(user=>user.id === id);


                 //if id of user is found we will update the name of the user
                 if (userIndex !== -1) {
                    state.adminUser[userIndex] = {
                        ...state.adminUser[userIndex],
                        ...item
                    };
                }
            },

            //function to delete the user with the user id 
        deleteUser : ( state , action ) =>{
            console.log('action', action.payload)
            state.adminUser = state.adminUser.filter(user => user.id !== action.payload);
            console.log('after', state.adminUser)
        },
        selectedCheckBox :(state , action)=>{
              console.log('action', action.payload);
        },
        deleteAllChecked :(state ,action)=>{
            console.log('actionpalo', action.payload)
            // state.adminUser = state.adminUser.filter((user)=>{
                
            //     return state.checked.
               
            // })
        }
    }
})


export const { setAdminUser , editUser , deleteUser ,selectedCheckBox , deleteAllChecked } = adminSlice.actions;

export default adminSlice.reducer;