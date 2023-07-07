import React, { useEffect, useState } from "react";
import { IAppointment }      from "../../types";

interface State {
  requestedAppointments?: IAppointment[];
  suggestedAppointments?: IAppointment[];
}

const Appointments = ({appointments}: { appointments: IAppointment[] | undefined }) => {
  console.log('appointments', appointments)
  return (
    <ul>
      {appointments !== undefined
        && appointments?.length > 0
        && appointments.map((appointment: any, index: number) => (
        <li
          key={ index }
          className={`border border-black mb-1 bg-green-500
            ${appointment.conflicts ? 'bg-yellow-500' : ''}
            ${appointment.suggested ? 'bg-blue-500' : ''}
            ${appointment.inapt ? 'bg-red-500' : ''}
          `}>
          {appointment.patient_id}
          , {appointment.doctor_id}
          {appointment.start_appointment_time !== undefined
          && ', '+appointment.start_appointment_time }
        </li>
      ))}
    </ul>
  )
}

const Dashboard = () => {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const source = new EventSource(`http://localhost:4650/dashboard`);
    
    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });
    
    source.addEventListener('message', (e) => {
      const data: State = JSON.parse(e.data);
      setState(data);
    });
    
    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });
    
    return () => {
      source.close();
    };
  }, []);
  
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex">
          <div className="flex-auto m-10">
            <h1>Requested appointments:</h1>
            <Appointments appointments={ state.requestedAppointments }/>
          </div>
          <div className="flex-auto m-10">
            <h1>Suggested appointments:</h1>
            <Appointments appointments={ state.suggestedAppointments }/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
