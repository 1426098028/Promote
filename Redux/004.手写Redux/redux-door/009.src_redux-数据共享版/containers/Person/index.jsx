import React, { Component } from "react";
import { connect } from "react-redux";

import { createAddPersonAction } from "../../redux/Actions/Person";
class PersonUI extends Component {
  AddPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    name && age && this.props.AddPerson({ name, age });
    this.nameNode.value = "";
    this.ageNode.value = "";
  };

  render() {
    const { list, he } = this.props;
    return (
      <div>
        <h2>我是Person组件，上方组件求和为{he}</h2>
        <input ref={(e) => (this.nameNode = e)} name="nameNode" />
        <input ref={(e) => (this.ageNode = e)} name="ageNode" />
        <button onClick={this.AddPerson}>添加</button>
        <ul>
          {list.map((item) => (
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
const mapDispatchToProps = {
  AddPerson: createAddPersonAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonUI);
