document.querySelector("#newComment").addEventListener("submit", event=>{
    event.preventDefault();
    const comment = {
        comment:document.querySelector("#comment").value,
        blog_id:document.querySelector("#hiddenCommentId").value,
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Comment posted");
            location.reload();
        }   else    {
            alert("Please try again");
        }
    })
});