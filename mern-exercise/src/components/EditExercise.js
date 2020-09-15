import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.changeUsername = this.changeUsername.bind(this);
    this.changeDescritpion = this.changeDescritpion.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get("/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });

    axios.get("/exercises/" + this.props.match.params.id).then((res) => {
      this.setState({
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date),
      });
    });
  }
  changeUsername(e) {
    this.setState({ username: e.target.value });
  }
  changeDescritpion(e) {
    this.setState({ description: e.target.value });
  }
  changeDuration(e) {
    this.setState({ duration: e.target.value });
  }
  changeDate(date) {
    this.setState({ date: date });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);
    axios
      .post("/exercises/update/" + this.props.match.params.id, exercise)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h1 className="display-4">Edit Exercise</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.changeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.changeDescritpion}
            />
          </div>
          <div className="form-group">
            <label>Duration in minutes:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.changeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>&nbsp;
            <DatePicker selected={this.state.date} onChange={this.changeDate} />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise"
              className="btn btn-dark"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;
