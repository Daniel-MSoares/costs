import {useLocation} from "react-router-dom"

import LinkButton from "../layout/LinkButton"
import Container from  "../layout/Container"
import Message from "../layout/Message"
import styles from './Projects.module.css'
function Projects(){
     const location=useLocation()
     let message=''
     if(location.state){
      message=location.state.message
     }
    return (
    <div className={styles.project_container}>
        <div className={styles.title_container}>
          <h1>MY PROJECTS</h1>
          <LinkButton to="#" text="New Project"/>
       </div>
          {message && <Message type='success' msg={message} />}
       <Container customClass='start'>

         <p>projects...</p>


       </Container>

    </div>
    )
  }
  export default Projects