import React from 'react';
const style = {
    border: "2px solid red"
}
const withBorder = (WrappedComponent) => {
    return class extends React.Component {
        state = {};

        render () {
            return (
                <div style={style}>
                     <WrappedComponent  {...this.props}  />
                </div>
            );
        }
    }
}
export default withBorder;