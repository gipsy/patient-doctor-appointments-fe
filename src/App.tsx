import React, { useState }                           from 'react';
import { ChangeEvent, IPerson, IAppointment } from "./types";
import { parseForm }                                 from "./utils/parse-form";
import { appointmentValidator, personValidator }                      from "./utils/validators";
import { clearDB, createAppointments, createDoctors, createPatients } from "./api";

const App = () => {
  const [patients, setPatients] = useState<IPerson[]>([]);
  const [doctors, setDoctors] = useState<IPerson[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  
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
    
    let [patientsResult, doctorsResult, appointmentsResult] = await Promise.all([
      createPatients(patients),
      createDoctors(doctors),
      createAppointments(appointments)
    ])
    console.log('patientsResult',patientsResult)
    console.log('doctorsResult',doctorsResult)
    console.log('appointmentsResult',appointmentsResult)
  }
  
  const handleClearDB = async () => {
    await clearDB();
  }
  
  return (
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
  );
}

export default App;
