const { UserSchema } = require("../models/userModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { RolSchema } = require("../models/rolModel.js");
const { CourseSchema } = require("../models/courseModel.js");
const { UserCourseSchema } = require("../models/userCourseModel.js");
const { BookSchema } = require("../models/bookModel.js");
const { LessonSchema } = require("../models/lessonModel.js");

//Person associations
PersonSchema.hasOne(UserSchema, {
  foreignKey: {
    field: "usu_persona_id",
  },
});
UserSchema.belongsTo(PersonSchema);

RolSchema.hasOne(UserSchema, {
  foreignKey: {
    field: "usu_rol_id",
  },
});
UserSchema.belongsTo(RolSchema);

UserSchema.belongsToMany(CourseSchema, {
  through: UserCourseSchema,
  foreignKey: "curso_id",
});
CourseSchema.belongsToMany(UserSchema, {
  through: UserCourseSchema,
  foreignKey: "usuario_id",
});
UserSchema.hasMany(UserCourseSchema, {
  foreignKey: {
    field: "usuario_id",
  },
});
UserCourseSchema.belongsTo(UserSchema);

CourseSchema.hasMany(UserCourseSchema, {
  foreignKey: {
    field: "curso_id",
  },
});
UserCourseSchema.belongsTo(CourseSchema);

// Course associations

BookSchema.hasOne(CourseSchema, {
  foreignKey: {
    field: "cur_libro_id",
  },
});
CourseSchema.belongsTo(BookSchema);

BookSchema.hasMany(LessonSchema, {
  foreignKey: {
    field: "lec_libro_id",
  },
});

LessonSchema.belongsTo(BookSchema);
