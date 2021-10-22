import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'
function ProjectForm({btnText}){
    return(
       <form className={styles.form}>
          <Input type='text' text='name of project' name='name' placehoder='enter the project name'/>
          <Input type='number' text='total budget' name='budget' placehoder='enter the total budget'/>
          <Select name='category_id' text='Select a category'/>
          <SubmitButton text={btnText}/>
       </form>
    )
}
export default ProjectForm;