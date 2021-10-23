import { useHistory } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
function NewProject(){
   const history=useHistory()
   function createPost(project){
      // initialize cost and service
      project.cost = 0
      project.services = []

      fetch('http://localhost:5000/projects',{
        method:"POST",
        headers:{
          'content-type':'application/json'
       },
        body: JSON.stringify(project),

      }).then((resp)=>resp.json())
      .then((data)=>{
        console.log(project)
        //redirect
        history.push('/projects',{message:'project created wiht success!'})
        
      })
      .catch((err)=>console.log(err))

   }
    return (
    <div className={styles.newproject_container}>
       <h1>Create New Project</h1>
       <p>Create your project for then add services</p>
       <ProjectForm  handleSubmit={createPost} btnText='Create Project'/>
    </div>
    )
  }
export default NewProject