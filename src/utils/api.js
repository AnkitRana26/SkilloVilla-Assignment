const apiURL='http://localhost:8080/';


export const getComments =async()=>{
    try{
        const response = await fetch(apiURL+'comments');
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}

export const getUserDetails =async(id)=>{
    try{
        const response = await fetch(apiURL+`user/${id}`);
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}

export const getReplies =async(searchParam)=>{
    
    try{
        const response = await fetch(apiURL+`replies?`+ new URLSearchParams(searchParam));
        const data = await response.json();
        
        return data;
    }catch(err){
        console.log(err.message);
    }
}

export const loggedInUser = async(body)=>{


    try{
        const response = await fetch(apiURL+`user?userName=${body.userName}`);
        const data = await response.json();
        if(data.length>0){
            return data[0];
        }        
    }catch(err){
        console.log(err.message)
    }

    try{
        const response =await fetch(apiURL+'user',{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":'application/json'
            }
        })
        const data = await response.json();

        return data;

    }catch(err){



    }




}

export const postComment =async(body)=>{


    try{
        const response =await fetch(apiURL+'comments',{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":'application/json'
            }
        })
        const data = await response.json();
        return data;
    }catch(err){



    }


}

export const updateComment =async (route,body,id)=>{

    try{
        const response = await fetch(apiURL+`${route}/${id}`,{
            method:"PATCH",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":'application/json'
            }
        })
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }




}


export const deltComment =async(route,id)=>{
    try{
        const response = await fetch(apiURL+`${route}/${id}`,{
            method:"DELETE",
        })
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}

export const postReplies=async(body)=>{
    try{
        const response =await fetch(apiURL+'replies',{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":'application/json'
            }
        })
        const data = await response.json();
        return data;
    }catch(err){



    }
}