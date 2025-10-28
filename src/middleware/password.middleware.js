import bcrypt from "bcrypt";

export async function hashPasswordBeforeSave(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
}

export async function hashPasswordBeforeUpdate(next) {
  const update = this.getUpdate();

  if (!update?.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
    next();
  } catch (error) {
    next(error);
  }
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
