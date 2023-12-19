var form=document.querySelector('form')
form.addEventListener("submit",posting);
document.addEventListener("DOMContentLoaded", (event) => {
    let e=[];
    fetch('https://todo-app-fetch-api-default-rtdb.firebaseio.com/data.json',{
        method:'GET',
           headers:{
               'Content-type':'application/json',
           },
       }).then(res=>res.json())
          
          .then((data)=>{
          for(let key in data){
            var ele=document.createElement('div');
    ele.id='li';
    var text=document.createTextNode(` Id:${data[key].num} - Name:${data[key].name} - category:${data[key].cat} - Amount:${data[key].amount}`)
    var delbtn=document.createElement('button');
    delbtn.className='delbtn';
   delbtn.innerText="Delete";
   
ele.appendChild(text);
ele.appendChild(delbtn);
ele.addEventListener("click",show);
ele.addEventListener("click",()=>{
    console.log(key)
    fetch(`https://todo-app-fetch-api-default-rtdb.firebaseio.com/data/${key}.json`,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
        },
    }).then((res)=>{
        if(res.ok){
    return res.json();
    }else{
            return res.json().then((data)=>{
                let errormsg="not a valid email";
               throw new Error(errormsg); 
            });
        }
    }).then((data)=>{
        console.log(data);
      
    })
});
function show(e){


    if(e.target.classList.contains('delbtn')){
        var item=e.target.parentElement;
       var main=document.getElementById('list')
       main.removeChild(item);
     var d=item.innerText;
     console.log(d)
     console.log(d.length)
     var c=0;
     for(let k=0;k<d.length;k++){
       
        if(d[k]==' ' && c>1){
            break;
        }
        c++;
       }
     console.log(c)
 const data=d.slice(4,c);
 console.log(data)
    }
}

document.getElementById('list').appendChild(ele)
          }
        })
})
function posting(e){
    e.preventDefault();
    var number=document.getElementById("number").value;
    var amount=document.getElementById("amount").value;
    var name=document.getElementById("name").value;
    var cat=document.getElementById("cat").value;
    const obj={
        num:number,
        amount:amount,
        name:name,
        cat:cat,
    }
    console.log(obj)
    var ele=document.createElement('div');
    ele.id='li';
    var text=document.createTextNode(` Id:${obj.num} - Name:${obj.name} - category:${obj.cat} - Amount:${obj.amount}`)
    var delbtn=document.createElement('button');
    delbtn.className='delbtn';
   delbtn.innerText="Delete";
   
ele.appendChild(text);
ele.appendChild(delbtn);
ele.addEventListener("click",show);
function show(e){
    if(e.target.classList.contains('delbtn')){
       var item=e.target.parentElement;
      var main=document.getElementById('list')
      main.removeChild(item);
    }
   
}
document.getElementById('list').appendChild(ele)
    fetch('https://todo-app-fetch-api-default-rtdb.firebaseio.com/data.json', 
    {
         method:'POST',
    body:JSON.stringify(obj),
    headers:{
        'Content-type':'application/json',
    },
    }).then((res)=>{
    if(res.ok){
        console.log(res)
    return res.json();
    }else{
        return res.json().then((data)=>{
            let errormsg="not a valid email";
      
           throw new Error(errormsg);
        });
    }
    }).then((data)=>{
    console.log(data)
    
    })
}
