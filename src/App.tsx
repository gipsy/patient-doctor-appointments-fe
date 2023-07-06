import React, { useState }                                            from 'react';
import { ChangeEvent, IPerson, IAppointment }                         from "./types";
import { parseForm }                                                  from "./utils/parse-form";
import { appointmentValidator, personValidator }                      from "./utils/validators";
import { clearDB, createAppointments, createDoctors, createPatients } from "./api";
import Modal                                                          from "./components/modal";

const ResultList = ({ results }: { results: Array<any> }) => {
  
  const PatientResults = () => {
    const successfulPatients = results[0] !== undefined && results[0].data !== undefined
      ? results[0].data.map((patient: any) => patient)
      : results[0] !== undefined && results[0].message !== undefined && results[0].message.insertedDocs !== undefined
        ? results[0].message.insertedDocs.map((patient: any) => patient) : []
    
    const wrongFormatPatients = results[0] !== undefined && results[0].patientsValidation !== undefined
      ? results[0].patientsValidation.filter((patient: any) =>
        !patient.idValid
        || !patient.nameValid
        || !patient.birthDateValid
        || !patient.timeSlotValid
        || !patient.paramsAmountValid
      ) : []
    
    const duplicatePatients = results[0] !== undefined && results[0].patientsValidation !== undefined
      ? results[0].patientsValidation.filter((patient: any) => patient.isDuplicate)
      : []
    
    return (
      <>
        {successfulPatients.length > 0 && (
          <div>
            <h3 className="text-semibold">Successful patients:</h3>
            {successfulPatients.map((patient: any, index: number) => (
              <li key={ index }>
                {`${patient.id}`
                 +`, ${patient.time_slot}`
                 +`${patient.name?.length > 0 ? ', '+patient.name : ''}`
                 +`${patient.birth_date?.length > 0 ? ', '+patient.birth_date : ''}`
                }
              </li>
            ))}
          </div>
        )}
    
        {wrongFormatPatients.length > 0 && (
          <div>
            <h3 className="text-semibold">Wrong format patients:</h3>
            {wrongFormatPatients.map((patient: any, index: number) => (
              <li key={ index }>
                {`${patient.idValid ? patient.id : ''}`
                 +`${patient.time_slot?.length > 0 && patient.timeSlotValid ? ', '+patient.time_slot : ''}`
                 +`${patient.name?.length > 0 && patient.nameValid ? ', '+patient.name : ''}`
                 +`${patient.birth_date?.length > 0 && patient.birthDateValid ? ', '+patient.birth_date : ''}`
                 +`${patient.idValid ? '' : ' -- WrongID.'}`
                 +`${patient.timeSlotValid ? '' : ' -- Wrong time slot.'}`
                 +`${patient.nameValid ? '' : ' -- Wrong name.'}`
                 +`${patient.birthDateValid ? '' : ' -- Wrong birthdate.'}`
                 +`${patient.paramsAmountValid ? '' : ' -- Redundant params.'}`
                }
              </li>
            ))}
          </div>
        )}
  
        {duplicatePatients.length > 0 && (
          <div>
            <h3 className="text-semibold">Duplicate patients:</h3>
            {duplicatePatients.map((patient: any, index: number) => (
              <li key={ index }>
                {`${patient.id}`
                 +`, ${patient.time_slot?.length > 0 && patient.timeSlotValid ? patient.time_slot : ''}`
                 +`${patient.name?.length > 0 && patient.nameValid ? ', '+patient.name : ''}`
                 +`${patient.birth_date?.length > 0 && patient.birthDateValid ? ', '+patient.birth_date : ''}`
                }
              </li>
            ))}
          </div>
        )}
      </>
    )
  }
  
  const DoctorResults = () => {
    console.log('results[1]',results[1])
    console.log('results[1]',results[1].data)
    const successfulDoctors =
      results[1] !== undefined && results[1].data !== undefined
      ? results[1].data.map((doctor: any) => doctor)
      : results[1] !== undefined && results[1].message !== undefined && results[1].message.insertedDocs !== undefined
        ? results[1].message.insertedDocs.map((patient: any) => patient) : []
  
    const wrongFormatDoctors =
      results[1] !== undefined && results[1].doctorsValidation !== undefined
      ? results[1].doctorsValidation.filter((doctor: any) =>
        !doctor.idValid
        || !doctor.nameValid
        || !doctor.birthDateValid
        || !doctor.timeSlotValid
        || !doctor.paramsAmountValid
      )
      : []
    
    const duplicateDoctors = results[1] !== undefined && results[1].doctorsValidation !== undefined
      ? results[1].doctorsValidation.filter((doctor: any) => doctor.isDuplicate)
      : []
  
    return (
      <>
        {successfulDoctors.length > 0 && (
          <div>
            <h3 className="text-semibold">Successful doctors:</h3>
            {successfulDoctors.map((doctor: any, index: number) => (
              <li key={ index }>
                {`${doctor.id}`
                 +`, ${doctor.time_slot}`
                 +`${doctor.name?.length > 0 ? ', '+doctor.name : ''}`
                 +`${doctor.birth_date?.length > 0 ? ', '+doctor.birth_date : ''}`
                }
              </li>
            ))}
          </div>
        )}
        
        {wrongFormatDoctors.length > 0 && (
          <div>
            <h3 className="text-semibold">Wrong format doctors:</h3>
            {wrongFormatDoctors.map((doctor: any, index: number) => (
              <li key={ index }>
                {`${doctor.idValid ? doctor.id : ''}`
                 +`${doctor?.time_slot.length > 0 && doctor.timeSlotValid ? ', '+doctor.time_slot : ''}`
                 +`${doctor.name?.length > 0 && doctor.nameValid ? ', '+doctor.name : ''}`
                 +`${doctor.birth_date?.length > 0 && doctor.birthDateValid ? ', '+doctor.birth_date : ''}`
                 +`${doctor.idValid ? '' : ' -- WrongID.'}`
                 +`${doctor.timeSlotValid ? '' : ' -- Wrong time slot.'}`
                 +`${doctor.nameValid ? '' : ' -- Wrong name.'}`
                 +`${doctor.birthDateValid ? '' : ' -- Wrong birthdate.'}`
                 +`${doctor.paramsAmountValid ? '' : ' -- Redundant params.'}`
                }
              </li>
            ))}
          </div>
        )}
        
        {duplicateDoctors.length > 0 && (
          <div>
            <h3 className="text-semibold">Duplicate doctors:</h3>
            {duplicateDoctors.map((doctor: any, index: number) => (
              <li key={ index }>
                {`${doctor.id}`
                  +`${doctor.time_slot?.length > 0 && doctor.timeSlotValid ? ', '+doctor.time_slot : ''}`
                  +`${doctor.name?.length > 0 && doctor.nameValid ? ', '+doctor.name : ''}`
                  +`${doctor.birth_date?.length > 0 && doctor.birthDateValid ? ', '+doctor.birth_date : ''}`
                }
              </li>
            ))}
          </div>
        )}
      </>
    )
  }

  const AppointmentResults = () => {
    const successfulAppointments =
      results[2] !== undefined && results[2].data !== undefined
      ? results[2].data
      : results[2] !== undefined && results[2].message !== undefined !== results[1].message.insertedDocs !== undefined
        ? results[2].message.insertedDocs
        : []
  
    console.log('results[2]', results[2])
    const wrongFormatAppointments =
      results[2] !== undefined && results[2].appointmentsValidation !== undefined
      ? results[2].appointmentsValidation.filter((appointment: any) =>
        !appointment.patientIdValid || !appointment.doctorIdValid )
      : []
    return (
      <>
        {successfulAppointments.length > 0 && (
          <div>
            <h3 className="text-semibold">Successful appointments:</h3>
            {successfulAppointments.map((appointment: any, index: number) => (
              <li key={ index }>
                {`${appointment.patient_id}`
                  +`, ${appointment.doctor_id}`
                  +`${appointment.start_appointment_time.length > 0 ? ', '+appointment.start_appointment_time : ''}`
                }
              </li>
            ))}
          </div>
        )}
        
        {wrongFormatAppointments.length > 0 && (
          <div>
            <h3 className="text-semibold">Wrong format doctors:</h3>
            {wrongFormatAppointments.map((appointment: any, index: number) => (
              <li key={ index }>
                {`${appointment.patientIdValid ? appointment.patient_id : ''}`
                  +`${appointment.doctorIdValid ? appointment.doctor_id : ''}`
                  +`${appointment.patientIdValid ? '' : ' -- Wrong patient ID.'}`
                  +`${appointment.doctorIdValid ? '' : ' -- Wrong doctor ID.'}`
                }
              </li>
            ))}
          </div>
        )}
      </>
    )
  };
  
  return (
    <div>
      <PatientResults />
      <DoctorResults />
      <AppointmentResults />
    </div>
  )
}

