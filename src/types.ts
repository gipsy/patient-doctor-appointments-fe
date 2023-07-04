export type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface IPerson {
  id: number;
  name?: string;
  birth_date?: Date;
  time_slot: string;
};

export interface IAppointment {
  patient_id: number;
  doctor_id: number;
  start_appointment_time: number;
}

