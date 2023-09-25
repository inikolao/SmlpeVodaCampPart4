import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    eventsList: [],
    eventsListOwn: [],
    selectedEvent: null,
    registerstatus:'failure',
    editstatus:'failure',
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
export const filterEventsByOwnerId = createAsyncThunk('events/filterByOwnerId', async (ownerId) => {
        // Simulate an asynchronous operation, e.g., fetching data from an API.
        let response = await fetch(`http://localhost:3001/events?ownerid=${ownerId}`);
        return response.json();
    }
);

export const editEvent =createAsyncThunk('deleteEvent/events', async(eventdata)=>
{
    let response =await fetch(`http://localhost:3001/events/${eventdata.id}`,{
        method:'PUT',
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
    let response =await fetch(`http://localhost:3001/events/${eventdata.id}`,{
        method:'DELETE',
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
        changeRegisterStatus:(state)=>{
            state.registerstatus='failure';
        },
        changeEditStatus:(state)=>{
            state.editstatus='failure';
        }
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
            state.eventsListOwn=action.payload;
        })
        builder.addCase(filterEventsByOwnerId.rejected, (state, action)=>{
            state.status='error';
            state.error = state.error.message || 'Failed to fetch event by owner flag';
        })
        builder.addCase(editEvent.pending, (state, action)=>{
            state.editstatus='loading';
        })
        builder.addCase(editEvent.fulfilled, (state, action)=>{
            state.editstatus = 'success';
            //state.selectedEvent = state.selectedEvent.concat(action.payload);
        })
        builder.addCase(editEvent.rejected, (state, action)=>{
            state.editstatus='error';
            state.error = state.error.message || 'Failed to edit event by id flag';
        })
        builder.addCase(deleteEvent.pending, (state, action)=>{
            state.editstatus='loading';
        })
        builder.addCase(deleteEvent.fulfilled, (state, action)=>{
            state.editstatus = 'success';
            //state.selectedEvent = state.selectedEvent.concat(action.payload);
        })
        builder.addCase(deleteEvent.rejected, (state, action)=>{
            state.editstatus='error';
            state.error = state.error.message || 'Failed to delete event';
        })
        builder.addCase(addEvent.pending, (state, action)=>{
            state.registerstatus='loading';
        })
        builder.addCase(addEvent.fulfilled, (state, action)=>{
            state.registerstatus = 'success';
            //state.selectedEvent = state.selectedEvent.concat(action.payload);
        })
        builder.addCase(addEvent.rejected, (state, action)=>{
            state.registerstatus='error';
            state.error = state.error.message || 'Failed to add event';
        })
    }
})

//export let
//console.log(eventslice.reducer)
//export let {eventList}= state => state.eventsreducer.eventList;
export let {changeEditStatus, changeRegisterStatus} = eventslice.actions;
export default eventslice.reducer;