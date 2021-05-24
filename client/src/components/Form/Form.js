import React, { useState, useEffect } from 'react';
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../../actions/events';
import { useSelector } from 'react-redux';



const Form = ({ currentId, setCurrentId }) => {
    const [eventData, setEventData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const event = useSelector((state) => currentId ? state.events.find((e) => e._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        if (event) setEventData(event);
    }, [event]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateEvent(currentId, eventData));
        } else {
            dispatch(createEvent(eventData));
        }
    };

    const clear = () => {
        setCurrentId(null);
        setEventData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creatin'} an Event!</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={eventData.creator} onChange={(e) => setEventData({ ...eventData, creator: e.target.value })}></TextField>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })}></TextField>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={eventData.message} onChange={(e) => setEventData({ ...eventData, message: e.target.value })}></TextField>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={eventData.tags} onChange={(e) => setEventData({ ...eventData, tags: e.target.value.split(',') })}></TextField>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setEventData({ ...eventData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;