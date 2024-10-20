import styles from './WelcomeMessage.module.css';
function WelcomeMessage(){
  return (
    <>
        <p className={styles.welcome}>Welcome to Todo App</p>
        <p>You are free no task to do . Enjoy your day</p>
    </>
    
  );
}

export default WelcomeMessage;