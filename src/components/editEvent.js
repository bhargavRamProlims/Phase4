import Axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { parseISO } from 'date-fns';
import { Link } from "react-router-dom";

const formvalid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    return valid;
}

export default class EditEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event_name: null,
            event_details: null,
            event_type: null,
            location: null,
            start_time: null,
            end_time: null,
            formErrors: {
                event_name: "",
                event_details: "",
                event_type: "",
                location: ""
            }
        };
    }

    handleErrors = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;
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
            default:
                break;
        }
        this.setState({ [name]: value });
    }

    editEvent = (event) => {

        event.preventDefault();
        if (formvalid(this.state.formErrors)) {
            console.log('valid form')
            const newEvent = {
                id: this.props.match.params.id,
                event_name: this.state.event_name,
                event_details: this.state.event_details,
                event_type: this.state.event_type,
                location: this.state.location,
                start_time: this.state.start_time,
                end_time: this.state.end_time
            };
            console.log(this.state.start_time,this.state.end_time)
            Axios.put('http://localhost:3001/events/' + newEvent.id, newEvent)
                .then(result => {
                    console.log('the event has been updated...')
                    this.props.history.push('/browse');
                    window.location.reload();
                })
                .catch(error => console.log('there is some error while updating the event: ', error))
        } else {
            console.log('form Invalid');
        }
    }

    getEvent() {
        Axios.get('http://localhost:3001/events/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    event_name: result.data.event_name,
                    event_details: result.data.event_details,
                    event_type: result.data.event_type,
                    location: result.data.location,
                    start_time: parseISO(result.data.start_time),
                    end_time: parseISO(result.data.end_time),
                    formErrors: {
                        event_name: "",
                        event_details: "",
                        event_type: "",
                        location: ""
                    }
                });
            })
            .catch(error => console.log('there is some error in retrieving... the error.', error))
    }

    componentDidMount() {
        this.getEvent();
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div className="container">
                <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.event_name}
                        </h3>
                        <br />
                    </div>
                <form onSubmit={this.editEvent}>
                    <div className='form-group'>
                        <label>Event Name</label>
                        <input required type="text"
                            className={`form-control ${formErrors.event_name.length > 0 ? 'is-invalid' : null}`}
                            name="event_name"
                            value={this.state.event_name || ''}
                            onChange={this.handleErrors} />
                        {formErrors.event_name.length > 0 && <span className='error text-danger'>{formErrors.event_name}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Event Details</label>
                        <textarea required type="text"
                            className={`form-control ${formErrors.event_details.length > 0 ? 'is-invalid' : null}`}
                            name="event_details"
                            value={this.state.event_details || ''}
                            onChange={this.handleErrors} />
                        {formErrors.event_details.length > 0 && <span className='error text-danger'>{formErrors.event_details}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Event Type</label>
                        <input required type="text"
                            className={`form-control ${formErrors.event_type.length > 0 ? 'is-invalid' : null}`}
                            name="event_type"
                            value={this.state.event_type || ''}
                            onChange={this.handleErrors} />
                        {formErrors.event_type.length > 0 && <span className='error text-danger'>{formErrors.event_type}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Event Location</label>
                        <input required type="text"
                            className={`form-control ${formErrors.location.length > 0 ? 'is-invalid' : null}`}
                            name="location"
                            value={this.state.location || ''}
                            onChange={this.handleErrors} />
                        {formErrors.location.length > 0 && <span className='error text-danger'>{formErrors.location}</span>}
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>&nbsp;&nbsp;&nbsp;
                        <DatePicker required
                            selected={this.state.start_time}
                            onChange={date => this.setState({ start_time: date })}
                            dateFormat="dd/MM/yyyy"
                            name="start_time"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <DatePicker required
                            selected={this.state.end_time}
                            onChange={date => this.setState({ end_time: date })}
                            dateFormat="dd/MM/yyyy"
                            name="end_time"
                            className="form-control"
                        />
                    </div>
                    <Link to="/browse" type="button" className="btn btn-secondary" data-dismiss="modal">Close</Link>&nbsp;&nbsp;&nbsp;
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}