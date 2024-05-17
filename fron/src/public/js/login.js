const logueese=()=>{
    const email=document.getElementById("email");
    const contrasena=document.getElementById("contrasena");
    console.log(email.value)
    let option={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "email":email.value,
            "contrasena":contrasena.value
        })
    };

    let url="http://localhost:9000/api/login";

    fetch(url, option)
    .then(res=>res.json())
    .then(data=>{

        document.cookie=`token=${data.token}`;
       
         if (data.token !== undefined) {
             window.location.href="/dash";
            console.log(data.token);
         }else{

            alertify.error('Clave Incorrecta');

         }
    })
    .catch(error=> console.error(error.message))
};