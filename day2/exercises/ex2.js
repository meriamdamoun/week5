async function fetchStarshipData() {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships/9/");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const objectStarWars = await response.json();
      console.log(objectStarWars.result);
    } catch (error) {
      console.error("Error fetching starship data:", error);
    }
  }
  
  fetchStarshipData();
  
  
  
  //another exercise
  /**
   * The asyncCall() function is called at the bottom of the code
   * It immediately logs 'calling' to the console
   * It calls resolveAfter2Seconds() which returns a Promise
   * The await keyword pauses execution of asyncCall() until the Promise resolves
   * After 2 seconds, the timeout completes and the Promise resolves with the value 'resolved'
   * Execution resumes in asyncCall(), and result is set to 'resolved'
   * Finally, it logs 'resolved' to the console
   */
  function resolveAfter2Seconds() {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve('resolved');
          }, 2000);
      });
  }
  
  async function asyncCall() {
      console.log('calling');
      let result = await resolveAfter2Seconds();
      console.log(result);
  }
  
  asyncCall();