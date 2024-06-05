
function changeBackground(){
    if(index == 1){
      document.body.style.backgroundColor = 'red'
    }
  }
  
  async function waitChangeBg(){
  const response =  await changeBackground()
  try {
    document.body.backgroundColor = 'red'
    console.log(response);
  } catch (error) {
    console.log(error);  
  }
  }