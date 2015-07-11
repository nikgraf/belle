const belleWithClassicFocus = {

  config: {
    button: {
      preventFocusStyleForTouchAndClick: false
    },
    rating: {
      preventFocusStyleForTouchAndClick: false
    },
    toggle: {
      preventFocusStyleForTouchAndClick: false
    }
  },

  style: {
    button: {
      focusStyle: {
        boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
        outline: 0
      },
      primaryFocusStyle: {
        boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
        outline: 0
      }
    },
    rating: {
      focusStyle: {
        boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
        outline: 0,
        borderRadius: 3
      }
    },
    toggle: {
      focusStyle: {
        boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
        outline: 0
      }
    }
  }

};

export default belleWithClassicFocus;
