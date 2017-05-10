// the parent
var MyContainer = React.createClass({
  getInitialState: function() {
    return { checked: false };
  },
  onChildChanged: function(newState) {
    this.setState({ checked: newState });
  },
  render: function() {
    return (
      <div>
        <ToggleButton callbackParent={this.onChildChanged} />
      </div>
    );
  }
});
// the child
var ToggleButton = React.createClass({
  onTextChanged: function() {
    this.props.callbackParent(newState);
  },
  render: function() {
    return (
        <input type="checkbox" onChange={this.onTextChanged} />
    );
  }
});
