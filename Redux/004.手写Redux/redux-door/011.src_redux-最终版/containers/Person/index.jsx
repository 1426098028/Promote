import React, { Component } from "react";
import { connect } from "react-redux";

import { addPerson } from "../../redux/Actions/Person";
class PersonUI extends Component {
  AddPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value * 1;
    name && age && this.props.addPerson({ name, age });
    this.nameNode.value = "";
    this.ageNode.value = "";
  };

  render() {
    const { personarr, count } = this.props;
    return (
      <div>
        <h2>我是Person组件，上方组件求和为{count}</h2>
        <input ref={(e) => (this.nameNode = e)} name="nameNode" />
        <input ref={(e) => (this.ageNode = e)} name="ageNode" />
        <button onClick={this.AddPerson}>添加</button>
        <ul>
          {personarr.map((item) => (
            <li key={item.id}>
              名字:{item.name}--年龄：{item.age}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  personarr: state.persons,
  count: state.count,
});
const mapDispatchToProps = { addPerson };
export default connect(mapStateToProps, mapDispatchToProps)(PersonUI);
