import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

class Exercises extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios.get("/exercises").then((res) => {
      this.setState({
        exercises: res.data,
      });
    });
  }

  deleteExercise(id) {
    axios.delete(`/exercises/${id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  listExercises() {
    return this.state.exercises.map((ex) => {
      return (
        <Exercise
          exercise={ex}
          deleteExercise={this.deleteExercise}
          key={ex._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1 className="display-4">Exercise Log</h1>
        <table className="table">
          <thead className="thead-dark">
            {
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Date</th>
                <th scope="col">Options</th>
              </tr>
            }
          </thead>
          <tbody>{this.listExercises()}</tbody>
        </table>
      </div>
    );
  }
}

export default Exercises;
