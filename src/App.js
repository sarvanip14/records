import React, { Component } from "react";
import axios from "axios";

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      console.log("API Response:", response.data); // Debug output
      this.setState({
        users: response.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: "Error fetching data",
        isLoading: false,
      });
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { users, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    // Check if users is an array before using map
    if (!Array.isArray(users)) {
      return <div>No user data available</div>;
    }

    return (
      <div>
        <h1>User Records</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
