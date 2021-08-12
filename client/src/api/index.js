import axios from 'axios';

const API = axios.create({ baseURL: 'https://event4you.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchEvents = () => API.get('/events');
export const createEvent = (newEvent) => API.post('/events', newEvent);
export const likeEvent = (id) => API.patch(`/events/${id}/likeEvent`);
export const updateEvent = (id, updatedEvent) => API.patch(`/events/${id}`, updatedEvent);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
