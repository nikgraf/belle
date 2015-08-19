const datePickerConfig = {

  preventFocusStyleForTouchAndClick: true,

  localeData: {
    'en-GB': {
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      firstDay: 1,
      isRTL: false
    },
    'ar': {
      monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
      firstDay: 0,
      isRTL: true
    },
    'fr': {
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      firstDay: 1,
      isRTL: false
    }
  }

};

export default datePickerConfig;
