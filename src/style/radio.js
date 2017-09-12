const radioStyle = {
    
  style: {
    display: 'inline-block',
    cursor: 'pointer',
    position: 'relative'
  },

  wrapperRadioStyle: {
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    verticalAlign: 'middle',
    marginRight: 5,
    lineHeight: 1,
    width: 12,
    height: 12,
    border: '1px solid rgba(205, 205, 205, 0.8)',
    borderRadius: '50%',
    /* animations */
    transition: 'border 0.1s',
    transitionTimingFunction: 'ease-in-out',
  },

  inputDefaultStyle: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    cursor: 'pointer',
    opacity: 0,
    top: 0,
    bottom: 0,
    right: 0
  },

  inputStyle: {
    width: 6,
    height: 6,
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    display: 'inline-block',
    verticalAlign: 'middle',
    /* animations */
    transition: 'background 0.1s',
    transitionTimingFunction: 'ease-in-out',
  },

  textStyle: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },

  wrapperCheckedRadioStyle: {
    borderColor: 'rgba(43, 206, 56, 0.8)',
  },

  inputStyleChecked: {
    backgroundColor: 'rgba(43, 206, 56, 0.8)',
  }

};
  
export default radioStyle;
  