document.querySelector("#signup").addEventListener("submit",event=>{
    event.preventDefault();
    const userObj = {
        email:document.querySelector("#signupEmail").value,
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(userObj);
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("User is signed up");
            location.href="/dashboard"
        }   else    {
            alert("Please try again");
        }
    })
});