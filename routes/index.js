const authRoute = require("./auth/auth.route");
const siteRoute = require("./site.route");
const courseRoute = require("./course/course.route");
const trainerRoute = require("./trainer/trainer.route");
const projectsRoute = require("./projects/projects.route");
const postsRoute = require("./posts/posts.route");
const publicCourse = require("./course/publicCourse.route");
const publicBlog = require("./blog/publicBlog.route");

function initRoutes(app) {
  app.use("/Public", publicCourse,publicBlog);
  app.use("/Auth", authRoute);
  app.use("/Me/course", courseRoute);
  app.use("/Admin/trainer", trainerRoute);
  app.use("/Admin/posts", postsRoute);
  app.use("/Admin/projects", projectsRoute);
  app.use("/", siteRoute);
}

module.exports = initRoutes;
