import log from '../utils/coolog'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import retrieveAppointments from '../logic/retrieveAppointments'
import UpdateAppointment from './UpdateAppointment'

function AppointmentLists() {
  const [appointments, setAppointments] = useState([])
  const [updateAppointment, setUpdateAppointment] = useState()

  
  useEffect(() => {
    log.info('AppoimentLists -> render')

    retrieveAppointmentsHandler()
  }, [])

  const retrieveAppointmentsHandler = () => {
    try {
      retrieveAppointments(sessionStorage.token)
        .then(appointments => setAppointments(appointments))
        .catch(error => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  const handleUpdateClose = () => {
    setUpdateAppointment()
  }

  const handleUpdated = () => {
    retrieveAppointmentsHandler()

    setUpdateAppointment()
  }


  return <>
    {appointments.map((appointment) => {
      return (
        <div className='rounded-lg shadow-md flex justify-between gap-5 pb-1'>

          <div className=''>
            <p className='font-semibold text-lg flex flex-row'>Cita: <spam>{appointment.title}</spam></p>
          </div>

          <div className='' >
            <p className='font-semibold text-lg flex flex-row'>{appointment.date.toGMTString()}</p>
          </div>

          <div>
            <p className='font-semibold text-lg '>{appointment.body}</p>
          </div>

          <div className=''>
            <div className='flex flex-col self-end gap-1'>
              <button onClick={() => setUpdateAppointment(appointment)} className='bg-green-400  rounded-md p-1' type='button'><AiOutlineEdit size='1rem' /></button>
              <button className='bg-red-600  rounded-md p-1' type='button'><AiOutlineDelete size='1rem' /></button>
            </div>
          </div>

        </div>

      )
    })}
    {updateAppointment && <UpdateAppointment appointment={updateAppointment} onClose={handleUpdateClose} onUpdated={handleUpdated} />}
  </>

}

export default AppointmentLists