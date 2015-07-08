const ViewportMixin = {

  componentWillMount() {
    this.setState({
        viewport: this._retrieve_viewport()
    });
    window.addEventListener('resize', this._resize_mixin_callback);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize_mixin_callback);
  },

  _resize_mixin_callback() {
    this.setState({
        viewport: this._retrieve_viewport()
    });
  },

  _retrieve_viewport() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
};

export default ViewportMixin;
