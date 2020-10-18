import React, { Component } from "react";

export default class Support extends Component {
    render() {
        return (
            <div>
                <h3 className="display-4">Support</h3>
                <br />
                <dl className="row">
                    <dt className="col-sm-3 lead"><b>FindMeApp</b></dt>
                    <dd className="col-sm-9 lead">This app can be utilized to add, delete and edit events.
                    the region filter can be used to get the events from the Selected regions.
                    The data is already sorted in ascending order of Event Start dates.
                     </dd>

                    <dt className="col-sm-3 lead"><b>Author</b></dt>
                    <dd className="col-sm-9 lead">Bhargav Ram</dd>

                    <dt className="col-sm-3 lead "><b>Source Code</b></dt>
                    <dd className="col-sm-9 lead "><a className="text-dark" href="https://github.com/bhargavRamProlims/Phase4">FindMeApp</a></dd>

                </dl>
            </div>
        )
    }
}