import React, {useState} from 'react'

const Pagination = ({ count , paginat  }) => {

  //useState to set the state of the Pagination component inorder to set the current page
const [ currpage , setCurrPage ] = useState(1);

let pageToSee = [];
 for ( let i = 1  ; i <= count  ; i++)
  {
    pageToSee.push(i);
  }
 

// callback used to  set the page and send this back to the parentcompent in order to set the page in the parent component
  const pagination =((pages)=>{
    if ( pages < 1 || pages > count) return;
      setCurrPage(pages)
      paginat(pages);
  })

  return (
    <div>
        <button onClick = {()=>pagination(currpage-1)}>back</button>
        {
          pageToSee.map((item ,ind)=>{
           return <> <button onClick = {()=>pagination(item)}  style={{backgroundColor:'lightgreen'}} key={item}>{item}</button></>
           })
        }
        <button onClick = {()=>pagination(currpage + 1)} style={{marginLeft:'3px'}}>next</button>
    </div> 
  )
}

export default Pagination

