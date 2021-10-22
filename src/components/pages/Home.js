import LinkButton from '../layout/LinkButton'

import styles from'./Home.module.css'
import savings from'../../img/savings.svg'
function Home(){
  return (
       <section className={styles.home_container}>
         <h1>Wellcome to <span>costs</span></h1>
         <p>Start manager yours projects just now!</p>
         <LinkButton to='/newproject' text='Create Project'/>
         <img src={savings} alt='Costs'/>
       </section>
  )
}
export default Home