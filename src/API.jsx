import { useGetAdminQuery } from "./services/adminApi";
import { setAdminUser , deleteUser , editUser , selectedCheckBox , deleteAllChecked } from "./features/adminSlice";
import { useSelector, useDispatch  } from "react-redux";
import { useEffect ,useState } from "react";
import { useRef } from 'react';
import useDebounce from './Hooks/Debounced';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import Table from 'react-bootstrap/Table';

const API = () => {
  
   const dispatch = useDispatch() 
    // importing data using usegetAdminQuery custom hook created.
    const { data, error, isLoading } = useGetAdminQuery();    
     
    //accessing the state of adminUser/checked from the slice by using useSelector
      let  adminUser = useSelector((state)=> state.admin.adminUser);
      let checked = useSelector((state)=> state.admin.checked )

        
      const [currentPage, setCurrentPage] = useState(1);
      const [ changedValue , setChangedValue ] = useState('');  
      const [editUserValue , seteditUserValue] = useState(false);
      const [clickedId , setClickedId ] = useState(0);
      const [ itemToSearch , setItemToSearch ] = useState([]);
      const [ selectedBox , setSelectedBox ] = useState([]);
      const [ itemsPerPage ] = useState(10);
      const [allSelected , setAllSelected ] = useState(false);

    //
      const focusPoint = useRef(null);

     
      //deleteALl button will have function to delete all the selected checkbox user's data 
       const deleteAll =()=>{
          dispatch (deleteAllChecked())
          if(allSelected){
           setAllSelected(false);
          }
        } 
 
     // selects all the checkbox for the particular page
        const selectAll = ()=>{
          let stIndex = ( currentPage - 1 ) * 10 ;
          setAllSelected(true) 

          for( let i = stIndex ; i <  (stIndex + 10) && adminUser[i] !== undefined ; i++)
            {
             handleSelectBox(adminUser[i].id);
            }
            console.log('adminuserlengthafteralldeletedd', adminUser.length)
        }
   
      //useEffect hook to save the required data in adminUser when RTK query data is fully fetched initially to prevent unnecessary rerenders 
      useEffect (()=>{
        if(data)
           dispatch(setAdminUser(data));

        const initialSelectedBox = data?.map(item => ({ id: item.id, selected: false }));
          setSelectedBox(initialSelectedBox);
    
      },[data , dispatch]);


     // showall function will again show all the user data 
       const showAll = ()=> {
        setChangedValue('')
        setItemToSearch([])
       }
    

      // Pagination logic for different pages with inde of first and last item of every page and total items to be visible in the particular page
       const indexOfFirstItem = itemsPerPage * (currentPage - 1)  ;
       const indexOfLastItem = currentPage * itemsPerPage;
       const currentItems = (itemToSearch.length > 0 ? itemToSearch : adminUser).slice(indexOfFirstItem, indexOfLastItem);
        
    //function that will set the current page for the pagination component (in the parent(api) component) that will be set in the child(pagination) component 
       const paginate = (pageNumber) => setCurrentPage(pageNumber);


  //function to select the box and changing/toggling the state of each box 
  const handleSelectBox = (id) => {

    setSelectedBox((prevState) => {
      const newState = prevState.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
      //dispatching the newstate by creating the entire newState and not making changes in the previous state to avoid unnecessary renders
      dispatch(selectedCheckBox(newState));
      console.log('select' , selectedBox)
      return newState;
    });
  };  


    //function to search the user data matching with the input with ( mail , name or role ) 
    const searchUser = ()=>{

      const trimmedValue = changedValue.trim().toLowerCase();
      if (trimmedValue.length < 1) return;

      let arrToSearch = adminUser.filter((item)=>{
           
             if( item.name.toLowerCase().startsWith(trimmedValue) || item.email.toLowerCase().startsWith(trimmedValue) || 
             item.role.toLowerCase().startsWith(trimmedValue) )
                  return item;
                          
       })
      
       console.log('arrfound' , arrToSearch);
       setItemToSearch(arrToSearch);
       handleChange('');
      
       focusPoint.current.value = '';
       focusPoint.current.focus()
    }
 
  //useEffect for logging the itemToSearch as well as selectedbOx to confirm whether state is updating correctly or not
    useEffect(() => {
      console.log('itemToSearch updated:', itemToSearch);
      console.log('checkedin',selectedBox )
      handleChange('');
    }, [itemToSearch , selectedBox ]);
  


      // function to delete the adminUser
          const handleDeleteUser = (id)=>{
            console.log('onclik',id)
            dispatch(deleteUser(id))
          }
       
      //function to edit the adminUser
         const handleEditUser = (id )=>{
           seteditUserValue(true);
           setClickedId(id)
          // setChangedValue(user);
          // console.log('id:',id ,'user:',user) 
          
          // setChangedValue('')
        }

      //handleUserInfo function to edit the adminUser
      const handleUserInfo = useDebounce((value) => {
        console.log('val', value);
        let obj = {
          item:{name :value},
          id: clickedId,
        };
        dispatch(editUser(obj));
        setClickedId(0);
        seteditUserValue(false);
      }, 2000);
    

      //debouncing used while searching/wntering  the userdata 
      const handleChange = useDebounce((e) => {
        focusPoint.current.focus();
        setChangedValue(e);
      },1000);

      //consoling error in case data is not fetched through API
      if (isLoading) return <h3>Loading...</h3>;
      if (error) return <p>Error: {error.message}</p>;




  return (  
    <div>
      {/* input box will be conitionally displayed on the basis whether the data should be edited or search button should be present */}
      { (editUserValue)?<>
         <input type='text' placeholder = 'Edit user name' style = {{width : '300px'}}   onChange={(e)=>handleUserInfo(e.target.value)}/>
        </> :
        <div>
       <input className='seached' ref ={focusPoint} type='text' placeholder = 'Search by name, email or role' style = {{width : '800px' , backgroundColor:'lightblue' , color:'black'}} onChange={(e)=>handleChange(e.target.value)}>
        </input> 
           <button onClick = {searchUser}  style={{backgroundColor : 'red'}}>Search</button>
            { itemToSearch.length > 0 ? <button onClick = {showAll}> Show All Users</button>:<></>}
        </div>
      }
         {/* <div style= {{display:'flex' }} > */}
           <Table>
             <thead>
                <tr>
                  {/* <th></th> */}
                  <th>  <input type = 'checkbox' 
                                style={{"color" : 'white' }} 
                                 checked={allSelected ? true : false} 
                                onChange={selectAll}
                               /></th>
                  <th> Name</th>
                  <th> Email </th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
             </thead>
           
         
          {/* //if search array( or some element need to be searched ) is greater than 0 in length 
          // then we will show only the search array else all user' data */}
 
                     <tbody >
                      {
                        currentItems.map((item ,ind)=> {
                          return <>
                          
                        <tr key = {item.id}>
                          <td> <input type = 'checkbox' 
                                style={{"color" : 'white' }} 
                                checked={selectedBox.find(box => box.id === item.id)?.selected || false} 
                                onChange={()=>handleSelectBox(item.id)}
                               />
                         </td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td> 
                          {  
                              (itemToSearch.length > 0)?
                              <>
                              {/* disabling the  delete button when data is to searched */}
                                <button type="button" className="btn btn-outline-primary"  disabled><i className="bi bi-pencil-square"  ></i></button>
                                  <button type="button" className="btn btn-outline-primary"  disabled ><i className="bi bi-trash3" ></i></button>
                                
                              </>:<>  
                                  <button type="button" className="btn btn-outline-primary" onClick={()=>handleEditUser(item.id, item.name)}><i className="bi bi-pencil-square"  ></i></button>
                                  <button type="button" className="btn btn-outline-primary" onClick = {()=>handleDeleteUser(item.id)}><i className="bi bi-trash3" ></i></button>
                                  </>
                          }
                            </td>
                          </tr>
                          </>})
                         } 
                        </tbody> 
                        
                      </Table>
    
<div style ={{display:"flex"}}>
         <button style={{marginRight: '100px' , backgroundColor:'red' }} onClick={deleteAll}>DELETE</button>

        {/* pagination component : paginat will be passed as props that will be be managed by child component to set the current 
        page in the child  component and data will be set in the parent component in the */}

            <Pagination 
            //count will set the total pages that should be available according to the required data
             count={itemToSearch.length > 0 ? Math.ceil((itemToSearch.length)/itemsPerPage) : Math.ceil(adminUser.length/itemsPerPage)} 
             color = "secondary" 
              paginat={paginate}
              itemsPerPage = { itemsPerPage }
              // page={currentPage}
             currentItems = {currentItems}
            />
            
 </div>  
    </div>
  )
}

export default API
