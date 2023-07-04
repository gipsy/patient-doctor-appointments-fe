import React, { useEffect, useState } from 'react';
import { ChangeEvent }                from "./types";
import { parseForm }                  from "./utils/parse-form";

type Patient = {
  id: number;
  name?: string;
  birthDate?: Date;
  startAttendTime: number;
  endAttendTime: number;
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  
  const handlePatientsChange = (event: ChangeEvent) => {
    event.preventDefault();
    const rawPatientsData = event.target.value.split('\n').filter(patient => patient !== '');
    const newPatients = rawPatientsData.map(patient => {
      let id, name, birthDate, startAttendTime, endAttendTime;
      
      const patientData = patient.split(',');
      
      const checkId = /^\d{3}$/;
      const checkName = /^([a-zA-Z]+)(?:\s(\w+))?/;
      const checkBirthDate = /^(0[1-9]|[12]\d|3[01])(\.|-|\/)(0[1-9]|1[1,2])(\.|-|\/)(19|20)\d{2}$/;
      const checkAttendTime = /^(\d+)(?:-(\d+))$/
      
      patientData.forEach(data => {
        const trimmedData = data.trim();
        
        if (checkId.test(trimmedData)) id = trimmedData;
        if (checkName.test(trimmedData)) name = trimmedData;
        if (checkBirthDate.test(trimmedData)) birthDate = trimmedData;
        if (checkAttendTime.test(trimmedData)) startAttendTime = trimmedData.split('-')[0];
        if (checkAttendTime.test(trimmedData)) endAttendTime = trimmedData.split('-')[1];
      })
      
      return {
        id,
        name,
        birthDate,
        startAttendTime,
        endAttendTime,
      };
    })
    
    console.log(newPatients)
    //setPatients(newPatients)
  }
  
  const handleDoctorsChange = (event: ChangeEvent) => {
    event.preventDefault();
    
    const validators = {
      id: /^\d{3}$/,
      name: /^([a-zA-Z]+)(?:\s(\w+))?/,
      birthDate: /^(0[1-9]|[12]\d|3[01])(\.|-|\/)(0[1-9]|1[1,2])(\.|-|\/)(19|20)\d{2}$/,
      attendTime: /^(\d+)(?:-(\d+))$/
    }
  
    const doctors = parseForm(event.target.value, validators);
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
                            placeholder="Please enter patients data here"></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 mr-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Send data
          </button>
          <button type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Clear DB
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
