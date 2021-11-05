import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import{v4 as uuidv4}from 'uuid'



import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()


  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }).then(resp => resp.json())
        .then((data) => {
          setProject(data)
          setServices(data.services)
        })
        .catch(err => console.log(err))
    }, 300)
  }, [id])
function editPost(project){
  setMessage('')
  //budget Validation
  if(project.budget < project.cost){
    setMessage('')
    setMessage('the budget cannot be less than the project cost!')
    setType('error')
    return false
  }
  fetch(`http://localhost:5000/projects/${project.id}`,{
    method:'PATCH',
    headers:{
      'content-type':'application/json',
    },
    body:JSON.stringify(project)
  }).then(resp=>resp.json())
  .then((data)=>{
    setProject(data)
    setShowProjectForm(false)
    //message
    setMessage('the project has been updated!')
    setType('success')
  })
  .catch(err=>console.log(err))

}
  function createService() {
    setMessage('')
    //last service
    const lastService=project.services[project.services.length-1]
    lastService.id=uuidv4()
    const lastServiceCost=lastService.cost
    const newCost=parseFloat(project.cost)+parseFloat(lastServiceCost)
     //maximum value validadtion
    if(newCost >parseFloat(project.budget)){
      setMessage('over budget,check the value service')
      setType('error')
      project.services.pop()
      return false
    }

    //add service cost to project total cost
    project.cost = newCost
    //update project
    fetch(`http://localhost:5000/projects/${project.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(project)
    }).then(resp=>resp.json())
     .then((data)=>{
        //show services
        setMessage('service added successfully')
        setType('success')
        setShowServiceForm(false)
     })
     .catch(err=>console.log(err))



  }
  function removeService(id,cost){
    setMessage('')
    const servicesUpdated=project.services.filter((service)=>service.id !== id)
    const projectUpdated=project
    projectUpdated.services = servicesUpdated
    projectUpdated.cost=parseFloat(projectUpdated.cost)-parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(projectUpdated)
    }).then((resp)=>resp.json())
       .then((data)=>{
         setProject(projectUpdated)
         setServices(servicesUpdated)
         setMessage('service removed successfully!')
         setType('success')
       })
       .catch(err=>console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }



  return (<>
    {project.name ? (
      <div className={styles.project_details}>
        <Container customClass='column'>
          {message && <Message type={type} msg={message}/>}
          <div className={styles.details_container}>
            <h1>Project: {project.name}</h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? 'edit project' : 'close'}
            </button>
            {!showProjectForm ? (
              <div className={styles.project_info}>
                <p><span>Category: </span>{project.category.name}</p>
                <p><span>Budget: </span>R$ {project.budget}</p>
                <p><span>Total spent: </span>R$ {project.cost}</p>
              </div>
             ): (
              <div className={styles.project_info}>
                <ProjectForm handleSubmit={editPost} btnText='Save Changes' projectData={project}/>
              </div>
             )
            }

          </div>
          <div className={styles.service_form_container}>
             <h2>Add a service</h2>
             <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? 'Add service' : 'close'}
            </button>
            <div className={styles.project_info}>
              {showServiceForm && (
                 <ServiceForm
                  handleSubmit={createService}
                  btnText='Add Service'
                  projectData={project}
                 />
              )
              }
            </div>
          </div>
          <h2>services</h2>
        </Container>
        <Container customClass='start'>
        {services.length > 0 &&(
              services.map((service)=>(
                <ServiceCard
                id={service.id}
                name={service.name}
                cost={service.cost}
                description={service.description}
                key={service.id}
                handleRemove={removeService}
                />
              )) 
          )
        }
        {services.length===0&&<p>There are still no services in this project.</p>}
        </Container>
      </div>
    ) : (<Loading />)
    }
  </>)
}
export default Project;