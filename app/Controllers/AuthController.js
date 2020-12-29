const User = require("../Models/User.model");

class AuthController {
  //[GET] /Auth/login
  login(req, res, next) {
    res.render("auth/login", {
      title: "Đăng Nhập | Nguyễn Tiến Trường",
    });
  }

  //[POST] /Auth/login
  loginPost(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username, password })
      .then((data) => {
        if (data) {
          console.log(data);
          req.session.username_sess = data.username;
          let username_sess = req.session.username_sess;
          res.render("index", {
            title: "Đăng Nhập | Nguyễn Tiến Trường",
            username_sess,
          });
        } else {
          let error = "Tài khoản hoặc mật khẩu không chính xác.";
          res.render("auth/login", { error, username });
        }
      })
      .catch((err) => {
        res.status(500).json("Có lỗi xảy ra! " + err);
      });
  }

  //[GET] /Auth/register
  register(req, res, next) {
    res.render("auth/register", { title: "Đăng Ký | Nguyễn Tiến Trường" });
  }

  //[POST] /Auth/register
  registerPost(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;

    let data = {
      user: req.body,
      error: {
        username: null,
        passConfirm: null,
      },
    };
    if (password !== passwordConfirm) {
      data.error.passConfirm = "Hai mật khẩu phải giống nhau.";
      res.render("auth/register", {
        title: "Đăng Ký | Nguyễn Tiến Trường",
        data,
      });
      return;
    }

    User.findOne({ username }).then((user) => {
      if (user) {
        data.error.username = "Username đã tồn tại.";
        res.render("auth/register", {
          title: "Đăng Ký | Nguyễn Tiến Trường",
          data,
        });
        return;
      } else {
        let user = new User(req.body);
        user.save().then(() => {
          res.render("auth/success", { title: "Thành Công", username, email });
        });
      }
    });
  }

  //[GET] /Auth/logout
  logout(req, res, next) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = new AuthController();
