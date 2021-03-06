import LogoImage from "../images/home.jpg";
import Axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
var dateFormat = require('dateformat');

var sectionStyle = {
    backgroundImage: `url(${LogoImage})`,
    width: 1349,
}
const formvalid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    return valid;
}

export default class Browser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formErrors: {
                event_name: "",
                event_details: "",
                event_type: "",
                location: ""
            },
            events: [],
            eventList: null,
            locations: []
        };
    }

    handleErrors = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;
        console.log(name, value)
        switch (name) {
            case "event_name":
                formErrors.event_name = value.length < 3 ? "Must be atleast 3 characters long" : "";
                break;
            case "event_details":
                formErrors.event_details = value.length < 10 ? "Must be atleast 10 characters long" : "";
                break;
            case "event_type":
                formErrors.event_type = value.length < 2 ? "Must be atleast 2 characters long" : "";
                break;
            case "location":
                formErrors.location = value.length < 3 ? "Must be atleast 3 characters long" : "";
                break;
            case "id":
                console.log(value);
                this.setState({ num: value });
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
    }

    getEvents() {
        Axios.get('http://localhost:3001/events?_sort=start_time')
            .then(result => {
                const EventList = result.data;
                this.setState({ events: EventList });
                this.setState({ locations: EventList })
                console.log(this.state.events);
            })
            .catch(error => console.log('there is some error in retrieving... the error.', error))
    }

    addEvent = (event) => {
        event.preventDefault();
        if (formvalid(this.state.formErrors)) {
            console.log('valid form')
            const newEvent = {
                event_name: this.state.event_name,
                event_details: this.state.event_details,
                event_type: this.state.event_type,
                location: this.state.location,
                start_time: this.state.start_time,
                end_time: this.state.end_time
            };
            Axios.post('http://localhost:3001/events/', newEvent)
                .then(result => {
                    console.log('the event has been added...')
                    window.location.reload();
                    
                })
                .catch(error => console.log('there is some error while adding the event: ', error))
        } else {
            console.log('form Invalid');
        }
    }


    deleteEvent(id) {
        Axios.delete('http://localhost:3001/events/' + id)
            .then(result => {
                console.log('event deleted successfully...');
                this.props.history.push('/browse');
                window.location.reload(false);
            })
            .catch(error => console.log('there is some error in deleting... the error.', error))
    }


    handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        if (this.state.eventList) {
            Axios.get('http://localhost:3001/events?_sort=start_time&location=' + this.state.eventList + '&q=' + event.target.value)
                .then(result => {
                    const EventList = result.data;
                    this.setState({ events: EventList });
                    console.log(this.state.events);
                })
                .catch(error => console.log(error))
        } else {
            Axios.get('http://localhost:3001/events?_sort=start_time&q=' + event.target.value)
                .then(result => {
                    const EventList = result.data;
                    this.setState({ events: EventList });
                    console.log(this.state.events);
                })
                .catch(error => console.log(error))
        }
    }

    componentDidMount() {
        this.getEvents();
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div style={sectionStyle}>
            <div className="container">
                <div className="row">
                    <div className="pricing-header pt-md-6 pb-md-6 mx-auto text-center text-white" >
                        <h1 className="display-3">Welcome to FindMeEvent</h1>
                        <p className="lead">Here you can look up the events in a particular region and add Events. Browse the events using the keywords.</p>
                    </div>
                    <div className="col-sm-12 mb-3">
                        <div className='row'>&nbsp;&nbsp;&nbsp;
                        <select required className="form-control col-sm-2" placeholder="Available Plans"
                                onChange={(e) => { this.setState({ eventList: e.target.value }) }}
                                onClick={this.handleChange}>
                                <option defaultValue > </option>
                                {Array.from(new Set(this.state.locations.map(value => value.location))).map((location,index) => {
                                    return <option value={location} key={index}>{location}</option>
                                })}
                            </select>&nbsp;&nbsp;&nbsp;
                        <input type="text" id="myFilter" className="form-control col-sm-8" onChange={this.handleChange}
                                placeholder="Search for keyword.." /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-primary" data-toggle="modal"
                                data-target="#exampleModal" data-whatever="@getbootstrap" >Add an Event</button></div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1"
                            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add an Event</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.addEvent}>
                                            <div className='form-group'>
                                                <label>Event Name</label>
                                                <input required type="text"
                                                    className={`form-control ${formErrors.event_name.length > 0 ? 'is-invalid' : null}`}
                                                    name="event_name"
                                                    onChange={this.handleErrors} />
                                                {formErrors.event_name.length > 0 && <span className='error text-danger'>{formErrors.event_name}</span>}
                                            </div>
                                            <div className='form-group'>
                                                <label>Event Details</label>
                                                <textarea required type="text"
                                                    className={`form-control ${formErrors.event_details.length > 0 ? 'is-invalid' : null}`}
                                                    name="event_details"
                                                    onChange={this.handleErrors} />
                                                {formErrors.event_details.length > 0 && <span className='error text-danger'>{formErrors.event_details}</span>}
                                            </div>
                                            <div className='form-group'>
                                                <label>Event Type</label>
                                                <input required type="text"
                                                    className={`form-control ${formErrors.event_type.length > 0 ? 'is-invalid' : null}`}
                                                    name="event_type"
                                                    onChange={this.handleErrors} />
                                                {formErrors.event_type.length > 0 && <span className='error text-danger'>{formErrors.event_type}</span>}
                                            </div>
                                            <div className='form-group'>
                                                <label>Event Location</label>
                                                <input required type="text"
                                                    className={`form-control ${formErrors.location.length > 0 ? 'is-invalid' : null}`}
                                                    name="location"
                                                    onChange={this.handleErrors} />
                                                {formErrors.location.length > 0 && <span className='error text-danger'>{formErrors.location}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <DatePicker
                                                    selected={this.state.start_time}
                                                    onChange={date => this.setState({ start_time: date })}
                                                    dateFormat="dd-MM-yyyy"
                                                    name="start_time"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <DatePicker
                                                    selected={this.state.end_time}
                                                    onChange={date => this.setState({ end_time: date })}
                                                    dateFormat="dd-MM-yyyy"
                                                    name="end_time"
                                                    className="form-control"
                                                />
                                            </div>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;&nbsp;
                                            <button type="submit" className="btn btn-primary" >Submit</button>
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="accordion" id="accordionEvents">
                            {this.state.events.map((listValue, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-header" id={'heading' + index}>
                                            <h5 className='display-4'>{listValue.event_name}</h5>
                                            &nbsp;
                                            <b className='lead'>{listValue.location}</b>
                                            &nbsp; <b>-</b> &nbsp;
                                            <b className='lead'>{listValue.event_type}</b><br />
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                                                seek </button>
                                        </div>


                                        <div id={'collapse' + index} className="collapse" aria-labelledby={"heading" + index} data-parent="#accordionEvents">
                                            <div className="card-body">
                                                <h5 className='lead'><b>Event details</b></h5>
                                                <p className='lead'>{listValue.event_details}</p>
                                                <p className='lead'><b>Location -</b>&nbsp;{listValue.location}</p>
                                                <p className='lead'><b>Start-Date :</b>&nbsp;{dateFormat(listValue.start_time, "fullDate")}</p>
                                                <p className='lead'><b>End-Date :</b>&nbsp;{dateFormat(listValue.end_time, "fullDate")}</p><br /><br />
                                                <Link to={"/edit-event/" + listValue.id} className="btn btn-secondary" >Edit</Link>&nbsp;&nbsp;
                                                <button className="btn btn-danger" onClick={this.deleteEvent.bind(this, listValue.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}

                        </div>
                    </div>

                </div>
            </div>
            </div>
        )
    }
}