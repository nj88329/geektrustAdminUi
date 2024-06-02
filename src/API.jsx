

import useFetch from './FetchApiData.jsx';


const API = () => {
  
    
    // importing data using useFetch custom created.
    const { data, error } = useFetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    

      //consoling error in case data is not fetched through API
        if( error ){
            console.log('re', error)
             return <p>Error:{error}</p>
        }

  return (
    <div>
         <input type='text' placeholder = 'Search by name, email or role' style = {{width : '800px'}}/>
         
         <div style= {{display:'flex'  , margin: '15px'}} >
            <h4 style= {{margin : '25px'}}></h4>
            <h4 style= {{margin : '25px'}}>Name</h4>
            <h4 style= {{margin : '25px'}}>Email</h4>
            <h4 style= {{margin : '25px'}}> Role</h4>
            <h4 style= {{margin : '25px'}}>Actions</h4>
            </div>
        
         {
          data &&  data.map((item ,ind)=> 
             <div style= {{display:'flex'  , margin: '15px'}}  key= {ind}>
                    <h6 style= {{margin : '25px'}}><i className="bi bi-square"></i></h6>
                    <h6 style= {{margin : '25px'}}>{item.name}</h6>
                    <h6 style= {{margin : '25px'}}>{item.email}</h6>
                    <h6 style= {{margin : '25px'}}> {item.role}</h6>
                    <h6 style= {{margin : '25px'}}>
                    {/* <Button> </Button>
                    <Button><i className="bi bi-trash3"></i></Button> */}
                      <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil-square"></i></button>
                      <button type="button" className="btn btn-outline-primary"><i className="bi bi-trash3"></i></button>
                    </h6>
                       
             </div>
)
         }
    </div>
  )
}

export default API
