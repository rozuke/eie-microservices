const { QuestionSchema } = require("./questionModel.js");
const { AttachedSchema } = require("./attachedModel.js");
const { LabelSchema } = require("./labelModel.js");
const { QuestionTypeSchema } = require("./questionTypeModel.js");
const { BookSchema } = require("./bookModel.js");
const { LabelTypeSchema } = require("./labelTypeModel.js");
const { CommentSchema } = require("./commentModel.js");
const { ForumActivitySchema } = require("./forumActivityModel.js");
const { CourseSchema } = require("./courseModel.js");
const { LessonSchema } = require("./lessonModel.js");
const { ParticipationSchema } = require("./participationModel.js");
const { UserSchema } = require("./userModel.js");
const { UserCourseSchema } = require("./userCourseModel.js");
const { ResultSchema } = require("./resultModel.js");
const { PersonSchema } = require("./personModel.js");
const { ActivityTypeSchema } = require("./activityTypeModel.js");

// Question asociations
QuestionTypeSchema.hasOne(QuestionSchema, {
  foreignKey: {
    field: "pre_tipo_id",
  },
});
QuestionSchema.belongsTo(QuestionTypeSchema);

BookSchema.hasOne(QuestionSchema, {
  foreignKey: {
    field: "pre_libro_id",
  },
});
QuestionSchema.belongsTo(BookSchema);

// Attached asociations
QuestionSchema.hasMany(AttachedSchema, {
  foreignKey: {
    field: "adj_pregunta_id",
  },
});
AttachedSchema.belongsTo(QuestionSchema);

// Label asociations
QuestionSchema.hasMany(LabelSchema, {
  foreignKey: {
    field: "eti_pregunta_id",
  },
});
LabelSchema.belongsTo(QuestionSchema);

// Comments associations
ForumActivitySchema.hasMany(CommentSchema, {
  foreignKey: {
    field: "com_actividad_foro_id",
  },
});
CommentSchema.belongsTo(ForumActivitySchema);

// Course asociations
CourseSchema.hasMany(ForumActivitySchema, {
  foreignKey: {
    field: "acf_curso_id",
  },
});
ForumActivitySchema.belongsTo(CourseSchema);

// Book asociations
BookSchema.hasMany(LessonSchema, {
  foreignKey: {
    field: "lec_libro_id",
  },
});
LessonSchema.belongsTo(BookSchema);

BookSchema.hasMany(CourseSchema, {
  foreignKey: {
    field: "cur_libro_id",
  },
});
CourseSchema.belongsTo(BookSchema);

// Participant asociations
QuestionSchema.hasMany(ParticipationSchema, {
  foreignKey: {
    field: "par_pregunta_id",
  },
});
ParticipationSchema.belongsTo(QuestionSchema);

// User asociations
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

UserSchema.hasOne(ResultSchema, {
  foreignKey: {
    field: "res_usuario_id",
  },
});
ResultSchema.belongsTo(UserSchema);

PersonSchema.hasOne(UserSchema, {
  foreignKey: {
    field: "usu_persona_id",
  },
});
UserSchema.belongsTo(PersonSchema);

UserSchema.hasMany(CommentSchema, {
  foreignKey: {
    field: "com_usuario_id",
  },
});
CommentSchema.belongsTo(UserSchema);
// activity asociations
ActivityTypeSchema.hasMany(ForumActivitySchema, {
  foreignKey: {
    field: "acf_tipo_act_id",
  },
});
ForumActivitySchema.belongsTo(ActivityTypeSchema);
