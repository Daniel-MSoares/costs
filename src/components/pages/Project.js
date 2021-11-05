import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])
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
                 <div>
                   form of the Service
                 </div>
              )
              }
            </div>
          </div>
          <h2>services</h2>
        </Container>
        <Container customClass='start'>
              <p>Itens of the services</p>
        </Container>
      </div>
    ) : (<Loading />)
    }
  </>)
}
export default Project;