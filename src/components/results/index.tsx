const ResultList = ({ results }: { results: Array<any> }) => {
  
  const PatientResults = () => {
    const successfulPatients =
      results[0] !== undefined && results[0].data !== undefined
      ? results[0].data.map((patient: any) => patient)
      : results[0] !== undefined && results[0].message !== undefined && results[0].message.insertedDocs !== undefined
        ? results[0].message.insertedDocs.map((patient: any) => patient) : []
    
    const wrongFormatPatients =
      results[0] !== undefined && results[0].patientsValidation !== undefined
      ? results[0].patientsValidation.filter((patient: any) =>
        !patient.idValid
        || !patient.nameValid
        || !patient.birthDateValid
        || !patient.timeSlotValid
        || !patient.paramsAmountValid
      ) : []
    
    const duplicatePatients =
      results[0] !== undefined && results[0].patientsValidation !== undefined
      ? results[0].patientsValidation.filter((patient: any) => patient.isDuplicate)
      : []
    
    return (
      <>
        {successfulPatients.length > 0 && (
          <div>
            <h3 className="text-semibold">Successful patients:</h3>
            <ul>
              {successfulPatients.map((patient: any, index: number) => (
                <li key={ index }>
                  {`${patient.id}`
                    +`, ${patient.time_slot}`
                    +`${patient.name?.length > 0 ? ', '+patient.name : ''}`
                    +`${patient.birth_date?.length > 0 ? ', '+patient.birth_date : ''}`
                  }
                </li>
              ))}
            </ul>
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
            <ul>
              {duplicatePatients.map((patient: any, index: number) => (
                <li key={ index }>
                  {`${patient.id}`
                    +`, ${patient.time_slot?.length > 0 && patient.timeSlotValid ? patient.time_slot : ''}`
                    +`${patient.name?.length > 0 && patient.nameValid ? ', '+patient.name : ''}`
                    +`${patient.birth_date?.length > 0 && patient.birthDateValid ? ', '+patient.birth_date : ''}`
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
  
  const DoctorResults = () => {
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
    
    const duplicateDoctors =
      results[1] !== undefined && results[1].doctorsValidation !== undefined
      ? results[1].doctorsValidation.filter((doctor: any) => doctor.isDuplicate)
      : []
    
    return (
      <>
        {successfulDoctors.length > 0 && (
          <div>
            <h3 className="text-semibold">Successful doctors:</h3>
            <ul>
              {successfulDoctors.map((doctor: any, index: number) => (
                <li key={ index }>
                  {`${doctor.id}`
                    +`, ${doctor.time_slot}`
                    +`${doctor.name?.length > 0 ? ', '+doctor.name : ''}`
                    +`${doctor.birth_date?.length > 0 ? ', '+doctor.birth_date : ''}`
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {wrongFormatDoctors.length > 0 && (
          <div>
            <h3 className="text-semibold">Wrong format doctors:</h3>
            <ul>
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
            </ul>
          </div>
        )}
        
        {duplicateDoctors.length > 0 && (
          <div>
            <h3 className="text-semibold">Duplicate doctors:</h3>
            <ul>
              {duplicateDoctors.map((doctor: any, index: number) => (
                <li key={ index }>
                  {`${doctor.id}`
                    +`${doctor.time_slot?.length > 0 && doctor.timeSlotValid ? ', '+doctor.time_slot : ''}`
                    +`${doctor.name?.length > 0 && doctor.nameValid ? ', '+doctor.name : ''}`
                    +`${doctor.birth_date?.length > 0 && doctor.birthDateValid ? ', '+doctor.birth_date : ''}`
                  }
                </li>
              ))}
            </ul>
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
        ? results[2].message?.insertedDocs
        : []
    
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
            <ul>
              {successfulAppointments.map((appointment: any, index: number) => (
                <li key={ index }>
                  {`${appointment.patient_id}`
                  +`, ${appointment.doctor_id}`
                  +`${appointment.start_appointment_time !== undefined
                      && appointment.start_appointment_time
                      ? ', '+appointment.start_appointment_time : ''}`
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {wrongFormatAppointments.length > 0 && (
          <div>
            <h3 className="text-semibold">Wrong format doctors:</h3>
            <ul>
              {wrongFormatAppointments.map((appointment: any, index: number) => (
                <li key={ index }>
                  {`${appointment.patientIdValid ? appointment.patient_id : ''}`
                    +`${appointment.doctorIdValid ? appointment.doctor_id : ''}`
                    +`${appointment.patientIdValid ? '' : ' -- Wrong patient ID.'}`
                    +`${appointment.doctorIdValid ? '' : ' -- Wrong doctor ID.'}`
                  }
                </li>
              ))}
            </ul>
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

export default ResultList;
