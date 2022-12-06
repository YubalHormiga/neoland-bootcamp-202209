import log from '../utils/coolog'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

function AppoimentLists({ appointments, setAppointment }) {
  // console.log(appointments)
  log.info('AppoimentLists -> render')


  return <>

    {appointments.map((appointment) => {
      return (
        <div className='rounded-lg shadow-md flex gap-5 pb-1'>

          <div className='w-2/12'>
            <p className='font-semibold text-lg flex flex-row'>Cita: <spam>{appointment.appointment}</spam></p>
          </div>

          <div className='w-3/12' >
            <p className='font-semibold text-lg flex flex-row'>{appointment.date}</p>
          </div>

          <div className='w-1/12'>
            <p className=' font-semibold text-lg '>{appointment.time}</p>
          </div>

          <div>
            <p className=' min-w-full font-semibold text-lg '>{appointment.text}</p>
          </div>

          <div className=''>
            <div className='flex flex-col self-end gap-1'>
              <button className='bg-green-400  rounded-md p-1' type='button'><AiOutlineEdit size='1rem' /></button>

              <button className='bg-red-600  rounded-md p-1' type='button'><AiOutlineDelete size='1rem' /></button>
            </div>
          </div>

        </div>

      )
    })}

  </>

}

export default AppoimentLists