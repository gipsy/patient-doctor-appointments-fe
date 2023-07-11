import React, { useEffect, useState }                        from "react";
import { IAppointment, IPerson }                             from "../../types";
import { getDoctorById, getPatientById, updateAppointments } from "../../api";
import Modal                                                 from "../../components/modal";
import { AxiosResponse }                                     from "axios";
import env                                                   from "react-dotenv";

interface State {
  requestedAppointments?: IAppointment[];
  suggestedAppointments?: IAppointment[];
}

const Appointments = (
  {appointments, viewCard, handleClick}: {
    appointments: IAppointment[] | undefined,
    viewCard?: boolean,
    handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  }
) => {
  return (
    <ul>
      {appointments !== undefined
        && appointments?.length > 0
        && appointments.map((appointment: any, index: number) => (
        <li
          key={ index }
          className={`flex justify-between pl-2 border border-black mb-1 bg-green-500
            ${appointment.conflicts ? 'bg-yellow-500' : ''}
            ${appointment.suggested ? 'bg-blue-500' : ''}
            ${appointment.inapt ? 'bg-red-500' : ''}
          `}>
          {appointment.patient_id}
          , {appointment.doctor_id}
          {appointment.start_appointment_time !== undefined
          && ', '+appointment.start_appointment_time }
          {viewCard && (
            <button className="bg-white px-2"
                    data-key={index}
                    onClick={ handleClick }
            >
              View Card
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

const Dashboard = () => {
  const [state, setState] = useState<State>({});
  const [isModalActive, setModalActive] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(-1);
  const [patient, setPatient] = useState<AxiosResponse | any>({} as IPerson);
  const [doctor, setDoctor] = useState<AxiosResponse | any>( {} as IPerson);
  const [isLoading, setLoading] = useState(false);
  
  const handleModalOpen = async (e: any) => {
    await setSelectedAppointment(e.target.getAttribute('data-key'));
    await setModalActive(true);
  };
  const handleModalClose = () => {
    setSelectedAppointment(-1);
    setModalActive(false);
  };
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (state.suggestedAppointments && selectedAppointment !== -1){
          const patientData = await getPatientById( state.suggestedAppointments[selectedAppointment].patient_id );
          const doctorData = await getDoctorById( state.suggestedAppointments[selectedAppointment].doctor_id );
          if (patientData.status === 200) {
            setPatient( patientData.data );
          }
          if (doctorData.status === 200) {
            setDoctor( doctorData.data );
          }
        }
      } catch (error) {
        console.log('error:', error)
      } finally {
        setLoading(false);
      }
    })()
  }, [selectedAppointment])
  
  
  useEffect(() => {
    const source = new EventSource(`${env.API_URL}/dashboard`);
    
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
  
  const handleSendData = async () => {
    if (state.suggestedAppointments !== undefined && state.suggestedAppointments.length > 0) {
      await updateAppointments(state.suggestedAppointments);
    }
  }
  
  return (
    <>
      { isModalActive && (
        <Modal
          title="Appointment info"
          onClose={ handleModalClose }
        >
          { isLoading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p>
                <span className="bold">Patient: </span>
                { `${ state.suggestedAppointments && state.suggestedAppointments[selectedAppointment]?.patient_id }`
                  + `${ patient?.name ? ', ' + patient.name : '' }`
                  + `${ patient?.birth_date ? ', ' + patient.birth_date : '' }`
                }
              </p>
              <p>
                <span className="bold">Doctor: </span>
                { `${ state.suggestedAppointments && state.suggestedAppointments[selectedAppointment]?.doctor_id }`
                  + `${ doctor?.name ? ', ' + doctor.name : '' }`
                  + `${ doctor?.birth_date ? ', ' + doctor.birth_date : '' }`
                }
              </p>
              <p>
                <span className="bold">Appointment: </span>
                { state.suggestedAppointments && state.suggestedAppointments[selectedAppointment]?.start_appointment_time }
              </p>
            </>
          ) }
        </Modal>
      ) }
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex">
            <div className="flex-auto m-5">
              <h1>Requested appointments:</h1>
              <Appointments appointments={ state.requestedAppointments }/>
            </div>
            <div className="flex-auto m-5">
              <h1>Suggested appointments:</h1>
              <Appointments appointments={ state.suggestedAppointments } viewCard={ true }
                            handleClick={ handleModalOpen }/>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 mr-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              onClick={ handleSendData }
            >Save data
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
