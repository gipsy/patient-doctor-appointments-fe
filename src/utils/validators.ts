export const personValidator = {
  id: /^\d{3}$/,
  name: /^([a-zA-Z]+)(?:\s(\w+))?/,
  birth_date: /^(0[1-9]|[12]\d|3[01])(\.|-|\/)(0[1-9]|1[1,2])(\.|-|\/)(19|20)\d{2}$/,
  time_slot: /^(\d+)(?:-(\d+))$/
}

export const appointmentValidator = {
  patient_id: /^(0\d|1\d)\d$/, // 001 - 199
  doctor_id: /^(2\d)\d$/, // 200 - 299
  start_appointment_time: /^(0[1-9]|1\d|2[0-3])$/
}

