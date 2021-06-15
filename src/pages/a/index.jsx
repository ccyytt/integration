import React, {useEffect} from "react";
import { connect } from "react-redux";
const Page = (props) => {
    useEffect(()=> {
        props.dispatch({type: 'reduce/getType'})
    },[])
    console.log(props)
  return <div>121</div>;
};

export default connect((state) => ({ ...state }))(Page);
