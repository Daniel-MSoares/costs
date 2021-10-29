import {useLocation} from "react-router-dom"
import { useState,useEffect } from "react"

import LinkButton from "../layout/LinkButton"
import Container from  "../layout/Container"
import Loading from  "../layout/Loading"
import Message from "../layout/Message"
import ProjectCard from "../project/ProjectCard"

import styles from './Projects.module.css'
function Projects(){
     const [projects,setProjects]=useState([])
     const [removeLoading,setRemoveLoading]=useState(false)

     const location=useLocation()
     let message=''
     if(location.state){
      message=location.state.message
     }
    
     useEffect(()=>{
      setInterval(()=>{
        fetch('http://localhost:5000/projects',{
          method:'GET',
          headers:{
            'content-type':'application/json',
          },
        }).then((resp)=>resp.json())
          .then((data)=>{
            setProjects(data)
            setRemoveLoading(true)
          })
          .catch((err)=>console.log(err))
      },1000)

     },[])

    return (
    <div className={styles.project_container}>
        <div className={styles.title_container}>
          <h1>MY PROJECTS</h1>
          <LinkButton to="/newproject" text="New Project"/>
       </div>
          {message && <Message type='success' msg={message} />}
       <Container customClass='start'>
         {projects.length >0 &&
            projects.map((project)=>( 
               <ProjectCard 
               id={project.id} 
               name={project.name}
               budget={project.budget} 
               category={project.category.name} 
               key={project.id} />
            ))}
        {!removeLoading && <Loading/>}
        {removeLoading && projects.length===0 &&(
          <p>não há projetos cadastrados!</p>
        )}

       </Container>

    </div>
    )
  }
  export default Projects