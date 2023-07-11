class UI {
  showAlert(message, className) {
    const section = document.querySelector("#section");
    const alertDiv = document.createElement("div");
    alertDiv.classList = `p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 ${className}`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `<span class="font-medium">Info:</span> ${message}`;

    section.parentNode.insertBefore(alertDiv, section);

    setTimeout(function () {
      alertDiv.remove();
    }, 3000);
  }
}

class StorageUser {
  static getUsersFromLocalStorage() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }

  static addUsertoLocalStorage(user) {
    const users = StorageUser.getUsersFromLocalStorage();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

const form = document.querySelector("form");
// console.log(form.id);

if (form.id === "signup-form") {
  // sign in

  document
    .querySelector("#signup-form")
    .addEventListener("submit", function (e) {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const confirmPassword = document.querySelector("#confirm-password").value;

      const ui = new UI();

      let existedUsers = StorageUser.getUsersFromLocalStorage();

      const newUser = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      let isUserExist = false;

      existedUsers.forEach((user) => {
        if (
          user.email === newUser.email &&
          user.password === newUser.password
        ) {
          isUserExist = true;
          console.log(user.email, newUser.email);
        }
      });

      var decimal = /\d/;
      var containsUppercase = /[A-Z]/;

      if (isUserExist === true) {
        ui.showAlert(
          "You alredy have account. Go to Login page",
          "dark:text-blue-400"
        );
      } else if (
        containsUppercase.test(password) === false &&
        decimal.test(password) === false
      ) {
        ui.showAlert(
          "Password need to contains minimum one number and uppercase letter.",
          "dark:text-red-400"
        );
      } else if (password === confirmPassword) {
        ui.showAlert("you are successfully sigh in", "dark:text-green-400");
        StorageUser.addUsertoLocalStorage(newUser);
      } else {
        ui.showAlert("Password is do not match", "dark:text-red-400");
      }

      e.preventDefault();
    });
} else {
  // log in
  document
    .querySelector("#login-form")
    .addEventListener("submit", function (e) {
      const email = document.querySelector("#login-email").value;
      const password = document.querySelector("#login-password").value;

      const ui = new UI();

      let existedUsers = StorageUser.getUsersFromLocalStorage();

      let isUserExist = false;

      existedUsers.forEach((user) => {
        if (user.email === email && user.password === password) {
          isUserExist = true;
        }
      });

      if (isUserExist) {
        ui.showAlert("You are IN!", "dark:text-yellow-400");
      } else {
        ui.showAlert(
          "If you don't have account, go to login page.",
          "dark:text-blue-400"
        );
      }

      e.preventDefault();
    });
}
