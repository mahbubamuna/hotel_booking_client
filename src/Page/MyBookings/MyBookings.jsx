import { useEffect, useState } from "react";
import Bookings from "./Bookings";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';


const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const { _id, userName, img1, name, number, city, room, date } = bookings;

    const handleDelete = id =>{
        const proceed =
        
        toast.success("Are You Sure to Delete?", {
            position: toast.POSITION.TOP_CENTER
          });
        
        
        
          if(proceed) {
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                        }
                      });  
                   
                      const remaining = bookings?.filter(booking => booking._id != id)
                      setBookings(remaining)
                }
            
            })
        
          }
    }


    // const updateDate = id =>{
    //     fetch(`http://localhost:5000/bookings/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify({date : date})
    //     })
    //     .then(res => res.json())
    //     .then(data =>{
    //         console.log(data)
    //         if(data.modifiedCount > 0){
    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'Update Successfully',
    //                 icon: 'success',
    //                 confirmButtonText: 'Cool'
    //             })
    //         }
    //     })
    // }


    const url = 'http://localhost:5000/bookings';

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [])
    return (
        <div className="px-10 my-20">
            <h2 className="text-3xl lg:text-4xl text-green-800 text-center my-8">Your booked room: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Room Name</th>
                            <th>City</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map(booking => <Bookings 
                            key={booking._id}
                            booking={booking}
                            handleDelete={handleDelete}
                            
                            >
                            </Bookings>)
                        }
                        
                       
                        
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyBookings;