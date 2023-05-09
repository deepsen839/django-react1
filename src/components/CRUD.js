import axios from 'axios';
import { useState, useEffect,useContext} from "react";
import AuthContext from "../context/AuthContext";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Button, Form } from "react-bootstrap";
const CRUD = ({ onAdd }) => {
    const {user,authTokens} = useContext(AuthContext);

   
    const [event_name, setEventName] = useState("");
    const [data, setData] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState();
    const [eventId,SetEventId] = useState("");
    const [events, setEvents] = useState([]);
    const [user_events,setUserEvents] =  useState([]);
    if (authTokens){
    axios.defaults.headers = {
      Authorization: 'Bearer ' + authTokens.access
    };
  }
    useEffect(() => {
        refreshEvents();
        if (user){
          getUserEvents();
        }
        
    }, []);
  
    const refreshEvents = () => {
        axios.get("http://localhost:8000/events/")
        .then((res) => {
          setEvents(res.data);
          // setName(res[0].name)
          // setGenre(res[0].genre)
          // setStarring(res[0].starring)
          // setMovieId(res[0].id)
        })
        .catch(console.error);
    };
  
    const getUserEvents = () => {
      axios.get(`http://localhost:8000/events/get-user-events/${user.user_id}/`)
      .then((res) => {
        setUserEvents(res.data);
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setMovieId(res[0].id)
      })
      .catch(console.error);
  };


    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("event_name",event_name);
      formData.append("data",data);
      formData.append("image",image);
      formData.append("location",location);
      formData.append("events_liked","0");
      formData.append("created_by",user.user_id);
    //   let item = { event_name, data, location,image };
      axios.post("http://localhost:8000/events/post-item/", formData).then(() => {refreshEvents();getUserEvents();}).catch(console.error);
    };
  
    const onUpdate = (id) => {
     //let item = { event_name, data, location,image };
        const formData = new FormData();
        formData.append("event_name",event_name);
        formData.append("data",data);
        formData.append("image",image);
        formData.append("location",location);
        formData.append("events_liked","0");
        formData.append("created_by",user.user_id);
      axios.patch(`http://localhost:8000/events/update-item/${id}/`, formData,{headers : {
        Authorization: 'Bearer ' + authTokens.access
      }}).then((res) => {refreshEvents();getUserEvents();}).catch(console.error);
    };
  const UpdateLike = (id) =>{

    const formData = new FormData();
    formData.append("user_id",user.user_id);
    formData.append("event_id",id);
    formData.append("events_liked","1");
    axios.post(`http://localhost:8000/events/event-liked/`, formData).then((res) => refreshEvents());
  }



    // const onDelete = (id) => {
    //   API.delete(`/${id}/`).then((res) => refreshMovies());
    // };
  
    function selectEvents(id) {
      let item = events.filter((event) => event.id === id)[0];
      setEventName(item.event_name);
      setData(item.data);
      setLocation(item.location);
      setImage(item.image);
      SetEventId(item.id)

    }
  
    return (
      <div className="container mt-5">
        <div className="row">
        {user?(
          <div className="col-md-4">
            <h3 className="float-left">Create a new Event</h3>
            <Form onSubmit={onSubmit} className="mt-4">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>{eventId} Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Event Name"
                  value={event_name}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicGenre">
                <Form.Label>Event Data</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicStarring">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

             <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Event Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
             
        
              <div className="float-right">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  className="mx-2"
                >
                  Save
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => onUpdate(eventId)}
                  className="mx-2"
                >
                  Update
                </Button>
              </div>
          
            </Form>
          </div>
        ):null}   
        <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="All Events">
          <div className="col-md-8 m">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Events Name</th>
                  <th scope="col">Data</th>
                  <th scope="col">Time</th>
                  <th scope="col">Location</th>
                  <th scope="col">Image</th>
                  <th>Like</th>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => {
                  return (
                    <tr key="">
                      <th scope="row">{events.id}</th>
                      <td> {event.event_name}</td>
                      <td>{event.data}</td>
                      <td>{event.time}</td>
                      <td>{event.location}</td>
                      <td><img src = {"http://localhost:8000"+event.image} style={{ width: 100, height: 100 }} alt="React Logo"/></td>
                      <td>

                      {user?(

                        <a 
                          className="fa fa-pencil-square text-primary d-inline"
                          aria-hidden="true"
                          onClick={() => selectEvents(event.id)}
                          href="#">update</a>
                          ):null}
                           {user?(
                        <a 
                          className="fa fa-trash-o text-danger d-inline mx-3"
                          aria-hidden="true"
                         
                          href="#">delete</a>
                          ):null}
 {user?(
                            <a 
                            className="fa fa-trash-o text-danger d-inline mx-3"
                            aria-hidden="true"
                            onClick={()=>UpdateLike(event.id)}
                            href="javascript:void(0);">Like</a>
                            ):null}

                  
                      
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </Tab>

          {user?(
<Tab eventKey="Userevents" title="UserEvents">
      <div className="col-md-8 m">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Events Name</th>
              <th scope="col">Data</th>
              <th scope="col">Time</th>
              <th scope="col">Location</th>
              <th scope="col">Image</th>
              <th>Like</th>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {user_events.map((event, index) => {
              return (
                <tr key="">
                  <th scope="row">{events.id}</th>
                  <td> {event.event_name}</td>
                  <td>{event.data}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td><img src = {"http://localhost:8000"+event.image} style={{ width: 100, height: 100 }} alt="React Logo"/></td>
                  <td>
                    <a 
                      className="fa fa-pencil-square text-primary d-inline"
                      aria-hidden="true"
                      onClick={() => selectEvents(event.id)}
                      href="#">update</a>
                    <a 
                      className="fa fa-trash-o text-danger d-inline mx-3"
                      aria-hidden="true"
                     
                      href="#">delete</a>
                      <a 
                      className="fa fa-trash-o text-danger d-inline mx-3"
                      aria-hidden="true"
                     onClick={()=>UpdateLike(event.id)}
                      href="javascript:void(0);">Like</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </Tab>
          ):null}
</Tabs>




        </div>
      </div>
    );
  };
  
  export default CRUD;
