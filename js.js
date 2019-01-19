const cardNumber = document.querySelector('#cardNumber');
const cvv = document.querySelector('#cvv');
const expDate = document.querySelector('#expDate');
const mail = document.querySelector('#mail');
const checkbox = document.querySelector('#checkbox');
const mailBox = document.querySelector('.mail__box');
const form = document.querySelector('.payment__form');
const loader = document.querySelector('.loader');
const validateInput = {
  validateCardNumber: function(){
    let cardData = this.value.replace(/[^\d]/g, '').substring(0, 16);
    this.value = cardData != '' ? cardData.match(/.{1,4}/g).join(' ') : '';
    trackInputLength.call(this);
  },
  validateCvvData: function(){
    let cvvData = this.value.replace(/[^\d]/g, '').substring(0,3);
    this.value = cvvData;
    trackInputLength.call(this);
  },
  validateExpDate: function(){
    let expDate = this.value.replace(/[^\d]/g, '').substring(0,4);
    this.value = expDate != '' ? expDate.match(/.{1,2}/g).join('/') : '';
    trackInputLength.call(this);
  },
  validateMail: function(){
    let regExp = (/^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{2,})+$/);
    regExp.test(this.value) ? this.classList.remove('invalid') : this.classList.add('invalid');
  }
};

cardNumber.addEventListener('input', function() {validateInput.validateCardNumber.call(this)});
cvv.addEventListener('input', function() {validateInput.validateCvvData.call(this)});
expDate.addEventListener('input', function() {validateInput.validateExpDate.call(this)});
mail.addEventListener('input', function() {validateInput.validateMail.call(this)});

function trackInputLength(){
  let that = this;
  let success = () => {
    this.classList.remove('invalid');
  };
  let fail = () => {
    this.classList.add('invalid');
  };
  let length = function() {
    //Here I track whether each field has enough symbols
    if (that.id == 'cardNumber') {
      return 19;
    }
    if (that.id == 'cvv') {
      return 3;
    }
    if (that.id == 'expDate') {
      return 5;
    }
  };
  //Depending on results I attach or remove `invalid` class
  (this.value.length >= length()) ? success() : fail();
}

checkbox.addEventListener('click', () => {
  //With this function I either add or exclude `mail field` from validation on Submit form
  checkbox.checked ? mailBox.classList.add('form-group') : mailBox.classList.remove('form-group')
});


form.addEventListener('submit', function(e) {
  const inputs = document.querySelectorAll('.form-group .payment__input');
  let formValid = true;
  e.preventDefault();
  inputs.forEach((item)=>{
    if(!item.value){
      item.classList.add('invalid');
    }
  });
  inputs.forEach((item)=>{
    if(item.classList.contains('invalid')){
      formValid = false;
    }
  });
  if(formValid){
    renderValidCard();
  }
});

function renderValidCard(){
  const inputs = document.querySelectorAll('.form-group .payment__input');
  loader.classList.add('visible');
  form.classList.add('blur');
  setTimeout(()=>{
    loader.classList.remove('visible');
    setTimeout(()=>{
      inputs.forEach((item)=>{item.value = ''});
      form.classList.remove('blur');
      alert('success');
    }, 100);
  },2000)
}

//Thank you for your time and consideration