const App = () => {
  const [patients, setPatients] = useState<IPerson[]>([]);
  const [doctors, setDoctors] = useState<IPerson[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [results, setResults] = useState<Array<any>>([]);
  const [isModalActive, setModalActive] = useState(false);
  
  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };
  
  const handlePatientsChange = (event: ChangeEvent) => {
    event.preventDefault();
    
    const patients = parseForm(event.target.value, personValidator);
    setPatients(patients);
  }
  
  const handleDoctorsChange = (event: ChangeEvent) => {
    event.preventDefault();
    
    const doctors = parseForm(event.target.value, personValidator);
    setDoctors(doctors);
  }
  
  const handleAppointmentsChange = (event: ChangeEvent) => {
    event.preventDefault();
    
    const appointments = parseForm(event.target.value, appointmentValidator);
    setAppointments(appointments);
  }
  
  const handleSendData = async () => {
  
    const results = await Promise.all([
      patients.length > 0 ? createPatients(patients) : undefined,
      doctors.length > 0 ? createDoctors(doctors) : undefined,
      appointments.length > 0 ? createAppointments(appointments) : undefined
    ].map(p => p?.catch(e => e)));
    
    setResults(results)
    if (results.length > 0) {
      handleModalOpen()
    }
  }
  
  const handleClearDB = async () => {
    await clearDB();
  }
  
  return (
    <>
      {isModalActive && (
        <Modal
          title="Results"
          onClose={handleModalClose}
        >
          {results.length > 0 && (
            <ResultList results={results} />
          )}
        </Modal>
      )}
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <div className="w-full py-8 mx-auto max-w-2xl lg:py-16">
              {/*<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add patients</h2>*/}
              <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="patients"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patients</label>
                    <textarea id="patients" rows={8}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Please enter patients data here"
                              onChange={ handlePatientsChange }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full py-8 mx-auto max-w-2xl lg:py-16">
              {/*<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Doctors</h2>*/}
              <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="patients"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctors</label>
                    <textarea id="patients" rows={8}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Please enter patients data here"
                              onChange={ handleDoctorsChange }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full py-8 mx-auto max-w-2xl lg:py-16">
              {/*<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add appointments</h2>*/}
              <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="patients"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appointments</label>
                    <textarea id="patients" rows={8}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Please enter patients data here"
                              onChange={handleAppointmentsChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit"
                    className="inline-flex items-center px-5 py-2.5 mt-4 mr-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    onClick={handleSendData}
            >
              Send data
            </button>
            <button type="submit"
                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    onClick={handleClearDB}
            >
              Clear DB
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
