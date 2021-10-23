import { useEffect, useState } from 'react';


import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
   const [categories,setCategories]= useState([])

   useEffect(()=>{
      fetch("http://localhost:5000/categories",{
         method:"GET",
         headers:{
            'content-type':'aplication/json'
         }
    })
      .then((resp)=>resp.json())
      .then((data)=>{
         setCategories(data)
      })
      .catch((err)=>console.log(err))
   },[])


    return(
       <form className={styles.form}>
          <Input type='text' text='name of project' name='name' placehoder='enter the project name'/>
          <Input type='number' text='total budget' name='budget' placehoder='enter the total budget'/>
          <Select name='category_id' text='Select a category' options={categories}/>
          <SubmitButton text={btnText}/>
       </form>
    )
}
export default ProjectForm;