import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
    eventsList: [],
    selectedEvent: null,
    status:"idle",
    error:''
}

export const fetchEvents = createAsyncThunk('fetch/events',async()=>{
    let response = await fetch('http://localhost:3001/events')
    return response.json()

})

export const fetchEventsById = createAsyncThunk('fetch/eventsbyID',async(id)=>{
    const response = await fetch(`http://localhost:3001/events/${id}`)
    return response.json()

})

export const fetchEventsByPublic = createAsyncThunk('fetchData',async(publicflag)=>{
    let response = await fetch(`http://localhost:3001/events?id=${publicflag}`)
    return response.json()

})
export const filterEventsByOwnerId = createAsyncThunk(
    'events/filterByOwnerId',
    async (ownerId) => {
        // Simulate an asynchronous operation, e.g., fetching data from an API.
        let response = await fetch('http://localhost:3001/events');
        const filteredEvents = response.json().filter((event) => event.ownerid === ownerId);

        return filteredEvents;
    }
);

export const addEvent =createAsyncThunk('update/events', async(eventdata)=>
{
    let response =await fetch(`http://localhost:3001/events`,{
        method:'POST',
        body: JSON.stringify(eventdata),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    let data =await  response.json();
    if(data !== null || data !== undefined)
        return Promise.resolve('success')
    return Promise.reject('failure')
})

export const deleteEvent =createAsyncThunk('events/delete', async(eventdata)=>
{
    let response =await fetch(`http://localhost:3001/events`,{
        method:'DELETE',
        body: JSON.stringify(eventdata),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    let data =await  response.json();
    if(data !== null || data !== undefined)
        return Promise.resolve('success')
    return Promise.reject('failure')
})

const eventslice = createSlice({
    name:"events",
    initialState,
    reducers:{
    },
    extraReducers(builder){
        builder.addCase(fetchEvents.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = 'success';
            //state.eventsList = state.eventsList.concat(action.payload);
            state.eventsList = action.payload;
        });
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.status = 'error';
            state.error = state.error.message || 'Failed to fetch events';
        });
        builder.addCase(fetchEventsById.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchEventsById.fulfilled, (state, action) => {
            state.status = 'success';
            //state.eventR = state.eventR.concat(action.payload);
           state.selectedEvent = action.payload;
        });
        builder.addCase(fetchEventsById.rejected, (state, action) => {
            state.status = 'error';
            state.error = state.error.message || 'Failed to fetch events by ID';
        });
        builder.addCase(fetchEventsByPublic.pending, (state, action)=>{
            state.status='loading';
        })
        builder.addCase(fetchEventsByPublic.fulfilled, (state, action)=>{
            state.status = 'success';
            state.selectedEvent = state.selectedEvent.concat(action.payload);
        })
        builder.addCase(fetchEventsByPublic.rejected, (state, action)=>{
            state.status='error';
            state.error = state.error.message || 'Failed to fetch event by public flag';
        })
        builder.addCase(filterEventsByOwnerId.pending, (state, action)=>{
            state.status='loading';
        })
        builder.addCase(filterEventsByOwnerId.fulfilled, (state, action)=>{
            state.status = 'success';
            //state.selectedEvent = state.selectedEvent.concat(action.payload);
            state.eventsList=action.payload;
        })
        builder.addCase(filterEventsByOwnerId.rejected, (state, action)=>{
            state.status='error';
            state.error = state.error.message || 'Failed to fetch event by owner flag';
        })
    }
})

//export let
//console.log(eventslice.reducer)
//export let {eventList}= state => state.eventsreducer.eventList;
export default eventslice.reducer;