import env                      from "react-dotenv";
import axios                    from 'axios';
import { IAppointment, IPerson} from "../types";

const API = axios.create({ baseURL: env.API_URL });

export const createPatients = (patients: IPerson[]) => API.post('/patients', patients)
  .catch(error => {
    console.log(error.response.data);
    throw error.response.data
  });

export const getPatientById = (id: number) => API.get(`/patient/${id}`);

export const createDoctors = (doctors: IPerson[]) => API.post('/doctors', doctors)
  .catch(error => {
    console.log(error.response.data);
    throw error.response.data
  });

export const getDoctorById = (id: number) => API.get(`/doctor/${id}`);

export const createAppointments = (appointments: IAppointment[]) => API.post('/appointments', appointments)
  .catch(error => {
    console.log(error.response.data);
    throw error.response.data
  });

export const updateAppointments = (appointments: IAppointment[]) => API.put('/appointments', appointments)
  .catch(error => {
    console.log(error.response.data);
    throw error.response.data
  });
export const clearDB = () => API.delete('/delete/all')
  .catch(error => {
    console.log(error.response);
    throw error.response.data
  });
