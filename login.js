import { readUser, readAdmin } from "./firebaseLogin.js";

document.querySelector('.login-s-btn')
  .addEventListener(('click'), async () => {
    let crn = document.querySelector('.js-login-s-crn');
    let password = document.querySelector('.js-login-s-password');
    let getUser = await readUser(crn.value);


    if (getUser.crn == crn.value && getUser.password == password.value) {
      let data = sessionStorage.setItem("getUser", JSON.stringify(getUser));
      window.location.href = 'Student%20Side/Student-forum.html';
    }
    else {
      alert('login unsuccess');
    }
  });
document.body.addEventListener(('keydown'), async (event) => {
  if (event.key === 'Enter') {
    let crn = document.querySelector('.js-login-s-crn');
    let password = document.querySelector('.js-login-s-password');
    let getUser = await readUser(crn.value);


    if (getUser.crn == crn.value && getUser.password == password.value) {
      let data = sessionStorage.setItem("getUser", JSON.stringify(getUser));
      window.location.href = 'Student%20Side/Student-forum.html';
    }
    else {
      alert('login unsuccess');
    }
  }
});

document.querySelector('.login-a-btn')
  .addEventListener('click', async () => {
    let mail = document.querySelector('.js-login-a-mail');
    let password = document.querySelector('.js-login-a-password');
    let getAdmin = await readAdmin(mail.value);
    // console.log(getAdmin.authority);

    if (getAdmin.email === mail.value && getAdmin.password === password.value) {
      let data = sessionStorage.setItem("getAdmin", JSON.stringify(getAdmin));
      if (getAdmin.authority === 'FeedbackForum') {
        window.location.href = '../Admin%20Side/admin-login-page.html';
      }
      else {
        window.location.href = '../Admin%20Side/authority-page.html';
        
      }
    }
    else {
      alert('login unsuccess');
    }
  });

  document.body.addEventListener(('keydown'), async (event) => {
    if (event.key === 'Enter') {
      let mail = document.querySelector('.js-login-a-mail');
      let password = document.querySelector('.js-login-a-password');
      let getAdmin = await readAdmin(mail.value);


      if (getAdmin.email == mail.value && getAdmin.password == password.value) {
        let data = sessionStorage.setItem("getAdmin", JSON.stringify(getAdmin));
        if (getAdmin.authority == 'feedbackforum') {
          window.location.href = 'Admin%20Side/admin-login-page.html';
        }
        else {
          window.location.href = 'Admin%20Side/authority-page.html';
        }

      }
      else {
        alert('login unsuccess');
      }
    }
  });


