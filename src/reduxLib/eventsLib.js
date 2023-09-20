import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
    eventList:[],
    status:"idle",
    error:''
}

export const fetchEvents = createAsyncThunk('fetch/Events',async()=>{
    let response = await fetch('http://localhost:3001/events')
    return response.json()

})

export const fetchEventsById = createAsyncThunk('fetch/Events',async(id)=>{
    let response = await fetch(`http://localhost:3001/events?id=${id}`)
    return response.json()

})

const eventslice = createSlice({
    name:"items",
    initialState,
    reducers:{
    },
    extraReducers(builder){
        builder.addCase(fetchEvents.pending, (state, action)=>{
            state.status='loading'
        })
        builder.addCase(fetchEvents.fulfilled, (state, action)=>{
            state.status = 'success';
            state.items = state.items.concat(action.payload)
        })
        builder.addCase(fetchEvents.rejected, (state, action)=>{
            state.status='error'
        })
    }
})
//console.log(eventslice.reducer)
export let {state.status} = state => state.userreducer.isLoggedIn
export default eventslice.reducer;