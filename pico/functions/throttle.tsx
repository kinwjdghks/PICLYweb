const throttle = (callback:()=>void,period=500) => {

  let timer: NodeJS.Timer | null = null;
  if(timer){
    console.log('rejected');
  }
  else{
    timer = setTimeout(() => {
    timer = null;
    }, period);
    callback();
    console.log("throttled!");
  }
};

export default throttle;
//not working
