import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

function ServiceForm({handleSubmit,btnText,projectData}){
  const[service,setService]=useState({})
  function submit(e){
   e.preventDefault()
   projectData.services.push(service)
   handleSubmit(projectData)
  }
  function handleChange(e){
    setService({...service,[e.target.name]:e.target.value})
   }


  return(
      <form onSubmit={submit} className={styles.form}>
       <Input 
       type='text' 
       text='Name project' 
       name='name' 
       placehoder='inform the project name' 
       handleOnChange={handleChange}/>
      <Input 
       type='number' 
       text='Cost service' 
       name='cost' 
       placehoder='inform the total cost' 
       handleOnChange={handleChange}/>

       <Input 
       type='Text-area' 
       text='Description' 
       name='description'  
       handleOnChange={handleChange}/>
       <SubmitButton text={btnText}/>
      </form>
  )
}
export default ServiceForm